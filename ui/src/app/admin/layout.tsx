"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Users, 
  Search, 
  ShieldCheck, 
  Settings,
  LayoutDashboard,
  Shield,
  ExternalLink,
  Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const NAV_ITEMS = [
  { name: 'Registry Dashboard', href: '/admin', icon: <LayoutDashboard size={18} /> },
  { name: 'Policy Registry', href: '/admin/policies', icon: <FileText size={18} /> },
  { name: 'Human-in-Loop Review', href: '/admin/review', icon: <Users size={18} /> },
  { name: 'Agent Research Lab', href: '/admin/research', icon: <Search size={18} /> },
  { name: 'Sovereign Audit', href: '/admin/audit', icon: <ShieldCheck size={18} /> },
];

export default function AdminDashboard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-slate-50 selection:bg-emerald-100 selection:text-emerald-900 font-sans">
      {/* Background decoration */}
      <div className="fixed inset-0 bg-mesh-emerald pointer-events-none opacity-50" />

      {/* Sovereign Sidebar */}
      <nav className="w-72 bg-slate-900 text-white p-8 flex flex-col relative z-10 shadow-2xl">
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
            <Shield size={20} />
          </div>
          <div>
            <h2 className="text-lg font-display font-bold tracking-tight text-white leading-none">GovAssist</h2>
            <p className="text-[9px] font-black text-gold-500 uppercase tracking-[0.2em] mt-1">Registry Admin</p>
          </div>
        </div>
        
        <div className="flex-1 space-y-1">
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 mb-4 px-4">Core Systems</p>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name}
                href={item.href}
                className={cn(
                  "relative flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 font-bold group",
                  isActive 
                    ? "bg-white/10 text-white shadow-lg border border-white/5" 
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                )}
              >
                {isActive && (
                  <motion.div 
                    layoutId="active-nav"
                    className="absolute left-0 w-1 h-6 bg-gold-500 rounded-full"
                  />
                )}
                <span className={cn(
                  "transition-colors",
                  isActive ? "text-gold-500" : "group-hover:text-gold-500"
                )}>
                  {item.icon}
                </span>
                <span className="text-xs uppercase tracking-widest">{item.name}</span>
              </Link>
            );
          })}
        </div>

        <div className="mt-auto pt-8 space-y-4">
          <div className="p-6 bg-white/5 rounded-3xl border border-white/5 relative overflow-hidden">
            <div className="relative z-10">
               <div className="flex items-center justify-between mb-4">
                 <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Node Status</span>
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
               </div>
               <p className="text-[10px] font-bold text-slate-400 uppercase leading-relaxed">
                 Connected to Cluster <br/>
                 <span className="text-white">SOVEREIGN-NODE-01</span>
               </p>
            </div>
            <div className="absolute inset-0 grain opacity-5" />
          </div>
          
          <button className="flex items-center gap-4 px-4 py-4 rounded-2xl text-slate-400 hover:text-white hover:bg-white/5 w-full text-left transition-all">
            <Settings size={18} />
            <span className="text-xs font-black uppercase tracking-widest">Settings</span>
          </button>
        </div>
      </nav>
      
      {/* Main Content Area */}
      <main className="flex-1 overflow-auto relative z-10 flex flex-col">
        <header className="h-20 bg-white/80 backdrop-blur-glass border-b border-slate-200 flex items-center justify-between px-10 sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <div className="px-3 py-1 bg-slate-900 text-white text-[9px] font-black rounded-lg uppercase tracking-widest">Environment: Production</div>
          </div>
          
          <div className="flex items-center gap-6">
            <Button variant="ghost" size="icon" className="text-slate-400 relative">
               <Bell size={20} />
               <span className="absolute top-2 right-2 w-2 h-2 bg-red-earth rounded-full border border-white"></span>
            </Button>
            
            <div className="w-px h-4 bg-slate-200" />
            
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-[10px] font-black text-slate-900 uppercase leading-none">Admin User</p>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">National Registry</p>
              </div>
              <div className="w-10 h-10 bg-gradient-gold rounded-xl flex items-center justify-center font-bold text-slate-900 shadow-lg shadow-gold-500/20">
                TC
              </div>
            </div>
          </div>
        </header>

        <div className="p-12 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}