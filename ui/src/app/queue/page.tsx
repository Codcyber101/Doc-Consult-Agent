"use client";

import React from "react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { 
  WifiOff, 
  History, 
  RefreshCw, 
  Clock, 
  CloudOff, 
  CheckCircle2, 
  Edit2, 
  Trash2, 
  ArrowUpCircle,
  Pause,
  AlertCircle,
  FileText,
  Baby,
  Store
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function QueuePage() {
  return (
    <div className="flex min-h-screen bg-background text-foreground font-sans selection:bg-emerald-500/20">
      <AppSidebar />
      
      <main className="flex-1 lg:pl-72 flex flex-col min-w-0">
        {/* Mobile Header */}
        <div className="lg:hidden h-16 border-b border-slate-200 dark:border-slate-800 flex items-center px-4 sticky top-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md z-30">
           <span className="font-bold text-lg font-display">GovAssist</span>
        </div>

        <div className="flex-1 p-4 md:p-8 lg:p-10 max-w-5xl mx-auto w-full space-y-8">
          
          {/* Header & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white font-display">
                  My Queue
                </h1>
                <span className="text-2xl font-normal text-slate-400 font-ethiopic opacity-60">/ የኔ ተራ</span>
              </div>
              <p className="mt-2 text-slate-500 dark:text-slate-400 font-medium">
                Manage pending submissions and sync status.
              </p>
            </div>
            <div className="flex gap-2">
              <button className="inline-flex items-center justify-center rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2.5 text-sm font-bold text-slate-700 dark:text-slate-200 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <History className="mr-2 w-4 h-4" />
                History
              </button>
              <button className="inline-flex items-center justify-center rounded-xl bg-emerald-600 hover:bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition-all hover:-translate-y-0.5">
                <RefreshCw className="mr-2 w-4 h-4 animate-spin-slow" style={{ animationDuration: '3s' }} />
                Force Sync All
              </button>
            </div>
          </div>

          {/* Offline Banner */}
          <div className="rounded-2xl border border-amber-200/60 bg-amber-50/50 dark:bg-amber-900/10 dark:border-amber-800/50 p-5 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 shrink-0">
                <WifiOff className="w-5 h-5" />
              </div>
              <div className="flex-1 md:flex md:justify-between md:items-center">
                <div>
                  <h3 className="text-sm font-bold text-amber-900 dark:text-amber-100 font-display">You are currently offline</h3>
                  <p className="mt-1 text-sm text-amber-700 dark:text-amber-300/80 leading-relaxed">
                    Your data is saved locally in the secure browser vault and will sync automatically once you reconnect.
                  </p>
                </div>
                <div className="mt-3 md:mt-0 md:ml-4">
                  <button className="whitespace-nowrap rounded-lg bg-white dark:bg-amber-900/20 px-4 py-2 text-xs font-bold text-amber-700 dark:text-amber-300 shadow-sm ring-1 ring-inset ring-amber-200 dark:ring-amber-800 hover:bg-amber-50 dark:hover:bg-amber-900/30 transition-colors">
                    Retry Connection
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard 
              icon={<Clock className="w-5 h-5" />} 
              label="Pending Items" 
              value="3" 
              color="blue" 
            />
            <StatCard 
              icon={<CloudOff className="w-5 h-5" />} 
              label="Unsynced Data" 
              value="4.2 MB" 
              color="purple" 
            />
            <StatCard 
              icon={<CheckCircle2 className="w-5 h-5" />} 
              label="Last Successful Sync" 
              value="Yesterday, 4 PM" 
              color="emerald" 
            />
          </div>

          {/* Queue List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">Pending Submissions</h3>
              <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Sorted by: <span className="text-slate-900 dark:text-white">Newest First</span></span>
            </div>

            {/* Item 1: Waiting */}
            <QueueItem 
              status="waiting"
              title="Passport Renewal"
              subtitle="ፓስፖርት"
              id="#EP-2023-8829"
              time="Saved 2 hours ago"
              icon={<FileText className="w-6 h-6" />}
            />

            {/* Item 2: Syncing */}
            <QueueItem 
              status="syncing"
              title="Birth Certificate"
              subtitle="የልደት የምስክር ወረቀት"
              id="#VR-2023-1102"
              progress={45}
              icon={<Baby className="w-6 h-6" />}
            />

            {/* Item 3: Error */}
            <QueueItem 
              status="error"
              title="Business License"
              subtitle="የንግድ ፈቃድ"
              id="#BL-2023-9912"
              errorMsg="Validation Error"
              icon={<Store className="w-6 h-6" />}
            />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-center pt-8 pb-4 text-xs font-medium text-slate-400 gap-4 opacity-70">
            <span>GovAssist Ethiopia v2.4.1 (Offline Capable)</span>
            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              PouchDB Storage: Active
            </span>
          </div>

        </div>
      </main>
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: string, color: "blue" | "purple" | "emerald" }) {
  const styles = {
    blue: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
    purple: "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400",
    emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400",
  };

  return (
    <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/50 p-5 shadow-sm backdrop-blur-sm flex items-center gap-4">
      <div className={cn("size-12 rounded-xl flex items-center justify-center", styles[color])}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-bold">{label}</p>
        <p className="text-xl font-black text-slate-900 dark:text-white font-display tracking-tight">{value}</p>
      </div>
    </div>
  );
}

