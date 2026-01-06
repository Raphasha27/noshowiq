from fastapi import FastAPI
import random
from pydantic import BaseModel

app = FastAPI()

class AppointmentData(BaseModel):
    age: int
    distance_miles: float
    prev_no_shows: int
    lead_time_days: int

@app.get("/")
def read_root():
    return {"status": "ML Engine Online", "model_version": "1.0.0"}

@app.post("/predict")
def predict_no_show(data: AppointmentData):
    # Mock Logic: Simple heuristic + randomness for demo
    base_risk = 0.1
    
    if data.prev_no_shows > 2:
        base_risk += 0.4
    
    if data.distance_miles > 20:
        base_risk += 0.1
        
    if data.lead_time_days > 14:
        base_risk += 0.15

    # Add randomness to simulate real AI uncertainty
    risk_score = min(max(base_risk + random.uniform(-0.1, 0.1), 0.0), 1.0)
    
    return {
        "risk_score": round(risk_score, 2),
        "risk_level": "High" if risk_score > 0.6 else "Medium" if risk_score > 0.3 else "Low",
        "recommendation": "Overbook" if risk_score > 0.6 else "Standard Reminder"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
