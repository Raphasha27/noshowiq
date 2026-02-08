from fastapi import APIRouter, HTTPException
from typing import List
from models.patient import Patient, PatientCreate, PatientStatus, Province

router = APIRouter(
    prefix="/bookings",
    tags=["bookings"],
    responses={404: {"description": "Not found"}},
)

# Mock Database
fake_bookings_db: List[Patient] = []
queue_counter = 0

@router.post("/", response_model=Patient)
async def create_booking(patient: PatientCreate):
    global queue_counter
    queue_counter += 1
    new_booking = Patient(
        id=len(fake_bookings_db) + 1,
        queue_number=queue_counter,
        status=PatientStatus.WAITING,
        **patient.dict()
    )
    fake_bookings_db.append(new_booking)
    return new_booking

@router.get("/", response_model=List[Patient])
async def read_bookings():
    return fake_bookings_db

@router.get("/province/{province_code}", response_model=List[Patient])
async def read_bookings_by_province(province_code: Province):
    return [b for b in fake_bookings_db if b.province == province_code]

@router.put("/{booking_id}/status", response_model=Patient)
async def update_booking_status(booking_id: int, status: PatientStatus):
    for booking in fake_bookings_db:
        if booking.id == booking_id:
            booking.status = status
            return booking
    raise HTTPException(status_code=404, detail="Booking not found")