interface QueueItemProps {
  status: "waiting" | "syncing" | "error";
  title: string;
  subtitle: string;
  id: string;
  time?: string;
  progress?: number;
  errorMsg?: string;
  icon: React.ReactNode;
}

function QueueItem({ status, title, subtitle, id, time, progress, errorMsg, icon }: QueueItemProps) {
  return (
    <div className={cn(
      "group relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 rounded-2xl border bg-white/60 dark:bg-slate-900/60 p-5 shadow-sm transition-all hover:shadow-md backdrop-blur-sm",
      status === "error" ? "border-red-200 dark:border-red-900/30 opacity-90 hover:opacity-100" : "border-slate-200/60 dark:border-slate-800/60",
      status === "syncing" && "border-blue-200/60 dark:border-blue-900/30"
    )}>
      {/* Left Side */}
      <div className="flex items-start gap-4">
        <div className={cn(
          "flex size-12 shrink-0 items-center justify-center rounded-xl",
          status === "waiting" && "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400",
          status === "syncing" && "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
          status === "error" && "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"
        )}>
          {icon}
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h4 className="text-base font-bold text-slate-900 dark:text-white font-display">{title}</h4>
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 font-ethiopic">
              {subtitle}
            </span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-0.5">
            ID: {id} • 
            {status === "waiting" && " Saved locally"}
            {status === "syncing" && " Uploading photos..."}
            {status === "error" && <span className="text-red-600 dark:text-red-400"> {errorMsg}</span>}
          </p>
          
          {/* Mobile Status */}
          <div className="mt-2 flex items-center gap-2 sm:hidden">
             {status === "waiting" && (
                <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  <span className="mr-1.5 size-1.5 rounded-full bg-slate-500"></span>
                  Waiting
                </span>
             )}
             {status === "error" && (
                <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-bold text-red-700 dark:bg-red-900/30 dark:text-red-300">
                  <AlertCircle className="mr-1.5 w-3 h-3" />
                  Failed
                </span>
             )}
          </div>
        </div>
      </div>

      {/* Right Side / Actions */}
      <div className="flex flex-col items-end gap-3 sm:flex-row sm:items-center sm:gap-6 w-full sm:w-auto">
        
        {/* Status Indicator (Desktop) */}
        <div className="hidden sm:flex flex-col items-end gap-1 min-w-[140px]">
          {status === "waiting" && (
            <>
              <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                <span className="mr-1.5 size-1.5 rounded-full bg-slate-500"></span>
                Waiting for connection
              </span>
              <span className="text-[10px] text-slate-400 font-medium">{time}</span>
            </>
          )}
          {status === "syncing" && (
            <div className="w-full">
               <div className="flex justify-between text-xs mb-1">
                  <span className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                     <span className="block size-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                     Syncing
                  </span>
                  <span className="font-bold text-slate-700 dark:text-white">{progress}%</span>
               </div>
               <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full rounded-full bg-blue-500 transition-all duration-500 relative" style={{ width: `${progress}%` }}>
                     <div className="absolute inset-0 bg-white/30 animate-[shimmer_2s_infinite]" />
                  </div>
               </div>
            </div>
          )}
          {status === "error" && (
             <>
                <span className="inline-flex items-center rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-bold text-red-700 dark:bg-red-900/30 dark:text-red-300 border border-red-100 dark:border-red-800/50">
                  <AlertCircle className="mr-1.5 w-3 h-3" />
                  Sync Failed
                </span>
                <button className="text-[10px] text-red-600 font-bold hover:underline decoration-dotted">
                   View details
                </button>
             </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 border-t border-slate-100 dark:border-slate-800/50 pt-3 sm:border-t-0 sm:pt-0 w-full sm:w-auto justify-end">
          {status === "syncing" ? (
             <>
                <button className="p-2 text-slate-300 dark:text-slate-600 cursor-not-allowed rounded-lg" disabled title="Edit Disabled">
                   <Edit2 className="w-4 h-4" />
                </button>
                <button className="flex items-center gap-1.5 rounded-lg bg-white dark:bg-slate-800 px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-sm hover:bg-slate-50">
                   Pause
                   <Pause className="w-3.5 h-3.5" />
                </button>
             </>
          ) : (
             <>
                <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors" title="Edit Draft">
                   <Edit2 className="w-4 h-4" />
                </button>
                <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors" title="Delete">
                   <Trash2 className="w-4 h-4" />
                </button>
                {status === "waiting" && (
                   <button className="flex items-center gap-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                      Sync
                      <ArrowUpCircle className="w-3.5 h-3.5" />
                   </button>
                )}
                {status === "error" && (
                   <button className="flex items-center gap-1.5 rounded-lg bg-red-50 dark:bg-red-900/20 px-3 py-1.5 text-xs font-bold text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors border border-red-200 dark:border-red-800/50">
                      Retry
                      <RefreshCw className="w-3.5 h-3.5" />
                   </button>
                )}
             </>
          )}
        </div>
      </div>
    </div>
  );
}
