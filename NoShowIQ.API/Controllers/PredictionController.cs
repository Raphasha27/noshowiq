using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using NoShowIQ.API.Hubs;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace NoShowIQ.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PredictionController : ControllerBase
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IHubContext<NotificationHub> _hubContext;

    public PredictionController(IHttpClientFactory httpClientFactory, IHubContext<NotificationHub> hubContext)
    {
        _httpClientFactory = httpClientFactory;
        _hubContext = hubContext;
    }

    [HttpPost("predict")]
    public async Task<IActionResult> Predict([FromBody] AppointmentRequest request)
    {
        var client = _httpClientFactory.CreateClient("MLEngine");

        // Map .NET request to Python ML request
        var mlRequest = new 
        {
            age = request.Age,
            distance_miles = request.DistanceMiles,
            prev_no_shows = request.PrevNoShows,
            lead_time_days = request.LeadTimeDays
        };

        var response = await client.PostAsJsonAsync("predict", mlRequest);
        
        if (!response.IsSuccessStatusCode)
        {
            return StatusCode((int)response.StatusCode, "ML Engine Error");
        }

        var result = await response.Content.ReadFromJsonAsync<MLPredictionResult>();
        
        // REAL-TIME ALERT: If risk is high, notify dashboard immediately
        if (result.RiskScore > 0.6)
        {
            await _hubContext.Clients.All.SendAsync("ReceiveRiskAlert", 
                new { 
                    Message = $"High Risk Detected for Patient ID {request.PatientId}", 
                    RiskScore = result.RiskScore 
                });
        }
        
        return Ok(result);
    }

    [HttpGet("recent")]
    public IActionResult GetRecentAppointments()
    {
        // In a real app, this comes from the DB. 
        // For now, we return a mix of static data + simulated realtime status
        var rng = new Random();
        var appointments = new[]
        {
            new { id = 1, name = "Sarah Johnson", time = "09:00 AM", type = "Check-up", risk = 0.12, status = "Confirmed" },
            new { id = 2, name = "Michael Chen", time = "09:30 AM", type = "Follow-up", risk = 0.85, status = "Pending" },
            new { id = 3, name = "Emma Davis", time = "10:00 AM", type = "Consultation", risk = 0.45, status = "Confirmed" },
            new { id = 4, name = "James Wilson", time = "10:30 AM", type = "Therapy", risk = 0.92, status = "No Answer" },
            new { id = 5, name = "Linda Martinez", time = "11:00 AM", type = "Check-up", risk = 0.05, status = "Arrived" }
        };

        return Ok(appointments);
    }
}

public class AppointmentRequest
{
    public int PatientId { get; set; }
    public int Age { get; set; }
    public double DistanceMiles { get; set; }
    public int PrevNoShows { get; set; }
    public int LeadTimeDays { get; set; }
}

public class MLPredictionResult
{
    [JsonPropertyName("risk_score")]
    public double RiskScore { get; set; }
    
    [JsonPropertyName("risk_level")]
    public string RiskLevel { get; set; }
    
    [JsonPropertyName("recommendation")]
    public string Recommendation { get; set; }
}
