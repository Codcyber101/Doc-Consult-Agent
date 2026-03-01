'use client';

import React from 'react';
import { 
  Search, 
  Download, 
  Lock, 
  Server, 
  Globe,
  Key,
  Cpu
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { apiClient } from "@/lib/api/client";
import { AuditTable } from '@/components/admin/AuditTable';

export default function AuditLogPage() {
  const [remoteLogs, setRemoteLogs] = React.useState<any[] | null>(null);
  const [remoteError, setRemoteError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const resp = await apiClient.get("/audit/events?limit=50&offset=0");
        if (!mounted) return;
        setRemoteLogs(resp.data?.items || []);
      } catch (e: any) {
        if (!mounted) return;
        setRemoteError(e?.message || "Failed to load audit events");
      }
    };
    void load();
    return () => {
      mounted = false;
    };
  }, []);

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
            {remoteError && (
              <div className="p-4 text-sm text-amber-700 bg-amber-50 border-b border-amber-100">
                {remoteError} (showing demo data placeholder)
              </div>
            )}
            
            <AuditTable logs={remoteLogs || []} />
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
