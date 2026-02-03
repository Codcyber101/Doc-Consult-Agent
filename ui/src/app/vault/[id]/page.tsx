'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Lock, 
  FileText, 
  Download, 
  Share2, 
  History, 
  Eye, 
  AlertCircle,
  Copy,
  CheckCircle2,
  Trash2,
  Database
} from 'lucide-react';
import { Navbar } from '@/components/domain/Navbar';
import { ProvenanceViewer } from '@/components/domain/ProvenanceViewer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const DOC_DATA: Record<string, any> = {
  'doc-1': {
    title: 'Kebele ID Card',
    id: 'ET-AD-99882',
    type: 'Residency Identification',
    status: 'Verified',
    issuedBy: 'Addis Ababa Civil Registry',
    issuedAt: '2025-06-12T10:00:00Z',
    extraction: [
      { field: 'Full Name', value: 'Abebe Bikila', confidence: 100 },
      { field: 'Date of Birth', value: '12 Sep 1985', confidence: 98 },
      { field: 'Woreda', value: 'Bole Woreda 03', confidence: 99 },
      { field: 'House No.', value: '122/A', confidence: 95 }
    ],
    history: [
      { agency: 'Trade Bureau', action: 'Accessed', date: '2026-01-10 09:30 AM' },
      { agency: 'Ministry of Revenue', action: 'Verified', date: '2025-12-15 02:45 PM' },
      { agency: 'Immigration', action: 'Shared', date: '2025-11-20 11:12 AM' }
    ],
    provenance: {
      issuer: 'ET-NAT-ID-AUTH-01',
      issuedAt: '2025-06-12T10:00:00Z',
      signature: '0x882fa1192ba00ff32ac2211ff3321...e912',
      payload: { idType: 'Residency', region: 'Addis Ababa', biometricStatus: 'Match' }
    }
  }
};

