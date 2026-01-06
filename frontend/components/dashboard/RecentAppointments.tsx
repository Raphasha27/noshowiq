import React, { useEffect, useState } from 'react';
import { RiskBadge } from '../ui/RiskBadge';

interface Appointment {
  id: number;
  name: string;
  time: string;
  type: string;
  risk: number;
  status: string;
}

export const RecentAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would point to your .NET container or localhost endpoint
    // For demo purposes if the API isn't running, we fallback or just try to fetch
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/prediction/recent');
        if (res.ok) {
            const data = await res.json();
            setAppointments(data);
        } else {
            console.error("Failed to fetch from API");
            // Fallback mock data if API is down for demo
            setAppointments([
              { id: 1, name: "System Offline - Demo Data", time: "09:00 AM", type: "Check-up", risk: 0.12, status: "Confirmed" }
            ]);
        }
      } catch (err) {
        console.error(err);
         // Fallback mock if connection fails
         setAppointments([
            { id: 1, name: "Sarah Johnson", time: "09:00 AM", type: "Check-up", risk: 0.12, status: "Confirmed" },
            { id: 2, name: "Michael Chen", time: "09:30 AM", type: "Follow-up", risk: 0.85, status: "Pending" },
            { id: 3, name: "Emma Davis", time: "10:00 AM", type: "Consultation", risk: 0.45, status: "Confirmed" },
            { id: 4, name: "James Wilson", time: "10:30 AM", type: "Therapy", risk: 0.92, status: "No Answer" },
            { id: 5, name: "Linda Martinez", time: "11:00 AM", type: "Check-up", risk: 0.05, status: "Arrived" },
         ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-6 text-slate-500">Loading appointments...</div>;

  return (
    <div className="glass-panel rounded-2xl overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-slate-800">Live Incoming Appointments</h3>
        <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700">View Full Schedule</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 text-xs uppercase text-slate-500 font-semibold">
            <tr>
              <th className="px-6 py-4">Time</th>
              <th className="px-6 py-4">Patient</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">No-Show Probability</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {appointments.map((apt) => (
              <tr key={apt.id} className="hover:bg-slate-50/80 transition-colors group">
                <td className="px-6 py-4 font-medium text-slate-700">{apt.time}</td>
                <td className="px-6 py-4">
                  <div className="font-medium text-slate-900">{apt.name}</div>
                  <div className="text-xs text-slate-400">ID: #{1000 + apt.id}</div>
                </td>
                <td className="px-6 py-4 text-slate-600">{apt.type}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <RiskBadge score={apt.risk} />
                    {apt.risk > 0.6 && (
                        <span className="text-[10px] font-bold text-rose-600 px-1.5 py-0.5 bg-rose-50 rounded uppercase tracking-wider animate-pulse">
                            Alert
                        </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                   <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-slate-100 text-slate-600">
                    {apt.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-indigo-600 font-medium text-sm px-3 py-1 rounded-md hover:bg-slate-50 transition-all">
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
