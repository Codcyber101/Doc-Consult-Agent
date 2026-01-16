'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { TrackingTimeline } from '@/components/submission/TrackingTimeline';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { CheckCircle2, Download, Home, ArrowRight, ShieldCheck } from 'lucide-react';

export default function TradeLicenseSuccess() {
  return (
    <div className="space-y-12 max-w-4xl mx-auto py-8">
      
      {/* Success Hero */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-emerald-600 rounded-[3rem] p-12 text-white text-center relative overflow-hidden shadow-2xl shadow-emerald-600/20"
      >
        {/* Background Accent */}
        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
           <ShieldCheck size={240} />
        </div>

        <div className="relative z-10">
           <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center mx-auto mb-8 border border-white/20">
              <CheckCircle2 className="h-10 w-10 text-white" />
           </div>
           <h1 className="text-4xl font-bold font-display mb-4">Submission Successful</h1>
           <p className="text-emerald-50 max-w-md mx-auto text-lg">
             Your application for Trade License Renewal has been transmitted via the National Gateway.
           </p>
           
           <div className="mt-10 inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10">
              <span className="text-xs font-bold uppercase tracking-widest opacity-70">Transmission ID</span>
              <span className="font-mono text-sm font-bold">ET-TL-2026-B812</span>
           </div>
        </div>
      </motion.div>

      {/* Tracking Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8">
           <TrackingTimeline />
        </div>
        
        <div className="lg:col-span-4 space-y-6">
           <Card className="p-6">
              <h3 className="font-bold text-slate-900 mb-4">What's Next?</h3>
              <ul className="space-y-4 text-sm text-slate-600">
                 <li className="flex gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[10px] font-bold shrink-0">1</div>
                    Officer in Bole Sub-city will review your digital archive.
                 </li>
                 <li className="flex gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[10px] font-bold shrink-0">2</div>
                    You will receive a notification once the license is issued.
                 </li>
                 <li className="flex gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[10px] font-bold shrink-0">3</div>
                    Download your digital certificate directly from this portal.
                 </li>
              </ul>
           </Card>

           <div className="flex flex-col gap-3">
              <Button variant="outline" className="w-full justify-between h-14 rounded-2xl group">
                 Download Submission Receipt
                 <Download className="h-5 w-5 opacity-50 group-hover:translate-y-0.5 transition-transform" />
              </Button>
              <Link href="/">
                <Button variant="primary" className="w-full h-14 rounded-2xl">
                   Return to Dashboard
                </Button>
              </Link>
           </div>
        </div>
      </div>
    </div>
  );
}
