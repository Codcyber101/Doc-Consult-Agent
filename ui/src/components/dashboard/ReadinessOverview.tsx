import React from "react";
import { CheckCircle2, AlertCircle, RefreshCw, ChevronRight } from "lucide-react";

export function ReadinessOverview() {
  return (
    <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-slate-200/60 dark:border-slate-800/60 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100 dark:border-slate-800/50 bg-white/40 dark:bg-slate-900/40 flex justify-between items-center">
        <div>
          <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">Readiness Overview</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Track your active applications</p>
        </div>
        <div className="size-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
          <span className="font-mono text-xs font-bold">3</span>
        </div>
      </div>
      
      <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
        {/* Item 1: Approved */}
        <div className="p-5 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group cursor-pointer">
          <div className="flex items-start gap-4">
            <div className="mt-1 flex items-center justify-center size-8 rounded-full bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1">
                <p className="font-bold text-sm text-slate-900 dark:text-white truncate">TIN Registration</p>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-full">Approved</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">Ref: #TR-2023-8891</p>
            </div>
          </div>
        </div>

        {/* Item 2: Pending Action */}
        <div className="p-5 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group cursor-pointer">
          <div className="flex items-start gap-4">
            <div className="mt-1 flex items-center justify-center size-8 rounded-full bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 shrink-0 animate-pulse-soft">
              <AlertCircle className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1">
                <p className="font-bold text-sm text-slate-900 dark:text-white truncate">Business License</p>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded-full">Action Req</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mb-2">Ref: #BL-2023-4421</p>
              <button className="text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 px-3 py-1.5 rounded-lg transition-colors shadow-sm shadow-amber-600/20">
                Pay 500 ETB
              </button>
            </div>
          </div>
        </div>

        {/* Item 3: In Progress */}
        <div className="p-5 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group cursor-pointer">
          <div className="flex items-start gap-4">
            <div className="mt-1 flex items-center justify-center size-8 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shrink-0">
              <RefreshCw className="w-4 h-4 animate-spin-slow" style={{ animationDuration: '3s' }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1">
                <p className="font-bold text-sm text-slate-900 dark:text-white truncate">Passport Renewal</p>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded-full">Processing</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mb-2">Ref: #PR-2023-1102</p>
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div className="bg-blue-500 h-1.5 rounded-full w-[45%] relative">
                   <div className="absolute inset-0 bg-white/30 animate-[shimmer_2s_infinite]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-slate-50/50 dark:bg-slate-900/30 border-t border-slate-100 dark:border-slate-800/50">
        <button className="w-full py-2.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-white dark:hover:bg-slate-800 rounded-xl border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all flex items-center justify-center gap-2 group">
          View All Applications 
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}
