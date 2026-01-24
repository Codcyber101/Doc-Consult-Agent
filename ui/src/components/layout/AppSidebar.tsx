"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Files, 
  History, 
  Settings, 
  Search, 
  Bell, 
  Menu,
  ChevronRight,
  LogOut,
  Database
} from "lucide-react";
import { cn } from "@/lib/utils";

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-72 flex-col bg-white/60 dark:bg-slate-950/60 backdrop-blur-xl border-r border-slate-200/50 dark:border-slate-800/50 h-screen fixed inset-y-0 z-40 transition-all duration-300">
      {/* Logo Area */}
      <div className="p-6 pb-2">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="size-10 rounded-xl bg-gradient-emerald flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/30 transition-all duration-300 group-hover:scale-105">
            <span className="font-display font-bold text-xl">G</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-slate-900 dark:text-white text-lg font-bold leading-none tracking-tight font-display">GovAssist</h1>
            <p className="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">Ethiopia</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Main Menu</p>
        
        <NavItem 
          href="/" 
          icon={<LayoutDashboard className="w-5 h-5" />} 
          label="Dashboard" 
          active={pathname === "/"} 
        />
        <NavItem 
          href="/services" 
          icon={<Files className="w-5 h-5" />} 
          label="Services" 
          active={pathname === "/services"} 
        />
        <NavItem 
          href="/queue" 
          icon={<History className="w-5 h-5" />} 
          label="My Queue" 
          subLabel="የኔ ተራ"
          active={pathname === "/queue"} 
          badge="3"
        />
        
        <div className="my-6 border-t border-slate-200/50 dark:border-slate-800/50" />
        
        <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">System</p>
        
        <div className="px-3 py-2">
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 border border-slate-200/50 dark:border-slate-800/50">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <Database className="w-3.5 h-3.5" />
                <span className="text-xs font-bold">Local DB</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-1.5 py-0.5 rounded">Sync Active</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 mb-1 overflow-hidden">
              <div className="bg-emerald-500 h-1.5 rounded-full w-[24%]" />
            </div>
            <p className="text-[10px] text-slate-400 text-right font-mono">12MB / 50MB</p>
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-200/50 dark:border-slate-800/50">
        <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors group">
          <div className="size-8 rounded-full bg-slate-200 dark:bg-slate-800 bg-cover bg-center border border-slate-300 dark:border-slate-700" style={{ backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuACYnbNdZ0sQ2bijywWPsOr6EORkHVp6eE_lwnbukfNMRfTfT9NqcpkXtlKGC_hFtb168J-kmUP2SFDphPpRj43xnDln0R_bN0fe2arnXscIdYmkhXNMFuuPwFf-JFlcqcgkpBAvDuXySRsgKHTy8-wHT_ywxRTDrSclH0Sufzy0-ctxgmhCI4yEZE9D5_e1l7wFN6kpjG5JIuIBqFKphnloBrNwsdH0uqgKWC2toxe684Y8YhCu6thUTDWhkgbHIDVAbeyJWNBaQ)' }} />
          <div className="flex flex-col items-start">
            <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 transition-colors">Abebe Bikila</span>
            <span className="text-[10px] text-slate-500">Citizen ID: 94822</span>
          </div>
          <Settings className="w-4 h-4 ml-auto text-slate-400 group-hover:rotate-90 transition-transform" />
        </button>
      </div>
    </aside>
  );
}

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  subLabel?: string;
  active?: boolean;
  badge?: string;
}

function NavItem({ href, icon, label, subLabel, active, badge }: NavItemProps) {
  return (
    <Link 
      href={href} 
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden",
        active 
          ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 font-bold shadow-sm" 
          : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white font-medium"
      )}
    >
      {active && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-emerald-500 rounded-r-full" />}
      <div className={cn("transition-transform group-hover:scale-110", active && "text-emerald-600")}>
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-sm leading-none">{label}</span>
        {subLabel && <span className="text-[10px] opacity-70 font-normal font-ethiopic mt-0.5">{subLabel}</span>}
      </div>
      {badge && (
        <span className="ml-auto bg-emerald-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md shadow-sm">
          {badge}
        </span>
      )}
    </Link>
  );
}
