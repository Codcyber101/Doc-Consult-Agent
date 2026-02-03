'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Settings, 
  Plus, 
  Search, 
  ChevronRight, 
  Globe, 
  Lock, 
  Clock, 
  History,
  CheckCircle2,
  AlertCircle,
  Database,
  Terminal,
  Save,
  Play
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/common/Badge';
import { cn } from '@/lib/utils';

const POLICIES = [
  {
    id: 'POL-TL-01',
    name: 'Trade License Renewal Standard',
    version: '2.4.0',
    jurisdiction: 'Addis Ababa (Global)',
    updatedAt: '2025-12-10',
    status: 'Active',
    yaml: `requirements:
  - id: id_scan
    type: DOCUMENT
    label: Resident ID
    mandatory: true
  - id: tin_cert
    type: DOCUMENT
    label: TIN Certificate
    mandatory: true
  - id: business_name
    type: FIELD
    label: Registered Name`
  },
  {
    id: 'POL-ID-02',
    name: 'Kebele ID Biometric Standard',
    version: '1.1.2',
    jurisdiction: 'National',
    updatedAt: '2026-01-05',
    status: 'Active',
    yaml: `requirements:
  - id: facial_scan
    type: BIOMETRIC
    label: Live Photo
    mandatory: true`
  }
];

export default function PolicyRegistryPage() {
  const [selectedPolicy, setSelectedItem] = useState(POLICIES[0]);

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900 tracking-tight">
            Policy <span className="text-primary italic">Registry Canvas</span>
          </h1>
          <p className="text-slate-500 font-medium mt-1">Manage sovereign requirement YAMLs and agent logic mapping.</p>
        </div>
        
        <Button className="bg-slate-900 text-white gap-2 h-12 px-6 rounded-xl shadow-lg">
           <Plus className="w-5 h-5" /> New Policy Asset
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        {/* Registry Explorer */}
        <div className="xl:col-span-4 space-y-6">
           <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search registry..." 
                className="w-full h-11 pl-10 pr-4 bg-surface border border-border rounded-xl text-sm outline-none focus:border-primary shadow-sm"
              />
           </div>

           <div className="space-y-3">
              {POLICIES.map((policy) => (
                <div 
                  key={policy.id}
                  onClick={() => setSelectedItem(policy)}
                  className={cn(
                    "p-5 rounded-2xl border-2 transition-all cursor-pointer group",
                    selectedPolicy.id === policy.id 
                      ? "border-primary bg-surface shadow-md" 
                      : "border-border bg-surface/50 hover:border-border"
                  )}
                >
                   <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                            <FileText className="w-5 h-5" />
                         </div>
                         <p className="text-xs font-bold text-slate-900 leading-tight line-clamp-1">{policy.name}</p>
                      </div>
                      <span className="text-[9px] font-black uppercase text-slate-400">v{policy.version}</span>
                   </div>
                   <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      <span>{policy.jurisdiction}</span>
                      <span className="text-primary">{policy.status}</span>
                   </div>
                </div>
              ))}
           </div>

           {/* Git-like status */}
           <Card className="bg-slate-900 border-none overflow-hidden relative">
              <CardContent className="p-6">
                 <div className="flex items-center gap-3 mb-4">
                    <Database className="w-4 h-4 text-primary/80" />
                    <span className="text-xs font-bold text-white uppercase tracking-widest">Git Integration</span>
                 </div>
                 <p className="text-[10px] text-slate-400 uppercase leading-relaxed mb-4">
                    Last sync: 12 mins ago <br/>
                    <span className="text-white">Main branch is 2 commits ahead</span>
                 </p>
                 <Button variant="secondary" className="w-full h-9 rounded-lg text-[9px] uppercase font-black tracking-[0.2em]">
                    Sync with National Repo
                 </Button>
              </CardContent>
              <div className="absolute inset-0 grain opacity-5 pointer-events-none" />
           </Card>
        </div>

        {/* Policy Editor */}
        <div className="xl:col-span-8">
           <AnimatePresence mode="wait">
              <motion.div
                key={selectedPolicy.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-surface rounded-[3rem] border border-border shadow-xl overflow-hidden flex flex-col h-[700px]"
              >
                 {/* Toolbar */}
                 <div className="p-6 border-b border-border bg-surface/50 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                       <Terminal className="w-5 h-5 text-primary" />
                       <span className="font-mono text-sm font-bold text-slate-900">{selectedPolicy.id}.yaml</span>
                    </div>
                    <div className="flex gap-2">
                       <Button variant="outline" size="sm" className="rounded-xl border-border text-xs font-bold gap-2">
                          <History className="w-4 h-4" /> Diff
                       </Button>
                       <Button variant="outline" size="sm" className="rounded-xl border-border text-xs font-bold gap-2">
                          <Play className="w-4 h-4" /> Test
                       </Button>
                       <Button size="sm" className="bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold gap-2 shadow-glow-primary px-6">
                          <Save className="w-4 h-4" /> Save
                       </Button>
                    </div>
                 </div>

                 {/* Editor Content */}
                 <div className="flex-1 flex bg-slate-900">
                    <div className="w-12 bg-slate-800 flex flex-col items-center py-4 text-slate-600 font-mono text-xs select-none border-r border-white/5">
                       {Array.from({length: 20}).map((_, i) => <div key={i} className="h-6 flex items-center">{i + 1}</div>)}
                    </div>
                    <div className="flex-1 p-6 font-mono text-sm text-primary/80 leading-6 overflow-y-auto">
                       <pre className="whitespace-pre-wrap">
                          {selectedPolicy.yaml}
                       </pre>
                       <motion.div 
                         animate={{ opacity: [0.2, 1, 0.2] }}
                         transition={{ repeat: Infinity, duration: 1.5 }}
                         className="w-2 h-5 bg-primary inline-block align-middle ml-1"
                       />
                    </div>
                 </div>

                 {/* Footer metadata */}
                 <div className="p-6 border-t border-border bg-surface flex items-center justify-between">
                    <div className="flex gap-6">
                       <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-slate-400" />
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{selectedPolicy.jurisdiction}</span>
                       </div>
                       <div className="flex items-center gap-2">
                          <Lock className="w-4 h-4 text-slate-400" />
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">HSM Sealed</span>
                       </div>
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Last change by: T. Cyber • {selectedPolicy.updatedAt}</p>
                 </div>
              </motion.div>
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
