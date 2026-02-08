from pydantic import BaseModel
from typing import Optional, List
from enum import Enum

class Province(str, Enum):
    EC = "Eastern Cape"
    FS = "Free State"
    GP = "Gauteng"
    KZN = "KwaZulu-Natal"
    LP = "Limpopo"
    MP = "Mpumalanga"
    NC = "Northern Cape"
    NW = "North West"
    WC = "Western Cape"

class PatientStatus(str, Enum):
    WAITING = "Waiting"
    IN_CONSULTATION = "In Consultation"
    COMPLETED = "Completed"
    NO_SHOW = "No Show"

class PatientBase(BaseModel):
    name: str
    id_number: str
    province: Province
    symptoms: str
    needs_assistance: bool = False
    language_preference: str = "English"

class PatientCreate(PatientBase):
    pass

class Patient(PatientBase):
    id: int
    status: PatientStatus = PatientStatus.WAITING
    queue_number: int
