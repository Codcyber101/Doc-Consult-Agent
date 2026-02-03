import React from 'react';

interface ActivityItemProps {
  title: string;
  status: string;
  date: string;
  variant: 'success' | 'warning' | 'error';
}

export const ActivityItem = ({ title, status, date, variant }: ActivityItemProps) => {
  const statusColors = {
    success: 'text-primary bg-primary/10 border-primary/20',
    warning: 'text-gold-700 bg-gold-50 border-gold-100',
    error: 'text-red-700 bg-red-50 border-red-100',
  };

  return (
    <div className="p-4 hover:bg-surface transition-colors cursor-pointer group border-b last:border-0 border-border">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium text-slate-900 text-sm group-hover:text-primary transition-colors">{title}</h4>
        <span className="text-xs text-slate-400 font-medium">{date}</span>
      </div>
      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] uppercase tracking-wide font-bold border ${statusColors[variant]}`}>
        {status}
      </span>
    </div>
  );
};
