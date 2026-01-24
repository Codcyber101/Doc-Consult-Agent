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
  Cpu,
  Shield,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

export default function ResearchLabPage() {
  const [isCrawlActive, setIsCrawlActive] = useState(false);

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Cpu className="w-4 h-4 text-emerald-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Autonomous Orchestration</span>
          </div>
          <h1 className="text-4xl font-display font-bold text-slate-900 tracking-tight">Research <span className="text-emerald-600 italic">Lab</span></h1>
          <p className="text-slate-500 mt-2 font-medium text-lg max-w-2xl leading-relaxed">
            Initialize sovereign research agents to ingest and draft new policy archives.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100">
           <Zap className="w-4 h-4 text-emerald-600 fill-emerald-600" />
           <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">Compute: Optimal</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Configuration Panel */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="rounded-[2.5rem] border-slate-100 shadow-xl overflow-hidden relative">
            <CardHeader className="bg-slate-50 border-b border-slate-100 p-8">
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-900 shadow-sm border border-slate-100">
                   <Archive size={24} />
                 </div>
                 <CardTitle className="text-xl">Job Parameters</CardTitle>
               </div>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Objective</label>
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={16} />
                  <input 
                    type="text" 
                    placeholder="e.g. Proclamation 1321/2025"
                    className="w-full h-12 pl-12 pr-4 bg-white border border-slate-200 rounded-xl font-bold text-sm outline-none focus:border-emerald-500 shadow-sm transition-all"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Domain Allowlist</label>
                <div className="grid gap-2">
                  {['moti.gov.et', 'eic.gov.et', 'chilot.me'].map((domain) => (
                    <label key={domain} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl cursor-pointer border border-transparent hover:border-emerald-500/20 transition-all">
                      <span className="text-xs font-bold text-slate-700 uppercase tracking-widest">{domain}</span>
                      <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" />
                    </label>
                  ))}
                </div>
              </div>

              <Button 
                onClick={() => setIsCrawlActive(true)}
                className="w-full h-14 bg-slate-900 hover:bg-emerald-700 text-white rounded-2xl font-bold gap-3 shadow-xl transition-all group"
              >
                <Play size={16} className={cn("text-gold-500 fill-gold-500 group-hover:scale-110 transition-transform", isCrawlActive && "hidden")} />
                {isCrawlActive ? "Re-initializing..." : "Start Research Agent"}
              </Button>
            </CardContent>
            <div className="absolute inset-0 grain opacity-[0.02] pointer-events-none" />
          </Card>

          <div className="p-6 bg-amber-50 border border-amber-100 rounded-[2rem] flex items-start gap-4">
            <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
            <p className="text-xs text-amber-800 leading-relaxed font-medium">
              Agents strictly enforce <strong>Domain Residency</strong>. Any attempt to access unauthorized external vectors will trigger a sovereign shutdown.
            </p>
          </div>
        </div>

        {/* Surveillance Terminal */}
        <div className="lg:col-span-8">
          <Card className="bg-slate-900 border-none rounded-[3.5rem] shadow-2xl overflow-hidden flex flex-col h-[750px] relative">
            <div className="bg-white/5 p-8 px-10 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-500 border border-gold-500/20">
                  <Terminal size={18} />
                </div>
                <div>
                  <span className="text-white font-black text-xs uppercase tracking-[0.2em]">Agent Surveillance</span>
                  <p className="text-[9px] text-white/40 font-bold uppercase tracking-widest mt-0.5">National Node: 01</p>
                </div>
              </div>
              <AnimatePresence>
                {isCrawlActive && (
                  <motion.div 
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 px-4 py-2 bg-emerald-500/20 rounded-full border border-emerald-500/30"
                  >
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                    <span className="text-emerald-500 text-[10px] font-black uppercase tracking-widest">Active</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="flex-1 p-12 font-mono text-sm space-y-6 overflow-auto custom-scrollbar relative z-10">
              {!isCrawlActive ? (
                <div className="h-full flex flex-col items-center justify-center text-white/10 gap-6">
                  <Activity size={64} strokeWidth={1} className="opacity-50" />
                  <p className="font-black text-[10px] uppercase tracking-[0.3em]">Awaiting Instruction Set...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gold-500 font-bold">[SYSTEM] Booting Policy Agent v1.4.2...</motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-white/60">[NETWORK] Handshake verified with Gateway...</motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="text-white/60">[RESEARCH] Target defined: Proclamation 2025</motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="text-white/60 flex items-center gap-2">
                    <Globe size={14} className="text-emerald-500" />
                    <span>[CRAWL] Navigating chilot.me/federal-registry...</span>
                  </motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="text-emerald-500 font-bold">[V-ID] MATCH FOUND: Proc_1321.pdf (0x82f...)</motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }} className="text-white/60">[PARSE] Extracting Article 12: Prerequisites...</motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }} className="text-white/60 flex items-center gap-3">
                    <Loader2 className="w-4 h-4 animate-spin text-gold-500" />
                    <span>[TRANSFORM] Synthesizing Playbook YAML...</span>
                  </motion.div>
                </div>
              )}
            </div>

            {isCrawlActive && (
              <motion.div 
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                className="p-10 bg-white/5 border-t border-white/5 backdrop-blur-sm relative z-10"
              >
                <div className="flex items-center justify-between text-[10px] font-black text-white/40 mb-4 uppercase tracking-[0.2em]">
                  <span>Autonomous Progress</span>
                  <span className="text-white">74.2%</span>
                </div>
                <Progress value={74.2} className="h-2 bg-black/40" />
              </motion.div>
            )}
            
            <div className="absolute inset-0 grain opacity-5 pointer-events-none" />
          </Card>
        </div>
      </div>
    </div>
  );
}
