import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface WizardProgressProps {
  progress?: number; // 0 to 100
  currentStep?: number;
  totalSteps?: number;
  stepName?: string;
  className?: string;
}

export const WizardProgress = ({ progress, currentStep, totalSteps, stepName, className }: WizardProgressProps) => {
  const calculatedProgress = progress ?? (currentStep && totalSteps ? (currentStep / totalSteps) * 100 : 0);
  
  return (
    <div className={cn("w-full py-2", className)}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{stepName || "Completion Progress"}</span>
        <span className="text-[10px] font-black text-emerald-600 tracking-widest">{Math.round(calculatedProgress)}%</span>
      </div>
      
      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${calculatedProgress}%` }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="h-full bg-emerald-600 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.3)]"
        />
      </div>
    </div>
  );
};
