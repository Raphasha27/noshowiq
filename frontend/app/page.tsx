"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { Toaster, toast } from 'sonner';
import { StatCard } from '../components/dashboard/StatCard';
import { RecentAppointments } from '../components/dashboard/RecentAppointments';
import { NewAppointmentModal } from '../components/dashboard/NewAppointmentModal';

// Icons (Same as before)
const UsersIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const AlertIcon = () => (
  <svg className="w-6 h-6 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

const TrendIcon = () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  );
  
  const MoneyIcon = () => (
      <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); // Hack to force table refresh

  useEffect(() => {
    // Connect to SignalR
    const connection = new HubConnectionBuilder()
        .withUrl("http://localhost:5000/hub/notifications") // .NET Backend Hub URL
        .withAutomaticReconnect()
        .build();

    connection.start()
        .then(() => {
            console.log("Connected to SignalR Hub");
            
            // Listen for Real-Time Alerts
            connection.on("ReceiveRiskAlert", (alert: any) => {
                toast.error(alert.message || "High Risk Appointment Detected!", {
                    description: `Risk Score: ${Math.round(alert.riskScore * 100)}% - Review immediately.`
                });
                // In a real app we would update the list directly via state, 
                // for now we trigger a refresh of the table component
                setRefreshKey(prev => prev + 1); 
            });
        })
        .catch(err => console.error("SignalR Connection Error: ", err));

    return () => {
        connection.stop();
    };
  }, []);

  const handleCreateAppointment = async (data: any) => {
    try {
        const response = await fetch('http://localhost:5000/api/prediction/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.risk_score > 0.6) {
           // handled by signalR mostly, but we can show success
        } else {
            toast.success(`Appointment Scheduled. Risk: ${result.risk_level}`);
        }
        setRefreshKey(prev => prev + 1);

    } catch (e) {
        console.error(e);
        toast.error("Failed to schedule appointment");
    }
  };

  return (
    <main className="min-h-screen p-8 pb-20 relative">
      <Toaster position="top-right" richColors />
      <NewAppointmentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleCreateAppointment}
      />

      {/* Header */}
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Clinic Overview</h1>
          <p className="text-slate-500 mt-1">Welcome back, Dr. Richards</p>
        </div>
        <div className="flex gap-4">
             <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">
            Generate Report
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
          >
            + New Appointment
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard 
          title="Daily Appointments" 
          value="42" 
          change="+12%" 
          isPositive={true}
          icon={<UsersIcon />}
        />
         <StatCard 
          title="Predicted No-Shows" 
          value="5" 
          change="-2%" 
          isPositive={true} 
          icon={<AlertIcon />}
        />
        <StatCard 
          title="Revenue Saved" 
          value="$1,250" 
          change="+8.5%" 
          isPositive={true}
          icon={<MoneyIcon />}
        />
        <StatCard 
          title="Slot Optimization" 
          value="94%" 
          change="+4%" 
          isPositive={true}
          icon={<TrendIcon />}
        />
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Main Appointment Table */}
        <div className="lg:col-span-2">
            <RecentAppointments key={refreshKey} />
        </div>

        {/* Right: Quick Actions / Insights */}
        <div className="space-y-6">
            <div className="glass-panel p-6 rounded-2xl">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Optimization Insights</h3>
                <div className="space-y-4">
                    <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                        <div className="flex items-start gap-3">
                            <span className="text-xl">⚠️</span>
                            <div>
                                <h4 className="text-sm font-bold text-amber-800">High Risk Detected</h4>
                                <p className="text-xs text-amber-700 mt-1">James Wilson (10:30 AM) has a 92% chance of no-show.</p>
                                <button className="mt-2 text-xs font-semibold text-amber-900 underline">Overbook this slot</button>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                         <div className="flex items-start gap-3">
                            <span className="text-xl">💡</span>
                            <div>
                                <h4 className="text-sm font-bold text-blue-800">Revenue Opportunity</h4>
                                <p className="text-xs text-blue-700 mt-1">You have 3 gaps in the afternoon schedule.</p>
                                <button className="mt-2 text-xs font-semibold text-blue-900 underline">Send Waitlist Alerts</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

             <div className="glass-panel p-6 rounded-2xl">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">System Status</h3>
                <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500">ML Engine</span>
                        <span className="flex items-center text-emerald-600 font-medium">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>
                            Online
                        </span>
                    </div>
                     <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500">Real-Time Sync</span>
                        <span className="flex items-center text-emerald-600 font-medium">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>
                            Active
                        </span>
                    </div>
                </div>
             </div>
        </div>
      </div>
    </main>
  );
}
