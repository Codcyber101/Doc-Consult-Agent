'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Database, 
  Play, 
  Terminal, 
  Loader2,
  AlertCircle,
  Globe,
  Network,
  Activity,
  Archive,
  Cpu
} from 'lucide-react';

export default function ResearchLabPage() {
  const [isCrawlActive, setIsCrawlActive] = useState(false);

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Cpu className="w-4 h-4 text-sovereign-gold" />
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-400">Agentic Orchestration</span>
          </div>
          <h1 className="text-5xl font-black text-gray-900 tracking-tighter uppercase">Research <span className="text-sovereign-green italic">Lab</span></h1>
          <p className="text-gray-500 mt-4 font-medium text-lg max-w-2xl leading-relaxed">
            Initialize sovereign research agents to discover, ingest, and draft new policy archives from authorized domains.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Configuration Panel */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white p-10 rounded-[3rem] shadow-sovereign border border-gray-100 space-y-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-sovereign-sand rounded-2xl flex items-center justify-center text-sovereign-slate">
                <Archive size={24} />
              </div>
              <h3 className="font-black text-gray-900 uppercase tracking-tight">Job Archive</h3>
            </div>
            
            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-4">Research Objective</label>
                <div className="relative">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="e.g. Proclamation 1321/2025"
                    className="w-full p-5 pl-14 bg-sovereign-sand border-2 border-transparent focus:border-sovereign-green rounded-2xl font-bold text-sm outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-4">Authorized Sovereignty (Allowlist)</label>
                <div className="grid gap-3">
                  {['moti.gov.et', 'eic.gov.et', 'chilot.me'].map((domain) => (
                    <label key={domain} className="flex items-center justify-between p-4 bg-sovereign-sand rounded-xl cursor-pointer border-2 border-transparent hover:border-sovereign-gold/20 transition-all group">
                      <span className="text-xs font-black text-sovereign-slate uppercase tracking-widest">{domain}</span>
                      <div className="relative flex items-center">
                        <input type="checkbox" defaultChecked className="peer h-5 w-5 appearance-none rounded-lg border-2 border-gray-300 bg-white checked:bg-sovereign-green checked:border-sovereign-green transition-all" />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 peer-checked:opacity-100">
                          <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => setIsCrawlActive(true)}
                className="w-full py-6 bg-sovereign-slate text-white rounded-[2rem] font-black text-[10px] uppercase tracking-[0.2em] hover:bg-black transition-all shadow-2xl shadow-sovereign-slate/20 flex items-center justify-center gap-4 group"
              >
                <Play size={16} className="text-sovereign-gold group-hover:scale-110 transition-transform" />
                <span>Initialize Research Agent</span>
              </button>
            </div>
          </div>

          <div className="bg-sovereign-gold/5 border-2 border-sovereign-gold/20 p-8 rounded-[2.5rem] flex items-start gap-6">
            <AlertCircle className="w-6 h-6 text-sovereign-gold mt-1 flex-shrink-0" />
            <p className="text-xs text-sovereign-slate leading-relaxed font-bold uppercase tracking-tight">
              Agents strictly enforce domain-residency protocols. Any attempt to access unauthorized external vectors will trigger an immediate sovereign shutdown.
            </p>
          </div>
        </div>

        {/* Real-time Agent Surveillance */}
        <div className="lg:col-span-8">
          <div className="bg-sovereign-slate rounded-[3.5rem] shadow-2xl overflow-hidden border border-white/5 flex flex-col h-[700px] relative">
            <div className="bg-white/5 p-8 px-10 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-sovereign-gold/10 flex items-center justify-center text-sovereign-gold shadow-inner">
                  <Terminal size={18} />
                </div>
                <div>
                  <span className="text-white font-black text-xs uppercase tracking-[0.2em]">Activity Surveillance</span>
                  <p className="text-[9px] text-white/40 font-bold uppercase tracking-widest mt-0.5">National Data Center Node: 01</p>
                </div>
              </div>
              <AnimatePresence>
                {isCrawlActive && (
                  <motion.div 
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3 px-4 py-2 bg-sovereign-green/20 rounded-full border border-sovereign-green/30"
                  >
                    <div className="w-2 h-2 bg-sovereign-green rounded-full animate-ping" />
                    <span className="text-sovereign-green text-[10px] font-black uppercase tracking-widest">Agent Operational</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="flex-1 p-12 font-mono text-sm space-y-6 overflow-auto custom-scrollbar">
              {!isCrawlActive ? (
                <div className="h-full flex flex-col items-center justify-center text-white/20 gap-6">
                  <Activity size={64} strokeWidth={1} className="opacity-50" />
                  <p className="font-black text-[10px] uppercase tracking-[0.3em]">Awaiting Instruction Set...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sovereign-gold font-black">[SYSTEM] Booting Policy Agent Kernel v1.4.2-GAE...</motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-white/60">[NETWORK] Handshake verified with National Gateway...</motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="text-white/60">[RESEARCH] Target defined: Federal Investment Proclamation 2025</motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="text-white/60 group flex items-center gap-2">
                    <Globe size={14} className="text-sovereign-green" />
                    <span>[CRAWL] Navigating chilot.me/archives/federal-registry...</span>
                  </motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="text-sovereign-green font-bold">[V-ID] MATCH FOUND: Proclamation_1321_2025.pdf (MD5: 0x82f...)</motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }} className="text-white/60">[PARSE] Extracting Article 12: Administrative Prerequisites...</motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }} className="text-white/60 flex items-center gap-3">
                    <Loader2 className="w-4 h-4 animate-spin text-sovereign-gold" />
                    <span>[TRANSFORM] Synthesizing Sovereign Playbook YAML...</span>
                  </motion.div>
                </div>
              )}
            </div>

            <div className="absolute inset-0 ethio-pattern opacity-5 pointer-events-none" />

            {isCrawlActive && (
              <motion.div 
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                className="p-10 bg-white/5 border-t border-white/5 backdrop-blur-sm"
              >
                <div className="flex items-center justify-between text-[10px] font-black text-white/40 mb-4 uppercase tracking-[0.2em]">
                  <span>Autonomous Progress</span>
                  <span className="text-white">74.2%</span>
                </div>
                <div className="h-3 bg-black/40 rounded-full overflow-hidden border border-white/5 p-0.5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "74.2%" }}
                    transition={{ duration: 2, ease: "circOut" }}
                    className="h-full bg-sovereign-gold rounded-full shadow-[0_0_15px_rgba(212,175,55,0.4)]" 
                  />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}