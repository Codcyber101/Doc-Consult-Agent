import React from "react";
import { ArrowRight, Clock, Zap, Calendar, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  badge?: "Online" | "In-Person" | "Instant";
  estimate: string;
  color?: "primary" | "blue" | "amber" | "purple";
  href?: string;
}

export function ServiceCard({ title, description, icon, badge = "Online", estimate, color = "primary", href = "#" }: ServiceCardProps) {
  const colorStyles = {
    primary: "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white",
    blue: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white",
    amber: "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400 group-hover:bg-amber-600 group-hover:text-white",
    purple: "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400 group-hover:bg-purple-600 group-hover:text-white",
  };

  const badgeStyles = {
    "Online": "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800",
    "In-Person": "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800",
    "Instant": "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800",
  };

  return (
    <a href={href} className="group relative flex flex-col justify-between p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:scale-[1.02] hover:border-primary/30 overflow-hidden">
      {/* Hover Gradient Effect */}
      <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none bg-gradient-to-br", 
        color === 'primary' && "from-primary to-transparent",
        color === 'blue' && "from-blue-500 to-transparent",
        color === 'amber' && "from-amber-500 to-transparent",
        color === 'purple' && "from-purple-500 to-transparent",
      )} />

      <div>
        <div className="flex justify-between items-start mb-4">
          <div className={cn("p-3 rounded-2xl transition-all duration-300 shadow-sm group-hover:shadow-md", colorStyles[color])}>
            {React.cloneElement(icon as any, { className: "w-6 h-6" })}
          </div>
          <span className={cn("px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border", badgeStyles[badge])}>
            {badge}
          </span>
        </div>
        
        <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-body leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 dark:text-slate-500">
          <Clock className="w-3.5 h-3.5" />
          <span>{estimate}</span>
        </div>
        <div className={cn("flex items-center gap-1 text-xs font-black uppercase tracking-widest opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300", 
           color === 'primary' && "text-primary",
           color === 'blue' && "text-blue-600",
           color === 'amber' && "text-amber-600",
           color === 'purple' && "text-purple-600",
        )}>
          Start <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </a>
  );
}
