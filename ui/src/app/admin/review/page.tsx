'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  FileText, 
  Eye, 
  ArrowRight,
  MoreHorizontal,
  ChevronRight,
  History,
  MessageSquare,
  FileSearch
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/common/Badge';
import { cn } from '@/lib/utils';

const QUEUE_ITEMS = [
  {
    id: 'RE-9921',
    applicant: 'Abebe Bikila',
    service: 'Trade License Renewal',
    jurisdiction: 'Addis Ababa • Bole',
    submittedAt: '2 hours ago',
    agentConfidence: 94,
    status: 'Pending',
    flags: [],
    thumbnail: '/docs/trade-license.jpg'
  },
  {
    id: 'RE-9922',
    applicant: 'Makeda Isayas',
    service: 'Kebele ID Renewal',
    jurisdiction: 'Addis Ababa • Arada',
    submittedAt: '4 hours ago',
    agentConfidence: 62,
    status: 'Reviewing',
    flags: ['Low Contrast', 'Name Mismatch'],
    thumbnail: '/docs/id-card.jpg'
  },
  {
    id: 'RE-9923',
    applicant: 'Tewodros Kassahun',
    service: 'Vehicle Registration',
    jurisdiction: 'Addis Ababa • Yeka',
    submittedAt: '5 hours ago',
    agentConfidence: 88,
    status: 'Escalated',
    flags: ['Manual Verification Req'],
    thumbnail: '/docs/car-reg.jpg'
  }
];

