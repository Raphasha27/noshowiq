from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models.patient import Patient, PatientCreate, PatientStatus, Province, PatientModel
from sqlalchemy import func

router = APIRouter(
    prefix="/bookings",
    tags=["bookings"],
    responses={404: {"description": "Not found"}},
)

@router.post("/", response_model=Patient)
async def create_booking(patient: PatientCreate, db: Session = Depends(get_db)):
    # Calculate queue number based on max in DB
    max_queue = db.query(func.max(PatientModel.queue_number)).scalar() or 0
    
    db_patient = PatientModel(
        queue_number=max_queue + 1,
        **patient.model_dump()
    )
    db.add(db_patient)
    db.commit()
    db.refresh(db_patient)
    return db_patient

@router.get("/", response_model=List[Patient])
async def read_bookings(db: Session = Depends(get_db)):
    return db.query(PatientModel).order_by(PatientModel.queue_number.asc()).all()

@router.get("/province/{province_code}", response_model=List[Patient])
async def read_bookings_by_province(province_code: Province, db: Session = Depends(get_db)):
    return db.query(PatientModel).filter(PatientModel.province == province_code).all()

@router.put("/{booking_id}/status", response_model=Patient)
async def update_booking_status(booking_id: int, status: PatientStatus, db: Session = Depends(get_db)):
    db_patient = db.query(PatientModel).filter(PatientModel.id == booking_id).first()
    if not db_patient:
        raise HTTPException(status_code=404, detail="Booking not found")
    
    db_patient.status = status
    db.commit()
    db.refresh(db_patient)
    return db_patient
