import React, { useState } from 'react';

interface NewAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
}

export const NewAppointmentModal: React.FC<NewAppointmentModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    patientId: Math.floor(Math.random() * 9000) + 1000,
    age: 30,
    distanceMiles: 5,
    prevNoShows: 0,
    leadTimeDays: 2
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit(formData);
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-panel w-full max-w-md rounded-2xl p-6 relative animate-in fade-in zoom-in duration-200">
        <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
        >
          ✕
        </button>
        
        <h2 className="text-xl font-bold text-slate-800 mb-1">New Appointment</h2>
        <p className="text-sm text-slate-500 mb-6">Enter details to predict risk score.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Patient Age</label>
            <input 
                type="number" 
                className="w-full rounded-lg border-slate-200 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: Number(e.target.value)})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
                 <label className="block text-xs font-medium text-slate-700 mb-1">Distance (Miles)</label>
                <input 
                    type="number" 
                    className="w-full rounded-lg border-slate-200 text-sm"
                    value={formData.distanceMiles}
                    onChange={(e) => setFormData({...formData, distanceMiles: Number(e.target.value)})}
                />
            </div>
             <div>
                 <label className="block text-xs font-medium text-slate-700 mb-1">Lead Time (Days)</label>
                <input 
                    type="number" 
                    className="w-full rounded-lg border-slate-200 text-sm"
                    value={formData.leadTimeDays}
                    onChange={(e) => setFormData({...formData, leadTimeDays: Number(e.target.value)})}
                />
            </div>
          </div>

           <div>
             <label className="block text-xs font-medium text-slate-700 mb-1">Previous No-Shows (Red Flag)</label>
                <input 
                    type="number" 
                    className="w-full rounded-lg border-slate-200 text-sm bg-rose-50 border-rose-100 text-rose-800"
                    value={formData.prevNoShows}
                    onChange={(e) => setFormData({...formData, prevNoShows: Number(e.target.value)})}
                />
            </div>

            <div className="pt-2">
                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                >
                    {loading ? (
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    ) : (
                        "Predict & Schedule"
                    )}
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};
