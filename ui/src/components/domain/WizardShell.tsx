"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronLeft, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface WizardShellProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  title: string;
  description?: string;
  onBack?: () => void;
  onNext?: () => void;
  isLoading?: boolean;
  nextLabel?: string;
  nextDisabled?: boolean;
}

export function WizardShell({
  children,
  currentStep,
  totalSteps,
  title,
  description,
  onBack,
  onNext,
  isLoading,
  nextLabel = "Continue",
  nextDisabled
}: WizardShellProps) {
  return (
    <main className="flex-1 h-full overflow-y-auto bg-background p-6 md:p-12 lg:p-16 flex flex-col relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-mesh opacity-40 pointer-events-none mix-blend-multiply dark:mix-blend-screen" />
      
      <div className="max-w-3xl mx-auto w-full relative z-10 flex-1 flex flex-col">
        
        {/* Progress Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-6 overflow-x-auto no-scrollbar pb-2" role="progressbar" aria-valuenow={currentStep} aria-valuemin={1} aria-valuemax={totalSteps}>
            {Array.from({ length: totalSteps }).map((_, i) => (
              <React.Fragment key={i}>
                <StepIndicator 
                  status={i + 1 < currentStep ? "completed" : i + 1 === currentStep ? "active" : "pending"} 
                  number={i + 1} 
                  active={i + 1 === currentStep}
                />
                {i < totalSteps - 1 && (
                  <div className={cn(
                    "w-6 h-px shrink-0",
                    i + 1 < currentStep ? "bg-primary" : "bg-surface-muted dark:bg-slate-700"
                  )} />
                )}
              </React.Fragment>
            ))}
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white font-display tracking-tight mb-3">
            {title}
          </h1>
          {description && (
            <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 font-body max-w-2xl">
              {description}
            </p>
          )}
        </motion.div>

        {/* Content Area */}
        <motion.div 
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="flex-1 space-y-8"
        >
          {children}
        </motion.div>

        {/* Action Bar */}
        <div className="mt-12 pt-8 border-t border-border dark:border-slate-800 flex items-center justify-between">
            <div>
              {onBack && (
                <button 
                  onClick={onBack}
                  className="flex items-center gap-2 px-4 py-2 text-slate-600 dark:text-slate-400 font-bold hover:bg-surface-muted dark:hover:bg-slate-800 rounded-xl transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </button>
              )}
            </div>
            
            <button 
              onClick={onNext}
              disabled={nextDisabled || isLoading}
              className="flex items-center gap-2 px-8 py-3 bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:hover:translate-y-0 text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all"
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              {nextLabel}
            </button>
        </div>

      </div>
    </main>
  );
}

function StepIndicator({ status, number, active }: { status: "completed" | "active" | "pending", number: number, active?: boolean }) {
  if (status === "completed") {
    return (
      <div className="size-7 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0" aria-label={`Step ${number} completed`}>
        <CheckCircle2 className="w-4 h-4" />
      </div>
    );
  }
  
  if (status === "active") {
    return (
      <div className="size-7 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30 shrink-0" aria-current="step" aria-label={`Step ${number} active`}>
        <span className="text-xs font-bold font-mono">{number}</span>
      </div>
    );
  }

  return (
    <div className="size-7 rounded-full border-2 border-border dark:border-slate-700 flex items-center justify-center text-slate-400 shrink-0" aria-label={`Step ${number}`}>
       <span className="text-xs font-bold font-mono">{number}</span>
    </div>
  );
}
