from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import bookings
from database import engine, Base
import models.patient # Ensure models are loaded for metadata

# Initialize Database
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="NoShowIQ API",
    description="Backend for NoShowIQ Hospital Management System",
    version="1.0.0"
)

# CORS Configuration
origins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to NoShowIQ API - The Brain of the Operation"}

app.include_router(bookings.router)
