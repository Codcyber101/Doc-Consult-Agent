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
  ChevronRight,
  Shield,
  ExternalLink
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const STATS = [
  { label: 'Active Submissions', value: '1,284', change: '+12%', icon: <Activity className="text-primary" /> },
  { label: 'Pending Reviews', value: '42', change: '-5%', icon: <Clock className="text-gold-600" /> },
  { label: 'Verified Identities', value: '85.2k', change: '+8%', icon: <ShieldCheck className="text-primary" /> },
  { label: 'Policy Assets', value: '12', change: '0%', icon: <Archive className="text-slate-600" /> },
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
        className="flex justify-between items-end"
      >
        <div>
           <h1 className="text-4xl font-display font-bold tracking-tight text-slate-900">
             Registry <span className="text-primary italic">Surveillance</span>
           </h1>
           <p className="text-slate-500 font-medium text-lg mt-2">Real-time status of sovereign document processes.</p>
        </div>
        <Button variant="sovereign" size="sm" className="hidden md:flex gap-2">
           <Shield className="w-4 h-4" /> System Audit Report
        </Button>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {STATS.map((stat) => (
          <motion.div key={stat.label} variants={item}>
             <Card className="hover:border-primary/50 transition-all duration-500 overflow-hidden relative">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                   <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center">
                      {stat.icon}
                   </div>
                   <div className={cn(
                     "text-[10px] font-black px-2 py-0.5 rounded-full",
                     stat.change.startsWith('+') ? "bg-primary/10 text-primary" : 
                     stat.change === '0%' ? "bg-surface text-slate-500" : "bg-red-50 text-red-700"
                   )}>
                     {stat.change}
                   </div>
                </CardHeader>
                <CardContent>
                   <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{stat.label}</p>
                   <p className="text-3xl font-display font-bold text-slate-900 tracking-tighter">{stat.value}</p>
                </CardContent>
                <div className="absolute inset-0 grain opacity-[0.02] pointer-events-none" />
             </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Transmission Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
           <Card className="h-full relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between">
                 <div>
                    <CardTitle className="text-xl">Transmission Volume</CardTitle>
                    <CardDescription>National Gateway Traffic</CardDescription>
                 </div>
                 <select className="bg-surface border border-border rounded-lg px-3 py-1.5 text-[10px] font-black uppercase tracking-widest outline-none">
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                 </select>
              </CardHeader>
              <CardContent className="h-[300px] flex items-end justify-between gap-3 pt-10">
                 {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 1 }}
                      className="flex-1 bg-gradient-to-r from-primary to-primary-dark rounded-t-lg relative group"
                    >
                       <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                          {Math.round(h * 12.4)}
                       </div>
                    </motion.div>
                 ))}
              </CardContent>
              <div className="absolute inset-0 bg-mesh opacity-5 pointer-events-none" />
           </Card>
        </motion.div>

        {/* Recent Escalations */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
           <Card className="bg-slate-900 text-white border-none h-full relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between border-b border-white/5">
                 <CardTitle className="text-xl text-white">Escalations</CardTitle>
                 <Button variant="ghost" size="icon" className="text-gold-500 hover:text-white hover:bg-white/5">
                    <ArrowUpRight size={20} />
                 </Button>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                 {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-pointer group">
                       <div className="w-10 h-10 rounded-xl bg-gold-500/20 flex items-center justify-center text-gold-500 font-bold text-xs border border-gold-500/20">
                          {i}
                       </div>
                       <div className="flex-1">
                          <p className="text-xs font-bold uppercase tracking-tight">ID: #RE-992{i}</p>
                          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mt-0.5">Trade License • Bole</p>
                       </div>
                       <ChevronRight size={14} className="text-slate-600 group-hover:text-white transition-colors" />
                    </div>
                 ))}
                 
                 <Button className="w-full mt-6 bg-primary hover:bg-primary text-white font-bold text-xs uppercase tracking-widest h-12 shadow-glow-primary">
                    Enter Review Queue
                 </Button>
              </CardContent>
              <div className="absolute inset-0 grain opacity-5 pointer-events-none" />
           </Card>
        </motion.div>
      </div>
    </div>
  );
}