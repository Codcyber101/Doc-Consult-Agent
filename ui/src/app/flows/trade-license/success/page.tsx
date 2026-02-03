'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2, Download, ShieldCheck, ArrowRight, Clock, FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export default function TradeLicenseSuccess() {
  return (
    <div className="space-y-12 max-w-5xl mx-auto py-8 font-sans">
      
      {/* Success Hero */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-900 rounded-[3rem] p-12 text-white text-center relative overflow-hidden shadow-sovereign"
      >
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
           <ShieldCheck size={300} />
        </div>

        <div className="relative z-10">
           <motion.div 
             initial={{ scale: 0 }}
             animate={{ scale: 1 }}
             transition={{ type: 'spring', delay: 0.2 }}
             className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-glow-primary"
           >
              <CheckCircle2 className="h-10 w-10 text-white" />
           </motion.div>
           <h1 className="text-4xl font-display font-bold mb-4 tracking-tight">Archive Authenticated</h1>
           <p className="text-slate-200/80 max-w-md mx-auto text-lg mb-10 leading-relaxed">
             Your submission has been verified and safely transmitted to the National Gateway.
           </p>
           
           <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Transmission ID</span>
              <span className="font-mono text-sm font-bold text-gold-500">ET-MESOB-2026-X99</span>
           </div>
        </div>
        <div className="absolute inset-0 grain opacity-5 pointer-events-none" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Progress Timeline */}
        <div className="lg:col-span-8 space-y-6">
           <Card>
              <CardHeader>
                 <CardTitle className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary" />
                    Transmission Timeline
                 </CardTitle>
              </CardHeader>
              <CardContent>
                 <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-border">
                    {[
                       { label: 'Application Submitted', date: 'Today, 10:24 AM', status: 'completed' },
                       { label: 'Gateway Handshake', date: 'Today, 10:25 AM', status: 'completed' },
                       { label: 'Sub-city Office Review', date: 'Estimated: 24-48h', status: 'pending' },
                       { label: 'License Issuance', date: 'Pending review', status: 'pending' },
                    ].map((step, i) => (
                       <div key={i} className="flex gap-6 relative z-10">
                          <div className={cn(
                             "w-6 h-6 rounded-full border-4 border-white shadow-sm shrink-0",
                             step.status === 'completed' ? "bg-primary" : "bg-surface-muted"
                          )} />
                          <div>
                             <p className={cn(
                                "text-sm font-bold leading-none mb-1",
                                step.status === 'completed' ? "text-slate-900" : "text-slate-400"
                             )}>{step.label}</p>
                             <p className="text-xs text-slate-500 font-medium">{step.date}</p>
                          </div>
                       </div>
                    ))}
                 </div>
              </CardContent>
           </Card>
        </div>
        
        {/* Actions */}
        <div className="lg:col-span-4 space-y-6">
           <Card className="bg-surface-muted border-border">
              <CardHeader>
                 <CardTitle className="text-sm uppercase tracking-widest text-slate-500">Next Steps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="flex gap-3 text-sm">
                    <FileCheck className="w-5 h-5 text-primary shrink-0" />
                    <p className="text-slate-600 leading-snug">Officer review in <strong>Bole Sub-city</strong>.</p>
                 </div>
                 <div className="flex gap-3 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <p className="text-slate-600 leading-snug">Digital license issued to your vault.</p>
                 </div>
              </CardContent>
           </Card>

           <div className="flex flex-col gap-3">
              <Button variant="outline" className="w-full justify-between h-14 rounded-2xl group border-border">
                 Download Receipt
                 <Download className="h-5 w-5 opacity-50 group-hover:translate-y-0.5 transition-transform text-primary" />
              </Button>
              <Link href="/">
                <Button className="w-full h-14 rounded-2xl bg-slate-900 hover:bg-primary text-white shadow-xl">
                   Exit Portal
                </Button>
              </Link>
           </div>
        </div>
      </div>
    </div>
  );
}
