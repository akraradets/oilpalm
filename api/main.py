from fastapi import FastAPI
from fastapi import UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import shutil
from pydantic import BaseModel

from datetime import datetime

app = FastAPI()

origins = [
    "http://localhost",
    "https://localhost",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Example_data(BaseModel):
    id: int
    name: str
    number: float | None = None
    somelist: list[str] = []


@app.get("/")
async def root():
    return {"message": "Hello from API."}

@app.get("/get_ex")
async def get_ex():
    return {"code": True, "message": "API run just fine."}

@app.post("/post_ex")
async def post_example(data: Example_data):
    return {"message": "data well received. Note with thank!", "data":data, "date":datetime.now()}

@app.post("/uploadFile")
async def create_upload_file(file: UploadFile = File(...)):
   with open("destination.png", "wb") as buffer:
      shutil.copyfileobj(file.file, buffer)
   return {"filename": file.filename}