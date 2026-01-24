"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

export function WizardShell() {
  return (
    <main className="flex-1 h-full overflow-y-auto bg-background p-8 md:p-12 lg:p-16 flex flex-col relative z-10">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-mesh opacity-40 pointer-events-none mix-blend-multiply dark:mix-blend-screen" />
      
      <div className="max-w-3xl mx-auto w-full relative z-10">
        
        {/* Progress Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <StepIndicator status="completed" number={1} label="Eligibility" />
              <div className="w-8 h-px bg-slate-200 dark:bg-slate-700" />
              <StepIndicator status="completed" number={2} label="Documents" />
              <div className="w-8 h-px bg-slate-200 dark:bg-slate-700" />
              <StepIndicator status="active" number={3} label="Identity" />
              <div className="w-8 h-px bg-slate-200 dark:bg-slate-700" />
              <StepIndicator status="pending" number={4} label="Review" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground font-display tracking-tight mb-4">
            Identity Verification
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-body max-w-2xl">
            We need to verify your identity to ensure the security of your application. Please upload a valid government-issued ID.
          </p>
        </motion.div>

        {/* Content Area (Placeholder) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* Skeleton Loaders matching the design */}
          <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm-soft">
             <div className="space-y-6">
                <div className="flex flex-col gap-2">
                   <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-32 animate-pulse" />
                   <div className="h-12 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl w-full" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                   <div className="flex flex-col gap-2">
                      <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-24 animate-pulse" />
                      <div className="h-12 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl w-full" />
                   </div>
                   <div className="flex flex-col gap-2">
                      <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-24 animate-pulse" />
                      <div className="h-12 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl w-full" />
                   </div>
                </div>
             </div>
          </div>

          <div className="h-64 bg-slate-50 dark:bg-slate-900/30 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center gap-4 group hover:border-emerald-500/30 hover:bg-emerald-50/50 transition-all cursor-pointer">
             <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <div className="w-8 h-8 rounded bg-slate-300 dark:bg-slate-600" />
             </div>
             <div className="text-center space-y-1">
                <p className="text-slate-900 dark:text-white font-bold text-lg">Upload Identity Document</p>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Drag and drop or click to upload</p>
             </div>
          </div>
        </motion.div>

        {/* Action Bar */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 flex items-center justify-end gap-4"
        >
            <button className="px-6 py-3 text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
                Back
            </button>
            <button className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/40 hover:-translate-y-0.5 transition-all">
                Continue
            </button>
        </motion.div>

      </div>
    </main>
  );
}

function StepIndicator({ status, number, label }: { status: "completed" | "active" | "pending", number: number, label: string }) {
  if (status === "completed") {
    return (
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="w-4 h-4" />
        </div>
        <span className="text-emerald-700 dark:text-emerald-400 text-sm font-bold hidden sm:inline-block">{label}</span>
      </div>
    );
  }
  
  if (status === "active") {
    return (
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-slate-900 shadow-glow-emerald">
          <span className="text-xs font-bold font-mono">{number}</span>
        </div>
        <span className="text-slate-900 dark:text-white text-sm font-bold hidden sm:inline-block">{label}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 opacity-50">
      <div className="w-6 h-6 rounded-full border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400">
         <span className="text-xs font-bold font-mono">{number}</span>
      </div>
      <span className="text-slate-500 text-sm font-bold hidden sm:inline-block">{label}</span>
    </div>
  );
}