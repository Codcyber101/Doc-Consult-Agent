'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, RefreshCw, Users, ShieldAlert, Clock, ChevronRight } from 'lucide-react';

const MOCK_QUEUE = [
  {
    id: 'RE-101',
    documentType: 'Trade License Archive',
    amharic: 'የንግድ ፈቃድ',
    reason: 'Cryptographic stamp mismatch on sector 2',
    submittedAt: '2 hours ago',
    user: 'Abebe Kebede',
    status: 'PENDING'
  },
  {
    id: 'RE-102',
    documentType: 'Sovereign Birth Certificate',
    amharic: 'የልደት ምስክር ወረቀት',
    reason: 'Agent confidence below threshold (0.45)',
    submittedAt: '5 hours ago',
    user: 'Sara Tadesse',
    status: 'PENDING'
  },
  {
    id: 'RE-103',
    documentType: 'Investment Proclamation Permit',
    amharic: 'የኢንቨስትመንት ፈቃድ',
    reason: 'Complex legal clause detected',
    submittedAt: '1 day ago',
    user: 'Ethio SME Corp',
    status: 'IN_PROGRESS'
  }
] as const;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { y: 10, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export default function ReviewQueuePage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-4 h-4 text-sovereign-gold" />
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-400">Human-in-the-Loop</span>
          </div>
          <h1 className="text-5xl font-black text-gray-900 tracking-tighter uppercase text-white dark:text-gray-900">Review <span className="text-sovereign-green italic">Orchestra</span></h1>
          <p className="text-gray-500 mt-4 font-medium text-lg max-w-2xl leading-relaxed">
            Verify low-confidence autonomous extractions and issue authoritative sovereign signatures.
          </p>
        </div>
        <button className="flex items-center gap-4 px-8 py-4 bg-white border border-gray-200 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-sm hover:border-sovereign-gold transition-all group">
          <RefreshCw size={16} className="text-sovereign-gold group-hover:rotate-180 transition-transform duration-700" />
          <span>Sync Queue</span>
        </button>
      </div>

      {/* Modern Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Pending Authority', val: '12', color: 'text-sovereign-slate', icon: <Clock /> },
          { label: 'Active Sessions', val: '04', color: 'text-sovereign-green', icon: <Users /> },
          { label: 'SLA Risk Factor', val: '02', color: 'text-sovereign-red', icon: <ShieldAlert /> },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sovereign"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{stat.label}</span>
              <div className={`w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center opacity-40`}>
                {React.isValidElement(stat.icon) && React.cloneElement(stat.icon as React.ReactElement<any>, { size: 14 })}
              </div>
            </div>
            <p className={`text-5xl font-black tracking-tighter ${stat.color}`}>{stat.val}</p>
          </motion.div>
        ))}
      </div>

      {/* Integrated Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-sovereign-green transition-colors" size={20} />
          <input 
            type="text"
            placeholder="Search by ID, applicant name or archive hash..."
            className="w-full pl-16 pr-6 py-5 bg-white border-2 border-transparent focus:border-sovereign-green rounded-[2rem] font-bold text-sm outline-none transition-all shadow-sovereign"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center justify-center gap-4 px-10 py-5 bg-sovereign-slate text-white rounded-[2rem] font-black text-[10px] uppercase tracking-[0.2em] shadow-xl hover:bg-black transition-all">
          <Filter size={18} className="text-sovereign-gold" />
          <span>Advanced Filter</span>
        </button>
      </div>

      {/* Enhanced Queue List */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {MOCK_QUEUE.map((item_q) => (
          <motion.div 
            key={item_q.id}
            variants={item}
            className="group bg-white p-8 rounded-[3rem] border border-gray-100 hover:border-sovereign-green transition-all duration-500 shadow-sm hover:shadow-2xl relative overflow-hidden"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
              <div className="flex items-center gap-8 w-full md:w-auto">
                <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-inner transition-all duration-500 ${item_q.status === 'IN_PROGRESS' ? 'bg-sovereign-green text-white rotate-3' : 'bg-sovereign-sand text-sovereign-slate'}`}>
                  <span className="font-black text-xs">{item_q.id.split('-')[1]}</span>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="text-xl font-black text-sovereign-slate uppercase tracking-tight">{item_q.documentType}</h4>
                    <span className="text-[10px] font-black text-sovereign-gold uppercase italic">{item_q.amharic}</span>
                  </div>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sovereign-gold" />
                    Archive: {item_q.id} • User: {item_q.user}
                  </p>
                </div>
              </div>

              <div className="flex-1 px-8 border-l border-gray-50 hidden lg:block">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Escalation Reason</p>
                <p className="text-sm font-semibold text-sovereign-red leading-relaxed">{item_q.reason}</p>
              </div>

              <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                <div className="text-right">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{item_q.submittedAt}</p>
                  <span className={`inline-block mt-1 px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase border ${
                    item_q.status === 'IN_PROGRESS' ? 'bg-sovereign-green/10 border-sovereign-green/20 text-sovereign-green' : 'bg-gray-50 border-gray-100 text-gray-400'
                  }`}>
                    {item_q.status}
                  </span>
                </div>
                <button className="w-12 h-12 rounded-2xl bg-sovereign-sand flex items-center justify-center group-hover:bg-sovereign-gold group-hover:text-white transition-all shadow-sm">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
            
            {/* Subtle motif */}
            <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none group-hover:opacity-[0.05] transition-opacity">
              <ShieldAlert size={120} />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}