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
  ExternalLink
} from 'lucide-react';

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
    <div className="flex h-screen bg-sovereign-sand selection:bg-sovereign-gold selection:text-white">
      {/* Background Pattern */}
      <div className="fixed inset-0 ethio-pattern opacity-10 pointer-events-none" />

      {/* Modern Sidebar */}
      <nav className="w-72 bg-sovereign-slate text-white p-8 flex flex-col relative z-10 shadow-2xl">
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="w-10 h-10 bg-sovereign-green rounded-xl flex items-center justify-center text-white shadow-lg shadow-sovereign-green/20">
            <Shield size={20} />
          </div>
          <div>
            <h2 className="text-lg font-black tracking-tight text-white uppercase leading-none">GovAssist</h2>
            <p className="text-[9px] font-black text-sovereign-gold uppercase tracking-[0.2em] mt-1 opacity-80">Admin Command Center</p>
          </div>
        </div>
        
        <div className="flex-1 space-y-1">
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-white/30 mb-4 px-4">Registry Control</p>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name}
                href={item.href}
                className={`
                  relative flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 font-bold group
                  ${isActive 
                    ? 'bg-white/5 text-white shadow-lg border border-white/10' 
                    : 'text-white/50 hover:text-white hover:bg-white/5'}
                `}
              >
                {isActive && (
                  <motion.div 
                    layoutId="active-nav"
                    className="absolute left-0 w-1 h-6 bg-sovereign-gold rounded-full"
                  />
                )}
                <span className={`${isActive ? 'text-sovereign-gold' : 'group-hover:text-sovereign-gold'} transition-colors`}>
                  {item.icon}
                </span>
                <span className="text-xs uppercase tracking-widest">{item.name}</span>
              </Link>
            );
          })}
        </div>

        <div className="mt-auto pt-8 space-y-4">
          <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Network Status</span>
              <div className="w-2 h-2 rounded-full bg-sovereign-green animate-pulse" />
            </div>
            <p className="text-[10px] font-bold text-white/60 uppercase leading-relaxed">
              Connected to National Data Center Cluster <br/>
              <span className="text-white">SOVEREIGN-NODE-01</span>
            </p>
          </div>
          
          <button className="flex items-center gap-4 px-4 py-4 rounded-2xl text-white/50 hover:text-white hover:bg-white/5 w-full text-left transition-all">
            <Settings size={18} />
            <span className="text-xs font-black uppercase tracking-widest">System Settings</span>
          </button>
        </div>
      </nav>
      
      {/* Main Content Area */}
      <main className="flex-1 overflow-auto relative z-10">
        <header className="h-20 bg-white/50 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-10 sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Environment</span>
            <div className="px-3 py-1 bg-sovereign-slate text-white text-[9px] font-black rounded-lg uppercase tracking-widest">Production</div>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="text-xs font-black uppercase tracking-widest text-gray-500 hover:text-sovereign-slate flex items-center gap-2 transition-all">
              Go to Portal <ExternalLink size={12} className="text-sovereign-gold" />
            </button>
            <div className="w-px h-4 bg-gray-200" />
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-[10px] font-black text-gray-900 uppercase leading-none">T. Cyber</p>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">Registry Admin</p>
              </div>
              <div className="w-10 h-10 bg-sovereign-gold rounded-xl flex items-center justify-center font-black text-white shadow-lg shadow-sovereign-gold/20">
                TC
              </div>
            </div>
          </div>
        </header>

        <div className="p-12 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
