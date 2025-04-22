from fastapi import FastAPI, HTTPException, Depends,Cookie,Query
from pydantic import BaseModel, EmailStr
from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from jose import JWTError, jwt
from datetime import datetime, timedelta
from fastapi.responses import JSONResponse, RedirectResponse
from pydantic_settings import BaseSettings
from fastapi.middleware.cors import CORSMiddleware
import openai
import httpx
from urllib.parse import unquote
import textwrap
import json
import re
class Settings(BaseSettings):
    DATABASE_URL: str
    SECRET_KEY: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int
    ALGORITHM: str
    OPENAI_API_KEY: str

    class Config:
        env_file = ".env"

settings = Settings()
openai.api_key = settings.OPENAI_API_KEY

engine = create_engine(settings.DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)
Base = declarative_base()

# --- Models ---
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)

Base.metadata.create_all(bind=engine)

# --- Pydantic Schema ---
class RegisterRequest(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    username: str
    email: EmailStr

    class Config:
        orm_mode = True  # Needed to return SQLAlchemy models as JSON

class LoginRequest(BaseModel):
    email: EmailStr
    password: str


# --- FastAPI App ---
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4321"],  # ✅ NOT "*"
    allow_credentials=True,                   # ✅ needed for cookies
    allow_methods=["*"],
    allow_headers=["*"],
)


# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- Register Endpoint ---
@app.post("/register-user")
def register_user(user: RegisterRequest, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = User(
        username=user.username,
        email=user.email,
        password=user.password  # 🔐 You should hash this in real apps
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User registered successfully"}

@app.get("/users", response_model=list[UserResponse])
def get_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return users

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)

@app.post("/login")
def login_user(user: LoginRequest, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()

    if not db_user or db_user.password != user.password:
        return RedirectResponse(url="/login-failed", status_code=302)

    token_data = {"sub": db_user.email}
    access_token = create_access_token(data=token_data, expires_delta=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES))

    response = JSONResponse(content={"message": "Login successful"})
    response.set_cookie(    
        key="access_token",
        value=access_token,
        httponly=True,
        max_age=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        expires=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        samesite="Lax",  # IMPORTANT
        secure=False       
    )

    return response

def get_current_user(token: str = Cookie(None,alias = "access_token"), db: Session = Depends(get_db)):
    print(token)
    credentials_exception = HTTPException(status_code=401, detail="Could not validate credentials")

    if token is None:
        raise credentials_exception

    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        email = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = db.query(User).filter(User.email == email).first()
    if user is None:
        raise credentials_exception

    return user

@app.get("/me")
def read_current_user(current_user: User = Depends(get_current_user)):
    return {"name": current_user.username}

@app.get("/get-instructions")
async def get_recipe_instructions(recipe: str = Query(..., description="Recipe name to fetch")):
    decoded_recipe = unquote(recipe)
    print(f"Decoded Recipe: {decoded_recipe}")
    instructions = await fetch_instructions_from_openai(decoded_recipe)
    if not instructions:
        raise HTTPException(status_code=404, detail="No instructions found.")
    return JSONResponse(content={"recipe": decoded_recipe, "instructions": instructions})

timeout = httpx.Timeout(30.0, connect=10.0) 
async def fetch_instructions_from_openai(recipe: str) -> list:
    prompt = textwrap.dedent(f"""\
        You are a professional Indian chef.

        Please return the step-by-step cooking instructions for the Indian recipe: "{recipe}".

        Respond with ONLY a JSON array like:
        ["Step one...", "Step two...", "Step three..."]

        Do not add any text before or after. Only the array.
    """)

    try:
        async with httpx.AsyncClient(timeout=timeout) as client:
            response = await client.post(
                "https://api.openai.com/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {settings.OPENAI_API_KEY}",
                    "Content-Type": "application/json"
                },
                json={
                    "model": "gpt-4o",
                    "messages": [{"role": "user", "content": prompt}],
                    "temperature":0.7
                }
            )

        if response.status_code != 200:
            print("OpenAI Error:", response.text)
            raise HTTPException(status_code=500, detail="OpenAI API call failed.")

        data = response.json()
        content = data['choices'][0]['message']['content'].strip()
        print("🔵 Raw Content:\n", content)

        # Step 1: Strip markdown code block if present
        cleaned = re.sub(r"^```(?:json)?\s*|\s*```$", "", content.strip(), flags=re.IGNORECASE)

        # Step 2: Try to parse as JSON
        try:
            parsed = json.loads(cleaned)
            if isinstance(parsed, list) and all(isinstance(i, str) for i in parsed):
                return parsed
        except json.JSONDecodeError:
            pass  # Move to fallback

        # Step 3: Fallback — extract lines that look like steps
        lines = cleaned.splitlines()
        steps = []
        for line in lines:
            match = re.match(r"[-•\d\.\)]\s*(.+)", line.strip())
            if match:
                steps.append(match.group(1).strip())

        if steps:
            return steps

        # Step 4: As a last ditch, return non-empty lines
        fallback = [line.strip() for line in cleaned.splitlines() if line.strip()]
        if fallback:
            return fallback

        raise HTTPException(status_code=500, detail="OpenAI returned an unparseable response.")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error from OpenAI API: {str(e)}")
    
@app.post("/logout")
def logout():
    response = JSONResponse(content={"message": "Logged out"})
    response.delete_cookie("access_token")
    return response

