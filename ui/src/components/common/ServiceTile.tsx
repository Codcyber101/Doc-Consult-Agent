import React from 'react';
import { Badge } from './Badge';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceTileProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  isPopular?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export const ServiceTile = ({ title, description, icon, isPopular, disabled, onClick, className }: ServiceTileProps) => {
  return (
    <div 
      onClick={!disabled ? onClick : undefined}
      role={onClick ? "button" : undefined}
      className={cn(
        "group relative text-left p-6 rounded-2xl border transition-all duration-300 w-full select-none",
        disabled 
          ? "bg-slate-50 border-slate-200 opacity-70 cursor-not-allowed" 
          : "bg-white border-slate-200 hover:border-emerald-500/30 hover:shadow-lg-soft hover:-translate-y-1 cursor-pointer",
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={cn(
          "p-3 rounded-xl transition-colors duration-300",
          disabled ? "bg-slate-100" : "bg-slate-50 group-hover:bg-emerald-50"
        )}>
          {/* Clone icon to enforce size/color if needed, or trust parent */}
          {icon}
        </div>
        {isPopular && (
          <Badge variant="warning">Popular</Badge>
        )}
      </div>
      <h3 className={cn("font-bold text-lg mb-1 font-display", disabled ? "text-slate-500" : "text-slate-900")}>{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
      
      {!disabled && (
        <div className="absolute bottom-6 right-6 opacity-0 transform translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          <ArrowRight className="w-5 h-5 text-emerald-600" />
        </div>
      )}
    </div>
  );
};
