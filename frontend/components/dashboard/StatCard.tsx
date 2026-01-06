import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  isPositive?: boolean;
  icon: React.ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, change, isPositive, icon }) => {
  return (
    <div className="glass-panel p-6 rounded-2xl flex items-start justify-between hover:shadow-md transition-shadow">
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-slate-800 tracking-tight">{value}</h3>
        {change && (
          <div className={`flex items-center mt-2 text-sm font-medium ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
            <span>{change}</span>
            <span className="ml-1 text-slate-400 font-normal">vs last month</span>
          </div>
        )}
      </div>
      <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
        {icon}
      </div>
    </div>
  );
};
