using Microsoft.AspNetCore.SignalR;

namespace NoShowIQ.API.Hubs;

public class NotificationHub : Hub
{
    public async Task SendRiskAlert(string patientName, double riskScore)
    {
        await Clients.All.SendAsync("ReceiveRiskAlert", patientName, riskScore);
    }
}