export default function DocumentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const doc = DOC_DATA[id] || DOC_DATA['doc-1'];
  const [isProvenanceOpen, setIsProvenanceOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface selection:bg-primary/10 selection:text-foreground font-sans">
      <div className="fixed inset-0 bg-mesh pointer-events-none opacity-30" />
      <Navbar user={{ name: "Abebe Bikila" }} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="flex items-center justify-between mb-8">
           <Link href="/vault">
             <Button variant="ghost" className="gap-2 text-slate-500 hover:text-slate-900">
               <ArrowLeft className="w-4 h-4" /> Back to Vault
             </Button>
           </Link>
           <div className="flex gap-3">
              <Button variant="outline" className="rounded-xl border-border">
                 <Share2 className="w-4 h-4 mr-2" /> Share
              </Button>
              <Button variant="outline" className="rounded-xl border-border text-red-600 hover:bg-red-50">
                 <Trash2 className="w-4 h-4 mr-2" /> Revoke
              </Button>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Document Preview Area */}
          <div className="lg:col-span-8 space-y-8">
             <Card className="overflow-hidden border-border shadow-xl relative aspect-[16/10] bg-slate-900 group">
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="flex flex-col items-center gap-4 text-white/20">
                      <FileText className="w-24 h-24" />
                      <p className="font-display font-bold text-2xl uppercase tracking-tighter">Digital Archive Preview</p>
                   </div>
                </div>
                
                {/* Simulated ID Overlay */}
                <div className="absolute inset-12 border-2 border-primary/20 rounded-2xl flex flex-col justify-end p-10 bg-gradient-to-t from-slate-950 to-transparent">
                   <div className="flex justify-between items-end">
                      <div>
                         <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">Authenticated Holder</p>
                         <h2 className="text-3xl font-display font-bold text-white tracking-tight">{doc.extraction[0].value}</h2>
                         <p className="text-sm text-slate-400 font-mono mt-2">{doc.id}</p>
                      </div>
                      <div className="w-24 h-24 bg-slate-800 rounded-xl border border-white/10 flex items-center justify-center">
                         <Database className="w-8 h-8 text-white/10" />
                      </div>
                   </div>
                </div>

                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                   <Button variant="secondary" className="rounded-full shadow-2xl">
                      <Eye className="w-4 h-4 mr-2" /> Full Screen
                   </Button>
                </div>
                <div className="absolute inset-0 grain opacity-5 pointer-events-none" />
             </Card>

             {/* Agent Extraction Results */}
             <section className="space-y-6">
                <div className="flex items-center justify-between">
                   <h3 className="text-xl font-display font-bold text-slate-900">Agent Intelligence</h3>
                   <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Validated Fields</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {doc.extraction.map((item: any, i: number) => (
                     <Card key={i} className="bg-surface border-border">
                        <CardContent className="p-5 flex justify-between items-center">
                           <div>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.field}</p>
                              <p className="text-sm font-bold text-slate-900">{item.value}</p>
                           </div>
                           <div className="text-right">
                              <p className="text-[10px] font-bold text-primary uppercase mb-1">{item.confidence}% Conf.</p>
                              <CheckCircle2 className="w-4 h-4 text-primary ml-auto" />
                           </div>
                        </CardContent>
                     </Card>
                   ))}
                </div>
             </section>
          </div>

          {/* Metadata & Provenance Sidebar */}
          <div className="lg:col-span-4 space-y-8">
             <Card className="bg-surface border-border overflow-hidden relative">
                <CardHeader className="bg-surface border-b border-border">
                   <CardTitle className="text-lg">Transmission Security</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                   <div className="space-y-4">
                      <div className="flex items-center gap-3 p-4 bg-primary/10 border border-primary/20 rounded-2xl">
                         <ShieldCheck className="w-6 h-6 text-primary" />
                         <div>
                            <p className="text-xs font-bold text-slate-900">Cryptographically Signed</p>
                            <p className="text-[10px] text-primary uppercase font-black">HSM National Root</p>
                         </div>
                      </div>
                      
                      <Button 
                        variant="sovereign" 
                        className="w-full h-12 rounded-xl text-xs gap-2"
                        onClick={() => setIsProvenanceOpen(true)}
                      >
                         <Lock className="w-4 h-4" /> View Digital Provenance
                      </Button>
                   </div>

                   <Separator className="bg-surface-muted" />

                   <div className="space-y-4">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Sharing History</h4>
                      <div className="space-y-4">
                         {doc.history.map((log: any, i: number) => (
                           <div key={i} className="flex gap-4">
                              <div className="w-1 h-10 bg-surface-muted rounded-full shrink-0" />
                              <div>
                                 <p className="text-xs font-bold text-slate-900">{log.agency}</p>
                                 <p className="text-[10px] text-slate-500 uppercase">{log.action} • {log.date}</p>
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>

                   <Button variant="outline" className="w-full h-14 rounded-2xl border-border gap-2 font-bold text-slate-600">
                      <Download className="w-5 h-5 text-primary" /> Download Encrypted Archive
                   </Button>
                </CardContent>
                <div className="absolute inset-0 grain opacity-[0.02] pointer-events-none" />
             </Card>

             <div className="p-6 bg-slate-900 rounded-[2rem] text-white space-y-4 relative overflow-hidden">
                <div className="relative z-10">
                   <div className="flex items-center gap-3 mb-4">
                      <AlertCircle className="w-5 h-5 text-gold-500" />
                      <h4 className="font-bold text-sm">Citizen Rights</h4>
                   </div>
                   <p className="text-xs text-slate-400 leading-relaxed">
                      You have the right to revoke access to this document at any time. Revocation will invalidate all active sharing links across government nodes.
                   </p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
             </div>
          </div>
        </div>
      </main>

      <ProvenanceViewer 
        isOpen={isProvenanceOpen}
        onClose={() => setIsProvenanceOpen(false)}
        data={doc.provenance}
      />
    </div>
  );
}
