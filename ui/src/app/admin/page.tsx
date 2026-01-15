'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  FileText, 
  Activity, 
  ShieldCheck, 
  ArrowUpRight, 
  TrendingUp,
  Clock,
  Archive,
  ChevronRight
} from 'lucide-react';

const STATS = [
  { label: 'Active Submissions', value: '1,284', change: '+12%', icon: <Activity className="text-sovereign-green" /> },
  { label: 'Pending Reviews', value: '42', change: '-5%', icon: <Clock className="text-sovereign-gold" /> },
  { label: 'Verified Identities', value: '85.2k', change: '+8%', icon: <ShieldCheck className="text-sovereign-green" /> },
  { label: 'Policy Assets', value: '12', change: '0%', icon: <Archive className="text-sovereign-slate" /> },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export default function AdminDashboardPage() {
  return (
    <div className="space-y-12">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h1 className="text-4xl font-black tracking-tight text-sovereign-slate uppercase">
          Registry <span className="text-sovereign-green italic">Overview</span>
        </h1>
        <p className="text-gray-500 font-medium text-lg mt-2">Real-time surveillance of sovereign document processes.</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {STATS.map((stat) => (
          <motion.div 
            key={stat.label} 
            variants={item}
            className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sovereign group hover:border-sovereign-green transition-all duration-500"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-sovereign-sand flex items-center justify-center group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${stat.change.startsWith('+') ? 'text-green-500' : stat.change === '0%' ? 'text-gray-400' : 'text-sovereign-red'}`}>
                {stat.change} <TrendingUp size={10} />
              </div>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">{stat.label}</p>
            <p className="text-3xl font-black text-sovereign-slate tracking-tighter">{stat.value}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Activity Chart Placeholder */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sovereign relative overflow-hidden min-h-[400px]"
        >
          <div className="flex items-center justify-between mb-10 relative z-10">
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight text-sovereign-slate">Transmission volume</h3>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">National Gateway Traffic</p>
            </div>
            <select className="bg-sovereign-sand border-none rounded-xl px-4 py-2 text-xs font-black uppercase tracking-widest outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          
          <div className="absolute inset-0 flex items-end justify-between px-10 pb-10 gap-4 opacity-20">
            {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
              <div key={i} className="flex-1 bg-sovereign-green rounded-t-xl" style={{ height: `${h}%` }} />
            ))}
          </div>
          
          <div className="absolute inset-0 ethio-pattern opacity-5 pointer-events-none" />
        </motion.div>

        {/* Recent Reviews */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-sovereign-slate text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden"
        >
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black uppercase tracking-tight">Escalations</h3>
              <button className="text-sovereign-gold">
                <ArrowUpRight size={20} />
              </button>
            </div>
            
            <div className="space-y-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-pointer group">
                  <div className="w-10 h-10 rounded-xl bg-sovereign-gold/20 flex items-center justify-center text-sovereign-gold font-black text-xs">
                    {i}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold uppercase tracking-tight">ID: #RE-992{i}</p>
                    <p className="text-[10px] text-white/40 uppercase font-black tracking-widest mt-0.5">Trade License • Bole</p>
                  </div>
                  <ChevronRight size={14} className="text-white/20 group-hover:text-white transition-colors" />
                </div>
              ))}
            </div>
            
            <button className="w-full mt-10 py-4 bg-sovereign-green rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-green-700 transition-all shadow-lg shadow-sovereign-green/20">
              Enter Review Queue
            </button>
          </div>
          
          <div className="absolute bottom-0 right-0 p-8 opacity-5 pointer-events-none">
            <Users size={160} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
