import React from 'react';

interface ActivityItemProps {
  title: string;
  status: string;
  date: string;
  variant: 'success' | 'warning' | 'error';
}

export const ActivityItem = ({ title, status, date, variant }: ActivityItemProps) => {
  const statusColors = {
    success: 'text-emerald-700 bg-emerald-50 border-emerald-100',
    warning: 'text-gold-700 bg-gold-50 border-gold-100',
    error: 'text-red-700 bg-red-50 border-red-100',
  };

  return (
    <div className="p-4 hover:bg-slate-50 transition-colors cursor-pointer group border-b last:border-0 border-slate-100">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium text-slate-900 text-sm group-hover:text-emerald-700 transition-colors">{title}</h4>
        <span className="text-xs text-slate-400 font-medium">{date}</span>
      </div>
      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] uppercase tracking-wide font-bold border ${statusColors[variant]}`}>
        {status}
      </span>
    </div>
  );
};
