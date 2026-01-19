import React from 'react';
import { Badge } from './Badge';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ServiceTileProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  isPopular?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  index?: number;
}

export const ServiceTile = ({ title, description, icon, isPopular, disabled, onClick, className, index = 0 }: ServiceTileProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={!disabled ? { y: -5, transition: { duration: 0.2 } } : {}}
      onClick={!disabled ? onClick : undefined}
      role={onClick ? "button" : undefined}
      className={cn(
        "group relative text-left p-8 rounded-[2rem] border transition-all duration-300 w-full select-none overflow-hidden",
        disabled
          ? "bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-white/5 opacity-70 cursor-not-allowed"
          : "bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 hover:border-emerald-500/20 dark:hover:border-emerald-500/30 hover:shadow-sovereign dark:hover:shadow-glow-emerald cursor-pointer",
        className
      )}
    >
      {/* Subtle Background Pattern or Gradient */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-emerald-50 dark:bg-emerald-900/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl -z-10"></div>

      <div className="flex items-start justify-between mb-6">
        <div className={cn(
          "p-4 rounded-2xl transition-all duration-300 shadow-sm",
          disabled ? "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600" : "bg-white dark:bg-slate-800 border border-slate-100 dark:border-white/5 group-hover:bg-emerald-600 group-hover:text-white group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-emerald-200"
        )}>
          {icon}
        </div>
        {isPopular && (
          <Badge variant="warning" className="px-3 py-1 bg-gold-50 dark:bg-gold-900/20 text-gold-700 dark:text-gold-400 border-gold-200 dark:border-gold-800 font-bold uppercase tracking-wider text-[10px]">Popular</Badge>
        )}
      </div>

      <h3 className={cn("font-bold text-xl mb-2 font-display tracking-tight", disabled ? "text-slate-500" : "text-slate-900")}>
        {title}
      </h3>
      <p className="text-sm text-slate-500 leading-relaxed font-medium">
        {description}
      </p>

      {!disabled && (
        <div className="mt-8 flex items-center text-emerald-600 text-sm font-bold gap-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <span>Get Started</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      )}

      {disabled && (
        <div className="mt-8 flex items-center text-slate-400 text-xs font-medium gap-2">
          <span>Coming Soon</span>
        </div>
      )}
    </motion.div>
  );
};
