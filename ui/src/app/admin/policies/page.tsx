'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileCode, 
  History, 
  Plus, 
  Search, 
  ChevronRight,
  MoreVertical,
  MapPin,
  PlayCircle,
  Database,
  ShieldCheck,
  Zap
} from 'lucide-react';

const MOCK_POLICIES = [
  { id: 'p1', name: 'trade-license.yaml', amharic: 'የንግድ ፈቃድ', jurisdiction: 'Addis Ababa / Bole', version: 'v2.4.0', status: 'ACTIVE', updatedAt: 'Jan 14, 2026' },
  { id: 'p2', name: 'passport-renewal.yaml', amharic: 'ፓስፖርት እድሳት', jurisdiction: 'Federal / Immigration', version: 'v1.1.2', status: 'DRAFT', updatedAt: 'Jan 05, 2026' },
  { id: 'p3', name: 'investment-permit.yaml', amharic: 'የኢንቨስትመንት ፈቃድ', jurisdiction: 'Federal / EIC', version: 'v3.0.1', status: 'ACTIVE', updatedAt: 'Dec 20, 2025' },
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

export default function PolicyListPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Database className="w-4 h-4 text-sovereign-gold" />
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-400">National Policy Registry</span>
          </div>
          <h1 className="text-5xl font-black text-gray-900 tracking-tighter uppercase">Registry <span className="text-sovereign-green italic">Vault</span></h1>
          <p className="text-gray-500 mt-4 font-medium text-lg max-w-2xl leading-relaxed">
            Archive and manage procedural playbooks with deterministic compliance rules. 
            All changes are cryptographically signed and auditable.
          </p>
        </div>
        <button className="flex items-center gap-4 px-10 py-5 bg-sovereign-slate text-white rounded-[2rem] font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl shadow-sovereign-slate/20 hover:bg-black transition-all group">
          <Plus size={18} className="text-sovereign-gold group-hover:rotate-90 transition-transform" />
          <span>New Playbook</span>
        </button>
      </div>

      {/* Registry Browser */}
      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sovereign overflow-hidden">
        <div className="p-8 border-b border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6 bg-sovereign-sand/30">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Search by ID, name or jurisdiction..."
              className="w-full pl-16 pr-6 py-5 bg-white border-2 border-transparent focus:border-sovereign-green rounded-2xl font-bold text-sm outline-none transition-all shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="w-12 h-12 flex items-center justify-center bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-sovereign-slate transition-all shadow-sm">
              <History size={20} />
            </button>
            <button className="w-12 h-12 flex items-center justify-center bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-sovereign-slate transition-all shadow-sm">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] bg-gray-50/50">
                <th className="px-10 py-6">Playbook Archive</th>
                <th className="px-10 py-6">Jurisdiction</th>
                <th className="px-10 py-6">Active Hash</th>
                <th className="px-10 py-6 text-right">Registry Operations</th>
              </tr>
            </thead>
            <motion.tbody 
              variants={container}
              initial="hidden"
              animate="show"
              className="divide-y divide-gray-50"
            >
              {MOCK_POLICIES.map((policy) => (
                <motion.tr 
                  key={policy.id} 
                  variants={item}
                  className="hover:bg-sovereign-sand/50 transition-all group cursor-pointer"
                >
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 bg-sovereign-sand text-sovereign-green rounded-2xl flex items-center justify-center group-hover:bg-sovereign-green group-hover:text-white transition-all duration-500 shadow-sm border border-white/50">
                        <FileCode size={24} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-black text-sovereign-slate uppercase tracking-tight">{policy.name}</p>
                          <span className="text-[10px] font-black text-sovereign-gold uppercase italic">{policy.amharic}</span>
                        </div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                          <Zap size={10} className="text-sovereign-gold" />
                          Authenticated {policy.updatedAt}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex items-center text-xs font-bold text-gray-600 tracking-tight">
                      <MapPin size={14} className="mr-3 text-sovereign-gold" />
                      {policy.jurisdiction}
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 text-[9px] font-black tracking-[0.15em] rounded-lg border ${
                        policy.status === 'ACTIVE' 
                          ? 'bg-sovereign-green/10 border-sovereign-green/20 text-sovereign-green' 
                          : 'bg-sovereign-gold/10 border-sovereign-gold/20 text-sovereign-gold'
                      }`}>
                        {policy.version} • {policy.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-10 py-8 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="w-10 h-10 flex items-center justify-center text-gray-300 hover:text-sovereign-green hover:bg-white rounded-xl transition-all hover:shadow-md">
                        <PlayCircle size={20} />
                      </button>
                      <button className="w-10 h-10 flex items-center justify-center text-gray-300 hover:text-sovereign-gold hover:bg-white rounded-xl transition-all hover:shadow-md">
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>
        
        <div className="p-8 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Showing 3 of 12 Procedural Assets</p>
          <div className="flex gap-2">
            {[1, 2, 3].map(n => (
              <button key={n} className={`w-8 h-8 rounded-lg text-[10px] font-black flex items-center justify-center transition-all ${n === 1 ? 'bg-sovereign-slate text-white' : 'bg-white border border-gray-200 text-gray-400 hover:border-sovereign-gold'}`}>
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Audit Pillars */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm flex gap-6">
          <div className="w-12 h-12 bg-sovereign-green/10 rounded-2xl flex items-center justify-center text-sovereign-green flex-shrink-0">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h4 className="font-black text-xs uppercase tracking-widest text-gray-900 mb-2">Immutable Logs</h4>
            <p className="text-xs text-gray-500 leading-relaxed font-medium">Every registry modification is signed with a private key and hashed for national audit.</p>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm flex gap-6">
          <div className="w-12 h-12 bg-sovereign-gold/10 rounded-2xl flex items-center justify-center text-sovereign-gold flex-shrink-0">
            <Zap size={24} />
          </div>
          <div>
            <h4 className="font-black text-xs uppercase tracking-widest text-gray-900 mb-2">Instant Deployment</h4>
            <p className="text-xs text-gray-500 leading-relaxed font-medium">Approved playbooks are synchronized across all edge nodes within 300ms.</p>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm flex gap-6 text-center justify-center flex-col items-center">
          <span className="text-3xl font-black text-sovereign-slate">99.9%</span>
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Registry Integrity Score</span>
        </div>
      </div>
    </div>
  );
}