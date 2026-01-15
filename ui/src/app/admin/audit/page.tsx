'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Search, 
  Calendar, 
  FileText, 
  Download, 
  Key, 
  CheckCircle2,
  Lock,
  Database,
  History,
  Activity,
  Fingerprint
} from 'lucide-react';

const MOCK_LOGS = [
  { id: 'EV-991', event: 'Archive Decryption', actor: 'VisionRouter Node', timestamp: 'Jan 14, 14:05:22', status: 'SIGNED', hash: '0x82f...a12' },
  { id: 'EV-992', event: 'PII Redaction', actor: 'SafetyAgent Kernel', timestamp: 'Jan 14, 14:05:25', status: 'SIGNED', hash: '0x33d...e99' },
  { id: 'EV-993', event: 'Bureau Authorization', actor: 'Admin:TCyber', timestamp: 'Jan 14, 14:10:11', status: 'SIGNED', hash: '0x11c...b04' },
  { id: 'EV-994', event: 'Gateway Transmission', actor: 'MESOB-Gateway', timestamp: 'Jan 14, 14:12:00', status: 'SIGNED', hash: '0x99a...f21' },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const item = {
  hidden: { y: 10, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export default function AuditExplorerPage() {
  const [isVerifying, setIsVerifying] = useState(false);

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Fingerprint className="w-4 h-4 text-sovereign-gold" />
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-400">National Integrity Archive</span>
          </div>
          <h1 className="text-5xl font-black text-gray-900 tracking-tighter uppercase">Audit <span className="text-sovereign-green italic">Explorer</span></h1>
          <p className="text-gray-500 mt-4 font-medium text-lg max-w-2xl leading-relaxed">
            Verify the immutable sovereign event log and digital artifact provenance. 
            Every interaction is cryptographically anchored to the national ledger.
          </p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-4 px-8 py-4 bg-white border border-gray-200 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-sm hover:border-sovereign-gold transition-all">
            <Download size={16} className="text-sovereign-gold" />
            <span>Export Archive</span>
          </button>
          <button 
            onClick={() => { setIsVerifying(true); setTimeout(() => setIsVerifying(false), 3000); }}
            className="flex items-center gap-4 px-10 py-4 bg-sovereign-slate text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-black transition-all shadow-2xl shadow-sovereign-slate/20"
          >
            <ShieldCheck size={16} className="text-sovereign-gold" />
            <span>Validate Merkle Roots</span>
          </button>
        </div>
      </div>

      {/* Audit Intelligence Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {[
          { label: "Archived Events", val: '14,284', icon: <History /> },
          { label: "Signed Artifacts", val: '8,562', icon: <Key /> },
          { label: "Ledger Consistency", val: '100%', icon: <ShieldCheck /> },
          { label: "Storage Volume", val: '1.4 TB', icon: <Database /> },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sovereign group hover:border-sovereign-gold transition-all"
          >
            <div className="flex items-center gap-3 text-gray-400 font-black text-[10px] uppercase tracking-widest mb-4">
              <div className="w-8 h-8 rounded-lg bg-sovereign-sand flex items-center justify-center text-sovereign-slate group-hover:text-sovereign-gold transition-colors">
                {React.isValidElement(stat.icon) && React.cloneElement(stat.icon as React.ReactElement<any>, { size: 14 })}
              </div>
              <span>{stat.label}</span>
            </div>
            <p className="text-3xl font-black text-sovereign-slate tracking-tighter">{stat.val}</p>
          </motion.div>
        ))}
      </div>

      {/* Ledger Browser */}
      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sovereign overflow-hidden">
        <div className="p-8 border-b border-gray-100 flex flex-col md:flex-row items-center bg-sovereign-sand/20 gap-6">
          <div className="relative flex-1 group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-sovereign-green transition-colors" size={18} />
            <input 
              type="text"
              placeholder="Search by ID, Actor, or Cryptographic Hash..."
              className="w-full pl-16 pr-6 py-4 bg-white border-2 border-transparent focus:border-sovereign-green rounded-2xl font-bold text-sm outline-none transition-all shadow-inner"
            />
          </div>
          <button className="w-14 h-14 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-gray-400 hover:text-sovereign-gold transition-all shadow-sm">
            <Calendar size={20} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] bg-gray-50/50">
                <th className="px-10 py-6">Ledger Sequence</th>
                <th className="px-10 py-6">Operation</th>
                <th className="px-10 py-6">Sovereign Actor</th>
                <th className="px-10 py-6">Verification Hash</th>
                <th className="px-10 py-6 text-right">Integrity</th>
              </tr>
            </thead>
            <motion.tbody 
              variants={container}
              initial="hidden"
              animate="show"
              className="divide-y divide-gray-50"
            >
              {MOCK_LOGS.map((log) => (
                <motion.tr 
                  key={log.id} 
                  variants={item}
                  className="hover:bg-sovereign-sand/50 transition-all group cursor-pointer"
                >
                  <td className="px-10 py-8 font-mono text-xs text-sovereign-gold font-black tracking-widest uppercase">{log.id}</td>
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-sovereign-green animate-pulse" />
                      <span className="text-sm font-black text-sovereign-slate uppercase tracking-tight">{log.event}</span>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-3 text-xs font-bold text-gray-500">
                      <span className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-sovereign-slate group-hover:text-white transition-all">
                        <Activity size={12} />
                      </span>
                      {log.actor}
                    </div>
                  </td>
                  <td className="px-10 py-8 font-mono text-[10px] text-gray-400 group-hover:text-sovereign-slate transition-colors">{log.hash}</td>
                  <td className="px-10 py-8 text-right">
                    <div className="inline-flex items-center gap-3 px-4 py-2 bg-green-50 text-green-600 rounded-xl border border-green-100">
                      <Lock size={12} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Sealed</span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>
      </div>

      {/* Verification Overlay */}
      <AnimatePresence>
        {isVerifying && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-8 overflow-hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-sovereign-slate/90 backdrop-blur-2xl"
            />
            
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotate: 5 }}
              className="bg-white p-16 rounded-[4rem] shadow-2xl text-center max-w-lg border border-white/20 relative z-10"
            >
              <div className="absolute inset-0 ethio-pattern opacity-5 pointer-events-none rounded-[4rem]" />
              
              <div className="relative z-10">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 12, stiffness: 200 }}
                  className="w-32 h-32 bg-sovereign-green text-white rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-sovereign-green/30"
                >
                  <CheckCircle2 size={64} />
                </motion.div>
                
                <h2 className="text-4xl font-black text-sovereign-slate tracking-tighter uppercase mb-4">Chain Authenticated</h2>
                <p className="text-gray-500 font-medium text-lg leading-relaxed mb-10">
                  All Merkle roots successfully validated against the National Gateway ledger. The sovereign event archive is <span className="text-sovereign-green font-black underline decoration-sovereign-gold underline-offset-8">100% untampered</span>.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-sovereign-sand rounded-2xl border border-gray-100">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Status</p>
                    <p className="text-xs font-black text-sovereign-green">VERIFIED</p>
                  </div>
                  <div className="p-4 bg-sovereign-sand rounded-2xl border border-gray-100">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Integrity</p>
                    <p className="text-xs font-black text-sovereign-slate">100% SECURE</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}