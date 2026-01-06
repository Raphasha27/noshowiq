namespace NoShowIQ.Core.Entities;

public class Appointment
{
    public int Id { get; set; }
    public int PatientId { get; set; }
    public DateTime ScheduledTime { get; set; }
    
    // ML Prediction Data
    public float? PredictionScore { get; set; } // 0.0 to 1.0
    public bool IsHighRisk { get; set; }
    
    // Status
    public bool IsCancelled { get; set; }
    public bool DidNoShow { get; set; }
}
