'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ReadinessScoreProps {
  score: number;
}

export function ReadinessScore({ score }: ReadinessScoreProps) {
  const isHigh = score >= 90;
  const isMedium = score >= 70 && score < 90;
  
  const colorClass = isHigh 
    ? 'text-primary' 
    : isMedium ? 'text-gold-500' : 'text-danger';
    
  const bgColorClass = isHigh 
    ? 'bg-primary/10' 
    : isMedium ? 'bg-gold-500/10' : 'bg-danger/10';

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center gap-4 px-6 py-3 rounded-2xl ${bgColorClass} border border-white/50 backdrop-blur-sm shadow-sovereign`}
    >
      <div className="relative w-12 h-12">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
          <circle
            cx="18"
            cy="18"
            r="16"
            stroke="currentColor"
            strokeWidth="3"
            fill="transparent"
            className="opacity-10"
          />
          <motion.circle
            cx="18"
            cy="18"
            r="16"
            stroke="currentColor"
            strokeWidth="3"
            fill="transparent"
            strokeDasharray="100"
            initial={{ strokeDashoffset: 100 }}
            animate={{ strokeDashoffset: 100 - score }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className={colorClass}
            strokeLinecap="round"
          />
        </svg>
        <div className={`absolute inset-0 flex items-center justify-center text-xs font-black tracking-tighter ${colorClass}`}>
          {score}%
        </div>
      </div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500 mb-0.5">Application Readiness</p>
        <p className={`text-sm font-bold ${colorClass}`}>
          {isHigh ? 'Optimized' : isMedium ? 'Good Progress' : 'Action Required'}
        </p>
      </div>
    </motion.div>
  );
}
