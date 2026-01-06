# NoShowIQ
> **Predict. Optimize. Care.**

**Real-Time Healthcare Appointment Optimization Platform**

NoShowIQ is a real-time intelligent system designed to predict healthcare appointment no-shows, optimize schedule density (smart overbooking), and trigger automated interventions to recover revenue and reduce patient wait times.

## 🚀 Key Features // The "IQ"
- **Predictive Risk Scoring**: Analyze patient history and demographics to assign a "No-Show Probability" to every appointment.
- **Smart Overbooking**: Automatically identify high-risk slots safe for double-booking.
- **Dynamic Interventions**: Trigger varying levels of reminders (SMS, Call, Email) based on risk level.
- **Real-Time Dashboard**: Live view of daily flow and potential revenue gaps.

## 🛠 Tech Stack
- **Backend**: .NET 8, Clean Architecture
- **Frontend**: Next.js / React
- **ML**: Python / ML.NET
- **Real-Time**: SignalR
- **Database**: PostgreSQL / SQL Server

## 🚦 Setup & Run

### 1. Backend (.NET 8)
```bash
cd NoShowIQ.API
dotnet run
```
*Runs on http://localhost:5000*

### 2. Frontend (Next.js)
```bash
cd frontend
npm run dev
```
*Runs on http://localhost:3000*

### 3. ML Engine (Python)
```bash
cd ml_engine
pip install -r requirements.txt
python main.py
```
*Runs on http://localhost:8001*

## 🎤 Elevator Pitch
"I built NoShowIQ, a real-time system that predicts healthcare appointment no-shows, optimizes overbooking, and triggers automated reminders to reduce revenue loss and patient waiting times."

---
*Built by Rapha*
