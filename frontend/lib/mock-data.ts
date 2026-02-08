// Mock data for the entire application

export interface Patient {
  id: string
  name: string
  idNumber: string
  province: string
  city: string
  phone: string
  email: string
  status: "waiting" | "in-consultation" | "completed" | "no-show"
  queueNumber: number
  appointmentTime: string
  checkInTime: string
  symptoms: string
  needsAssistance: boolean
  languagePreference: string
  assignedDoctor: string
  priority: "normal" | "urgent" | "emergency"
}

export interface Appointment {
  id: string
  patientId: string
  patientName: string
  clinicId: string
  clinicName: string
  date: string
  time: string
  type: string
  status: "scheduled" | "confirmed" | "completed" | "cancelled" | "no-show"
  notes: string
}

export interface Doctor {
  id: string
  name: string
  specialty: string
  clinic: string
  province: string
  status: "available" | "busy" | "offline"
  patientsToday: number
  rating: number
}

export interface Notification {
  id: string
  type: "appointment" | "reminder" | "alert" | "system"
  title: string
  message: string
  timestamp: string
  read: boolean
}

// Mock Patients
export const mockPatients: Patient[] = [
  {
    id: "p001",
    name: "Thabo Mokoena",
    idNumber: "9501015800087",
    province: "Gauteng",
    city: "Johannesburg",
    phone: "071 234 5678",
    email: "thabo.m@email.co.za",
    status: "waiting",
    queueNumber: 1,
    appointmentTime: "08:30",
    checkInTime: "08:15",
    symptoms: "Persistent headache, occasional dizziness",
    needsAssistance: false,
    languagePreference: "English",
    assignedDoctor: "Dr. Sarah Nkosi",
    priority: "normal"
  },
  {
    id: "p002",
    name: "Nomvula Dlamini",
    idNumber: "8803225600083",
    province: "Gauteng",
    city: "Pretoria",
    phone: "082 345 6789",
    email: "nomvula.d@email.co.za",
    status: "in-consultation",
    queueNumber: 2,
    appointmentTime: "09:00",
    checkInTime: "08:45",
    symptoms: "Follow-up for diabetes management",
    needsAssistance: true,
    languagePreference: "Zulu",
    assignedDoctor: "Dr. John van der Merwe",
    priority: "normal"
  },
  {
    id: "p003",
    name: "Pieter du Plessis",
    idNumber: "7506125100089",
    province: "Gauteng",
    city: "Sandton",
    phone: "083 456 7890",
    email: "pieter.dp@email.co.za",
    status: "waiting",
    queueNumber: 3,
    appointmentTime: "09:30",
    checkInTime: "09:20",
    symptoms: "Chest pain, shortness of breath",
    needsAssistance: false,
    languagePreference: "Afrikaans",
    assignedDoctor: "Dr. Sarah Nkosi",
    priority: "urgent"
  },
  {
    id: "p004",
    name: "Lindiwe Mthembu",
    idNumber: "9208185500082",
    province: "KwaZulu-Natal",
    city: "Durban",
    phone: "084 567 8901",
    email: "lindiwe.m@email.co.za",
    status: "waiting",
    queueNumber: 4,
    appointmentTime: "10:00",
    checkInTime: "09:50",
    symptoms: "Annual health screening",
    needsAssistance: false,
    languagePreference: "Xhosa",
    assignedDoctor: "Dr. Ahmed Patel",
    priority: "normal"
  },
  {
    id: "p005",
    name: "Johan Botha",
    idNumber: "6512105000085",
    province: "Western Cape",
    city: "Cape Town",
    phone: "085 678 9012",
    email: "johan.b@email.co.za",
    status: "completed",
    queueNumber: 5,
    appointmentTime: "07:30",
    checkInTime: "07:20",
    symptoms: "Post-operative follow-up",
    needsAssistance: true,
    languagePreference: "Afrikaans",
    assignedDoctor: "Dr. Lisa Mbeki",
    priority: "normal"
  },
  {
    id: "p006",
    name: "Precious Zulu",
    idNumber: "0001015800080",
    province: "Gauteng",
    city: "Soweto",
    phone: "076 789 0123",
    email: "precious.z@email.co.za",
    status: "waiting",
    queueNumber: 6,
    appointmentTime: "10:30",
    checkInTime: "10:15",
    symptoms: "Vaccination - COVID-19 booster",
    needsAssistance: false,
    languagePreference: "Sotho",
    assignedDoctor: "Nurse Thandi Molefe",
    priority: "normal"
  },
  {
    id: "p007",
    name: "Mandla Sithole",
    idNumber: "8807075800086",
    province: "Mpumalanga",
    city: "Nelspruit",
    phone: "072 890 1234",
    email: "mandla.s@email.co.za",
    status: "no-show",
    queueNumber: 0,
    appointmentTime: "08:00",
    checkInTime: "",
    symptoms: "Blood pressure check",
    needsAssistance: false,
    languagePreference: "Zulu",
    assignedDoctor: "Dr. Sarah Nkosi",
    priority: "normal"
  },
  {
    id: "p008",
    name: "Fatima Abrahams",
    idNumber: "9112255600084",
    province: "Western Cape",
    city: "Stellenbosch",
    phone: "073 901 2345",
    email: "fatima.a@email.co.za",
    status: "waiting",
    queueNumber: 7,
    appointmentTime: "11:00",
    checkInTime: "10:45",
    symptoms: "Prenatal checkup, 28 weeks",
    needsAssistance: false,
    languagePreference: "English",
    assignedDoctor: "Dr. Lisa Mbeki",
    priority: "normal"
  }
]

