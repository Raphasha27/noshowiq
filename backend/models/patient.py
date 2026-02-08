from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from enum import Enum
from sqlalchemy import Column, Integer, String, Boolean, Enum as SQLEnum
from database import Base

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

# SQLAlchemy Model
class PatientModel(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    id_number = Column(String)
    province = Column(SQLEnum(Province))
    symptoms = Column(String)
    needs_assistance = Column(Boolean, default=False)
    language_preference = Column(String, default="English")
    status = Column(SQLEnum(PatientStatus), default=PatientStatus.WAITING)
    queue_number = Column(Integer)

# Pydantic Schemas
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

    model_config = ConfigDict(from_attributes=True)
