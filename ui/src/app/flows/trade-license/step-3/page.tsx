'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { WizardProgress } from '@/components/common/WizardProgress';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { ConsentModal } from '@/components/submission/ConsentModal';
import { ShieldCheck, FileText, CheckCircle2, ChevronLeft, Send } from 'lucide-react';

export default function TradeLicenseStep3() {
  const router = useRouter();
  const [isConsentOpen, setIsConsentOpen] = useState(false);

  const handleConfirm = () => {
    setIsConsentOpen(false);
    // Simulate submission
    router.push('/flows/trade-license/success');
  };

  const summaries = [
    { label: 'Business Type', value: 'General Trade' },
    { label: 'Jurisdiction', value: 'Addis Ababa, Bole' },
    { label: 'TIN Number', value: '0012345678' },
    { label: 'Document Status', value: '3/3 Verified', status: 'success' },
  ];

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <WizardProgress 
        currentStep={3} 
        totalSteps={4} 
        stepName="Review & Submit" 
        className="-mx-6 sm:-mx-8 lg:-mx-10 -mt-6 sm:-mt-8 lg:-mt-10 mb-10"
      />

      <div className="text-center space-y-4 mb-12">
         <motion.div 
           initial={{ scale: 0.5, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6"
         >
            <ShieldCheck className="h-10 w-10" />
         </motion.div>
         <h1 className="text-3xl font-bold text-slate-900 font-display">Ready for Submission</h1>
         <p className="text-slate-500 max-w-md mx-auto">
           All documents have been validated against the national policy database. Review your details below.
         </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {summaries.map((item, i) => (
           <Card key={i} className="p-6">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
              <div className="flex items-center justify-between">
                 <p className="text-lg font-bold text-slate-900">{item.value}</p>
                 {item.status === 'success' && <CheckCircle2 className="h-5 w-5 text-emerald-500" />}
              </div>
           </Card>
         ))}
      </div>

      <Card className="p-0 overflow-hidden border-2 border-emerald-600/20">
         <div className="bg-emerald-50 p-4 border-b border-emerald-100 flex items-center gap-2">
            <FileText className="h-4 w-4 text-emerald-600" />
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Audit Log Hash</span>
         </div>
         <div className="p-6 font-mono text-[10px] text-slate-400 break-all">
            0x71c942a7d7124d1d6c8b9c8c9e8f1a1d1c1b1a1d1c1b1a1d1c1b1a1d1c1b1a
         </div>
      </Card>

      <div className="pt-12 flex items-center justify-between">
         <Button variant="ghost" onClick={() => router.back()} leftIcon={<ChevronLeft className="h-4 w-4" />}>
           Back
         </Button>
         <Button 
           variant="primary" 
           size="lg" 
           onClick={() => setIsConsentOpen(true)}
           rightIcon={<Send className="h-4 w-4" />}
           className="px-12 shadow-xl shadow-emerald-600/20"
         >
           Authorize Submission
         </Button>
      </div>

      <ConsentModal 
        isOpen={isConsentOpen} 
        onClose={() => setIsConsentOpen(false)} 
        onConfirm={handleConfirm}
      />
    </div>
  );
}