// Mock Doctors
export const mockDoctors: Doctor[] = [
  {
    id: "d001",
    name: "Dr. Sarah Nkosi",
    specialty: "General Practice",
    clinic: "Chris Hani Baragwanath Hospital",
    province: "Gauteng",
    status: "busy",
    patientsToday: 12,
    rating: 4.8
  },
  {
    id: "d002",
    name: "Dr. John van der Merwe",
    specialty: "Internal Medicine",
    clinic: "Steve Biko Academic Hospital",
    province: "Gauteng",
    status: "busy",
    patientsToday: 8,
    rating: 4.9
  },
  {
    id: "d003",
    name: "Dr. Ahmed Patel",
    specialty: "Cardiology",
    clinic: "Inkosi Albert Luthuli Central Hospital",
    province: "KwaZulu-Natal",
    status: "available",
    patientsToday: 5,
    rating: 4.7
  },
  {
    id: "d004",
    name: "Dr. Lisa Mbeki",
    specialty: "Obstetrics & Gynecology",
    clinic: "Groote Schuur Hospital",
    province: "Western Cape",
    status: "busy",
    patientsToday: 10,
    rating: 4.9
  },
  {
    id: "d005",
    name: "Dr. Willem Pretorius",
    specialty: "Pediatrics",
    clinic: "Tygerberg Hospital",
    province: "Western Cape",
    status: "available",
    patientsToday: 7,
    rating: 4.6
  },
  {
    id: "d006",
    name: "Dr. Thandiwe Khumalo",
    specialty: "Emergency Medicine",
    clinic: "Charlotte Maxeke Johannesburg Academic Hospital",
    province: "Gauteng",
    status: "busy",
    patientsToday: 15,
    rating: 4.8
  }
]

// Mock Appointments
export const mockAppointments: Appointment[] = [
  {
    id: "a001",
    patientId: "p001",
    patientName: "Thabo Mokoena",
    clinicId: "chbh",
    clinicName: "Chris Hani Baragwanath Hospital",
    date: "2026-02-08",
    time: "08:30",
    type: "General Consultation",
    status: "confirmed",
    notes: "First visit - headache symptoms"
  },
  {
    id: "a002",
    patientId: "p002",
    patientName: "Nomvula Dlamini",
    clinicId: "stg",
    clinicName: "Steve Biko Academic Hospital",
    date: "2026-02-08",
    time: "09:00",
    type: "Follow-up Visit",
    status: "confirmed",
    notes: "Diabetes management - 3 month review"
  },
  {
    id: "a003",
    patientId: "p003",
    patientName: "Pieter du Plessis",
    clinicId: "chbh",
    clinicName: "Chris Hani Baragwanath Hospital",
    date: "2026-02-08",
    time: "09:30",
    type: "Specialist Referral",
    status: "confirmed",
    notes: "Urgent cardiology consult"
  },
  {
    id: "a004",
    patientId: "p008",
    patientName: "Fatima Abrahams",
    clinicId: "gsh",
    clinicName: "Groote Schuur Hospital",
    date: "2026-02-09",
    time: "10:00",
    type: "Specialist Referral",
    status: "scheduled",
    notes: "Prenatal care - routine checkup"
  },
  {
    id: "a005",
    patientId: "p006",
    patientName: "Precious Zulu",
    clinicId: "chbh",
    clinicName: "Chris Hani Baragwanath Hospital",
    date: "2026-02-08",
    time: "10:30",
    type: "Vaccination",
    status: "confirmed",
    notes: "COVID-19 booster shot"
  }
]

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: "n001",
    type: "appointment",
    title: "Upcoming Appointment",
    message: "Thabo Mokoena has checked in for 08:30 appointment",
    timestamp: "2026-02-08T08:15:00",
    read: false
  },
  {
    id: "n002",
    type: "alert",
    title: "Urgent Patient",
    message: "Pieter du Plessis marked as urgent - chest pain symptoms",
    timestamp: "2026-02-08T09:22:00",
    read: false
  },
  {
    id: "n003",
    type: "reminder",
    title: "No-Show Alert",
    message: "Mandla Sithole missed 08:00 appointment",
    timestamp: "2026-02-08T08:15:00",
    read: true
  },
  {
    id: "n004",
    type: "system",
    title: "System Update",
    message: "NoShowIQ will undergo maintenance tonight at 22:00",
    timestamp: "2026-02-08T07:00:00",
    read: true
  },
  {
    id: "n005",
    type: "appointment",
    title: "Consultation Complete",
    message: "Johan Botha consultation completed successfully",
    timestamp: "2026-02-08T08:45:00",
    read: true
  }
]

