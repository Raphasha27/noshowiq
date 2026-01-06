import React from 'react';

interface RiskBadgeProps {
  score: number; // 0 to 1
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ score }) => {
  let colorClass = '';
  let text = '';
  let dotClass = '';

  if (score < 0.3) {
    colorClass = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    dotClass = 'bg-emerald-500';
    text = 'Low Risk';
  } else if (score < 0.7) {
    colorClass = 'bg-amber-50 text-amber-700 border-amber-200';
    dotClass = 'bg-amber-500';
    text = 'Medium Risk';
  } else {
    colorClass = 'bg-rose-50 text-rose-700 border-rose-200';
    dotClass = 'bg-rose-500';
    text = 'High Risk';
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClass}`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${dotClass}`}></span>
      {text} ({Math.round(score * 100)}%)
    </span>
  );
};
