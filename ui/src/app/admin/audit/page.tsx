'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Search, 
  Download, 
  ExternalLink, 
  Lock, 
  Server, 
  Hash, 
  CheckCircle2, 
  AlertTriangle,
  Fingerprint,
  Cpu,
  Key,
  Globe
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const AUDIT_LOGS = [
  {
    id: 'TX-88219',
    event: 'HSM Signature Generated',
    entity: 'MESOB-GW-01',
    hash: '0x82fa1192...8821',
    timestamp: '2026-01-20 10:24:12',
    status: 'Success'
  },
  {
    id: 'TX-88218',
    event: 'Policy Handshake (Addis Ababa)',
    entity: 'REG-NODE-BOLE',
    hash: '0x1192ba00...4412',
    timestamp: '2026-01-20 10:22:05',
    status: 'Success'
  },
  {
    id: 'TX-88217',
    event: 'PII Scrubbing Event',
    entity: 'AGENT-DOC-02',
    hash: '0xac2211ff...3321',
    timestamp: '2026-01-20 10:15:44',
    status: 'Success'
  },
  {
    id: 'TX-88216',
    event: 'Transmission Rejected',
    entity: 'NAT-GATEWAY-X',
    hash: '0xdd229981...0012',
    timestamp: '2026-01-20 09:55:12',
    status: 'Warning'
  }
];

export default function AuditLogPage() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900 tracking-tight">
            Sovereign <span className="text-primary italic">Audit Ledger</span>
          </h1>
          <p className="text-slate-500 font-medium mt-1">Immutable trace of all national gateway events and cryptographic handshakes.</p>
        </div>
        
        <Button variant="outline" className="h-12 border-border gap-2 font-bold rounded-xl px-6">
           <Download className="w-4 h-4" /> Export Signed Log
        </Button>
      </div>

      {/* Network Health */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
           { label: 'HSM Clusters', value: '04 Active', icon: <Key /> },
           { label: 'Registry Nodes', value: '12 Active', icon: <Server /> },
           { label: 'National Gateway', value: 'Stable', icon: <Globe /> },
         ].map((node, i) => (
           <Card key={i} className="bg-surface/50 border-border shadow-sm overflow-hidden relative">
              <CardContent className="p-6 flex items-center gap-4">
                 <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center text-primary shadow-sm border border-border">
                    {node.icon}
                 </div>
                 <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{node.label}</p>
                    <p className="text-lg font-bold text-slate-900">{node.value}</p>
                 </div>
              </CardContent>
              <div className="absolute inset-0 grain opacity-[0.03] pointer-events-none" />
           </Card>
         ))}
      </div>

      {/* Main Ledger */}
      <Card className="rounded-[2.5rem] border-border shadow-xl overflow-hidden relative">
         <CardHeader className="bg-surface/50 border-b border-border p-8 flex flex-row items-center justify-between">
            <div>
               <CardTitle className="text-xl">Transmission History</CardTitle>
               <p className="text-xs text-slate-400 font-medium uppercase tracking-widest mt-1">Real-time Block Ledger</p>
            </div>
            <div className="relative">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
               <input 
                 type="text" 
                 placeholder="Search TX ID or Hash..." 
                 className="h-10 pl-10 pr-4 bg-surface border border-border rounded-lg text-xs outline-none focus:border-primary w-64"
               />
            </div>
         </CardHeader>
         <CardContent className="p-0">
            <div className="overflow-x-auto">
               <table className="w-full">
                  <thead>
                     <tr className="bg-surface text-left border-b border-border">
                        <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Transaction ID</th>
                        <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Event Nature</th>
                        <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Entity Source</th>
                        <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Digital Hash</th>
                        <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Timestamp</th>
                        <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Verification</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                     {AUDIT_LOGS.map((log) => (
                        <tr key={log.id} className="hover:bg-surface/50 transition-colors group">
                           <td className="px-8 py-6 font-mono text-xs font-bold text-slate-900">{log.id}</td>
                           <td className="px-8 py-6">
                              <div className="flex items-center gap-2">
                                 <div className={cn(
                                   "w-2 h-2 rounded-full",
                                   log.status === 'Success' ? "bg-primary" : "bg-amber-500"
                                 )} />
                                 <span className="text-xs font-bold text-slate-700">{log.event}</span>
                              </div>
                           </td>
                           <td className="px-8 py-6">
                              <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                                 <Cpu className="w-3 h-3" /> {log.entity}
                              </div>
                           </td>
                           <td className="px-8 py-6">
                              <div className="flex items-center gap-2 font-mono text-[10px] text-slate-400 bg-surface-muted/50 px-2 py-1 rounded w-fit">
                                 {log.hash} <Fingerprint className="w-3 h-3 opacity-50" />
                              </div>
                           </td>
                           <td className="px-8 py-6 text-xs font-medium text-slate-500">{log.timestamp}</td>
                           <td className="px-8 py-6 text-right">
                              <Button variant="ghost" size="icon" className="text-slate-300 hover:text-primary">
                                 <ExternalLink className="w-4 h-4" />
                              </Button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </CardContent>
         <div className="absolute inset-0 grain opacity-[0.02] pointer-events-none" />
      </Card>

      {/* Security Context */}
      <div className="p-8 bg-slate-900 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-8 text-white">
         <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10 shrink-0 shadow-xl">
            <Lock className="w-8 h-8 text-gold-500" />
         </div>
         <div>
            <h4 className="text-xl font-display font-bold mb-1">National Trust Anchor</h4>
            <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
               This ledger is anchored to the Ethiopian National Trust Chain. 
               All entry hashes are mirrored across distributed government registry nodes to prevent unauthorized tampering.
            </p>
         </div>
         <Button variant="secondary" className="ml-auto font-black text-[10px] uppercase tracking-[0.2em] px-8 h-12 rounded-xl">
            Verify Integrity
         </Button>
      </div>
    </div>
  );
}
