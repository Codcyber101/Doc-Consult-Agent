'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Clock, 
  CheckCircle2, 
  FileText, 
  AlertCircle, 
  ShieldCheck, 
  Briefcase,
  HelpCircle,
  Play
} from 'lucide-react';
import { Navbar } from '@/components/domain/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const SERVICE_DATA: Record<string, any> = {
  'trade-license': {
    title: 'Trade License Renewal',
    description: 'Annual renewal of business operation permits for commercial entities. This process synchronizes your data with the National Trade Registry.',
    category: 'Business',
    estimatedTime: '2-3 Days',
    cost: '500 ETB',
    requirements: [
      { name: 'Resident ID / Passport', type: 'Primary Identification', icon: <FileText className="w-4 h-4" /> },
      { name: 'TIN Certificate', type: 'Tax Identification', icon: <FileText className="w-4 h-4" /> },
      { name: 'Previous License Scan', type: 'Record Verification', icon: <FileText className="w-4 h-4" /> },
      { name: 'Lease Agreement', type: 'Physical Presence', icon: <FileText className="w-4 h-4" /> }
    ],
    faqs: [
      { q: 'Can I renew if my lease has expired?', a: 'No, you must upload a valid or notarized extension of your lease agreement.' },
      { q: 'Is physical presence required?', a: 'This is a digital-first process. Physical presence is only required if biometrics are outdated.' }
    ]
  }
};

export default function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const service = SERVICE_DATA[id] || SERVICE_DATA['trade-license']; // Fallback for demo

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-emerald-100 selection:text-emerald-900 font-sans">
      <div className="fixed inset-0 bg-mesh-emerald pointer-events-none opacity-30" />
      <Navbar user={{ name: "Abebe Bikila" }} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <Link href="/services">
          <Button variant="ghost" className="mb-8 gap-2 text-slate-500 hover:text-slate-900">
            <ArrowLeft className="w-4 h-4" /> Back to Directory
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-7 space-y-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex items-center gap-2 mb-4">
                 <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest rounded-lg">
                   {service.category}
                 </span>
                 <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-4">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" /> Sovereign Verified
                 </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 tracking-tight">
                {service.title}
              </h1>
              <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                {service.description}
              </p>
            </motion.div>

            <Separator className="bg-slate-200" />

            {/* Checklist */}
            <section className="space-y-6">
               <h3 className="text-xl font-display font-bold text-slate-900">Required Archives</h3>
               <div className="grid gap-4">
                  {service.requirements.map((req: any, i: number) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center justify-between p-5 bg-white rounded-2xl border border-slate-100 shadow-sm group hover:border-emerald-500/30 transition-all"
                    >
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                             {req.icon}
                          </div>
                          <div>
                             <p className="text-sm font-bold text-slate-900">{req.name}</p>
                             <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">{req.type}</p>
                          </div>
                       </div>
                       <CheckCircle2 className="w-5 h-5 text-slate-100 group-hover:text-emerald-500 transition-colors" />
                    </motion.div>
                  ))}
               </div>
            </section>

            {/* FAQ */}
            <section className="space-y-6">
               <h3 className="text-xl font-display font-bold text-slate-900 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-emerald-600" /> FAQs
               </h3>
               <div className="space-y-4">
                  {service.faqs.map((faq: any, i: number) => (
                    <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                       <p className="text-sm font-bold text-slate-900 mb-2">{faq.q}</p>
                       <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
               </div>
            </section>
          </div>

          {/* Action Sidebar */}
          <div className="lg:col-span-5">
             <Card className="sticky top-24 border-2 border-emerald-600 shadow-sovereign overflow-hidden">
                <CardHeader className="bg-emerald-600 text-white p-8">
                   <div className="flex justify-between items-center mb-4">
                      <Briefcase className="w-8 h-8 opacity-50" />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-white/20 px-3 py-1 rounded-full">Official Flow</span>
                   </div>
                   <CardTitle className="text-2xl text-white">Ready to Start?</CardTitle>
                   <CardDescription className="text-emerald-100 font-medium opacity-90">
                      Our automated agents will assist you in mapping your documents to compliance standards.
                   </CardDescription>
                </CardHeader>
                <CardContent className="p-8 space-y-8 bg-white">
                   <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-1">
                         <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Est. Duration</p>
                         <div className="flex items-center gap-2 text-slate-900">
                            <Clock className="w-4 h-4 text-emerald-600" />
                            <span className="font-bold">{service.estimatedTime}</span>
                         </div>
                      </div>
                      <div className="space-y-1">
                         <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Processing Fee</p>
                         <div className="flex items-center gap-2 text-slate-900">
                            <span className="font-black text-lg">{service.cost}</span>
                         </div>
                      </div>
                   </div>

                   <div className="p-4 bg-emerald-50 rounded-xl flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                      <p className="text-xs text-emerald-800 leading-relaxed">
                         <strong>Data Privacy:</strong> This process uses end-to-end HSM encryption. Your documents are never stored in unmasked cleartext on cloud servers.
                      </p>
                   </div>

                   <Link href={`/flows/${id}`}>
                      <Button className="w-full h-16 rounded-2xl bg-slate-900 hover:bg-emerald-700 text-white text-lg font-bold gap-3 shadow-xl">
                         Initialize Wizard <Play className="w-5 h-5 text-gold-500 fill-gold-500" />
                      </Button>
                   </Link>

                   <div className="text-center">
                      <button className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-emerald-600 transition-colors">
                         Download Policy YAML (Developer Only)
                      </button>
                   </div>
                </CardContent>
                <div className="absolute inset-0 grain opacity-[0.03] pointer-events-none" />
             </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