export default function ReviewQueuePage() {
  const [selectedItem, setSelectedItem] = useState(QUEUE_ITEMS[1]);

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900 tracking-tight">
            Human-in-the-Loop <span className="text-primary italic">Review Queue</span>
          </h1>
          <p className="text-slate-500 font-medium mt-1">Audit submissions flagged by automated agents.</p>
        </div>
        
        <div className="flex gap-3">
           <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Find submission..." 
                className="h-11 pl-10 pr-4 bg-surface border border-border rounded-xl text-sm outline-none focus:border-primary shadow-sm w-64"
              />
           </div>
           <Button variant="outline" className="h-11 px-4 gap-2 border-border">
              <Filter className="w-4 h-4" /> Filter
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        {/* List Pane */}
        <div className="xl:col-span-4 space-y-4">
           <div className="flex items-center justify-between px-2 mb-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Queue: 12 Active</span>
              <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">Batch Process</button>
           </div>
           
           <div className="space-y-3">
              {QUEUE_ITEMS.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={cn(
                    "p-5 rounded-2xl border-2 transition-all cursor-pointer group relative overflow-hidden",
                    selectedItem.id === item.id 
                      ? "border-primary bg-surface shadow-lg" 
                      : "border-border bg-surface/50 hover:border-border shadow-sm"
                  )}
                >
                   <div className="flex items-start justify-between mb-3 relative z-10">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-lg bg-surface-muted flex items-center justify-center text-slate-400">
                            <FileText className="w-5 h-5" />
                         </div>
                         <div>
                            <p className="text-sm font-bold text-slate-900 leading-none">{item.applicant}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mt-1">{item.id}</p>
                         </div>
                      </div>
                      <div className={cn(
                        "text-[10px] font-black uppercase px-2 py-0.5 rounded-md",
                        item.status === 'Pending' ? "bg-surface-muted text-slate-600" : 
                        item.status === 'Reviewing' ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"
                      )}>
                        {item.status}
                      </div>
                   </div>
                   
                   <div className="space-y-2 relative z-10">
                      <p className="text-xs font-medium text-slate-600">{item.service}</p>
                      <div className="flex items-center justify-between text-[10px] font-bold uppercase">
                         <span className="text-slate-400">{item.jurisdiction}</span>
                         <span className={cn(
                           item.agentConfidence < 70 ? "text-red-500" : "text-primary"
                         )}>{item.agentConfidence}% Agent Score</span>
                      </div>
                   </div>
                   
                   {selectedItem.id === item.id && (
                     <div className="absolute inset-0 grain opacity-[0.03] pointer-events-none" />
                   )}
                </div>
              ))}
           </div>
        </div>

        {/* Audit Pane */}
        <div className="xl:col-span-8">
           <AnimatePresence mode="wait">
              <motion.div
                key={selectedItem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-surface rounded-[3rem] border border-border shadow-xl overflow-hidden flex flex-col h-[800px]"
              >
                 {/* Audit Header */}
                 <div className="p-8 border-b border-border bg-surface/50 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                       <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg">
                          <Users className="w-8 h-8" />
                       </div>
                       <div>
                          <h3 className="text-2xl font-display font-bold text-slate-900">{selectedItem.applicant}</h3>
                          <p className="text-sm font-medium text-slate-500">{selectedItem.service} • Submission {selectedItem.id}</p>
                       </div>
                    </div>
                    <div className="flex gap-2">
                       <Button variant="outline" size="icon" className="rounded-xl border-border">
                          <History className="w-4 h-4 text-slate-400" />
                       </Button>
                       <Button variant="outline" size="icon" className="rounded-xl border-border">
                          <MessageSquare className="w-4 h-4 text-slate-400" />
                       </Button>
                    </div>
                 </div>

                 {/* Audit Content */}
                 <div className="flex-1 flex overflow-hidden">
                    {/* Document Preview */}
                    <div className="flex-1 bg-slate-900 p-8 flex flex-col items-center justify-center relative group">
                       <div className="w-full h-full bg-slate-800 rounded-xl border border-white/10 flex items-center justify-center relative overflow-hidden shadow-2xl">
                          <FileSearch className="w-20 h-20 text-white/5" />
                          <p className="absolute bottom-6 text-[10px] font-black text-white/20 uppercase tracking-widest">Digital Archive Mirror</p>
                          
                          {/* Mock OCR Overlay */}
                          <div className="absolute top-20 left-20 p-2 bg-primary/20 border border-primary/50 rounded text-[10px] text-primary/80 font-mono">
                             NAME: {selectedItem.applicant.toUpperCase()}
                          </div>
                          <div className="absolute top-32 left-20 p-2 bg-red-500/20 border border-red-500/50 rounded text-[10px] text-red-400 font-mono">
                             JURISDICTION: BOLE_SUB_CITY
                          </div>
                       </div>
                       
                       <div className="absolute bottom-12 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="secondary" size="sm" className="rounded-full shadow-xl">
                             <Eye className="w-4 h-4 mr-2" /> Zoom Original
                          </Button>
                          <Button variant="outline" size="sm" className="rounded-full bg-white/10 text-white border-white/20 hover:bg-white/20">
                             <ShieldCheck className="w-4 h-4 mr-2" /> Verify HSM
                          </Button>
                       </div>
                    </div>

                    {/* Agent Analysis Sidebar */}
                    <div className="w-80 border-l border-border p-8 space-y-8 overflow-y-auto">
                       <div>
                          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Agent Assessment</h4>
                          <div className="space-y-4">
                             <div className="p-4 bg-surface rounded-2xl border border-border">
                                <div className="flex justify-between items-end mb-2">
                                   <span className="text-xs font-bold text-slate-900">Confidence</span>
                                   <span className={cn(
                                     "text-lg font-black",
                                     selectedItem.agentConfidence < 70 ? "text-red-600" : "text-primary"
                                   )}>{selectedItem.agentConfidence}%</span>
                                </div>
                                <div className="w-full h-1.5 bg-surface-muted rounded-full overflow-hidden">
                                   <div 
                                     className={cn(
                                       "h-full rounded-full transition-all duration-1000",
                                       selectedItem.agentConfidence < 70 ? "bg-red-500" : "bg-primary"
                                     )}
                                     style={{ width: `${selectedItem.agentConfidence}%` }}
                                   />
                                </div>
                             </div>
                          </div>
                       </div>

                       <div>
                          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Audit Flags</h4>
                          <div className="space-y-3">
                             {selectedItem.flags.length > 0 ? (
                                selectedItem.flags.map(flag => (
                                  <div key={flag} className="flex gap-3 p-3 bg-red-50 border border-red-100 rounded-xl">
                                     <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
                                     <span className="text-xs font-medium text-red-700">{flag}</span>
                                  </div>
                                ))
                             ) : (
                                <div className="flex gap-3 p-3 bg-primary/10 border border-primary/20 rounded-xl">
                                   <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                                   <span className="text-xs font-medium text-primary">Clear Policy Compliance</span>
                                </div>
                             )}
                          </div>
                       </div>

                       <div className="pt-8 border-t border-border">
                          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Final Decision</h4>
                          <div className="space-y-3">
                             <Button className="w-full bg-primary hover:bg-primary-dark text-white font-bold h-12 rounded-xl shadow-glow-primary">
                                Approve Transmission
                             </Button>
                             <Button variant="outline" className="w-full h-12 rounded-xl text-red-600 border-red-100 hover:bg-red-50">
                                Request Retake
                             </Button>
                             <Button variant="ghost" className="w-full h-12 rounded-xl text-slate-400 hover:text-slate-900">
                                Escalate to Director
                             </Button>
                          </div>
                       </div>
                    </div>
                 </div>
              </motion.div>
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
