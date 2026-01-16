import React from 'react';
import { cn } from '@/lib/utils';
import { Check, Circle } from 'lucide-react';

export interface Step {
  id: string;
  title: string;
  description?: string;
  status: 'completed' | 'current' | 'upcoming';
}

interface ProcessTimelineProps {
  steps: Step[];
  className?: string;
}

export const ProcessTimeline = ({ steps, className }: ProcessTimelineProps) => {
  return (
    <div className={cn("space-y-0", className)}>
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        
        return (
          <div key={step.id} className="relative flex gap-4">
            {/* Line connector */}
            {!isLast && (
              <div 
                className={cn(
                  "absolute left-[15px] top-8 bottom-0 w-0.5",
                  step.status === 'completed' ? "bg-emerald-600" : "bg-slate-200"
                )} 
              />
            )}

            {/* Icon/Indicator */}
            <div className="flex flex-col items-center">
              <div 
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border-2 z-10 bg-white transition-colors duration-300",
                  step.status === 'completed' 
                    ? "border-emerald-600 bg-emerald-600 text-white" 
                    : step.status === 'current'
                    ? "border-emerald-600 text-emerald-600"
                    : "border-slate-300 text-slate-300"
                )}
              >
                {step.status === 'completed' && <Check className="h-4 w-4" />}
                {step.status === 'current' && <div className="h-2.5 w-2.5 rounded-full bg-emerald-600 animate-pulse" />}
                {step.status === 'upcoming' && <Circle className="h-4 w-4" />}
              </div>
            </div>

            {/* Content */}
            <div className={cn("pb-8 pt-1", isLast && "pb-0")}>
              <p 
                className={cn(
                  "text-sm font-bold leading-none",
                  step.status === 'completed' ? "text-emerald-900" : 
                  step.status === 'current' ? "text-slate-900" : "text-slate-500"
                )}
              >
                {step.title}
              </p>
              {step.description && (
                <p className="mt-1 text-xs text-slate-500 leading-snug max-w-[200px]">
                  {step.description}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