// Analytics Mock Data
export const analyticsData = {
  overview: {
    totalPatients: 12847,
    appointmentsToday: 156,
    noShowRate: 11.4,
    avgWaitTime: 14,
    satisfaction: 4.7,
    doctorsActive: 24
  },
  weeklyPatients: [
    { day: "Mon", patients: 245, noShows: 28, completed: 217 },
    { day: "Tue", patients: 232, noShows: 25, completed: 207 },
    { day: "Wed", patients: 268, noShows: 32, completed: 236 },
    { day: "Thu", patients: 255, noShows: 29, completed: 226 },
    { day: "Fri", patients: 289, noShows: 35, completed: 254 },
    { day: "Sat", patients: 148, noShows: 12, completed: 136 },
    { day: "Sun", patients: 65, noShows: 5, completed: 60 }
  ],
  provinceStats: [
    { province: "Gauteng", patients: 5421, noShowRate: 10.2, avgWait: 12, satisfaction: 4.8 },
    { province: "Western Cape", patients: 3892, noShowRate: 8.8, avgWait: 11, satisfaction: 4.9 },
    { province: "KwaZulu-Natal", patients: 3456, noShowRate: 13.2, avgWait: 16, satisfaction: 4.6 },
    { province: "Eastern Cape", patients: 2134, noShowRate: 15.7, avgWait: 19, satisfaction: 4.4 },
    { province: "Limpopo", patients: 1876, noShowRate: 17.3, avgWait: 22, satisfaction: 4.3 },
    { province: "Mpumalanga", patients: 1654, noShowRate: 14.1, avgWait: 18, satisfaction: 4.5 },
    { province: "Free State", patients: 1432, noShowRate: 12.8, avgWait: 15, satisfaction: 4.6 },
    { province: "North West", patients: 1287, noShowRate: 16.2, avgWait: 20, satisfaction: 4.4 },
    { province: "Northern Cape", patients: 695, noShowRate: 11.5, avgWait: 14, satisfaction: 4.7 }
  ],
  hourlyDistribution: [
    { hour: "07:00", count: 45 },
    { hour: "08:00", count: 78 },
    { hour: "09:00", count: 92 },
    { hour: "10:00", count: 85 },
    { hour: "11:00", count: 72 },
    { hour: "12:00", count: 48 },
    { hour: "13:00", count: 55 },
    { hour: "14:00", count: 82 },
    { hour: "15:00", count: 76 },
    { hour: "16:00", count: 58 },
    { hour: "17:00", count: 32 }
  ],
  appointmentTypes: [
    { type: "General Consultation", count: 4521, percentage: 35.2 },
    { type: "Follow-up Visit", count: 3245, percentage: 25.3 },
    { type: "Specialist Referral", count: 2156, percentage: 16.8 },
    { type: "Vaccination", count: 1532, percentage: 11.9 },
    { type: "Health Screening", count: 892, percentage: 6.9 },
    { type: "Emergency Walk-in", count: 501, percentage: 3.9 }
  ]
}
