'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { WizardProgress } from '@/components/common/WizardProgress';
import { ProcessTimeline, Step } from '@/components/common/ProcessTimeline';
import { DocumentCard } from '@/components/document/DocumentCard';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { FileText, ShieldCheck, AlertCircle, ArrowRight, ChevronLeft } from 'lucide-react';
import { ReadinessScore } from '@/components/analysis/ReadinessScore';

export default function TradeLicenseStep2() {
  const router = useRouter();

  const steps: Step[] = [
    { id: '1', title: 'Jurisdiction', status: 'completed' },
    { id: '2', title: 'Document Analysis', status: 'current', description: 'OCR & Policy Mapping' },
    { id: '3', title: 'Compliance Review', status: 'upcoming' },
    { id: '4', title: 'Final Submission', status: 'upcoming' },
  ];

  return (
    <div className="space-y-8">
      <WizardProgress 
        currentStep={2} 
        totalSteps={4} 
        stepName="Document Analysis" 
        className="-mx-6 sm:-mx-8 lg:-mx-10 -mt-6 sm:-mt-8 lg:-mt-10 mb-10"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Progress Sidebar (Hidden on mobile) */}
        <div className="hidden lg:block lg:col-span-3">
          <Card className="p-6 sticky top-24">
             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Your Progress</h3>
             <ProcessTimeline steps={steps} />
          </Card>
        </div>

        {/* Right: Main Analysis Area */}
        <div className="lg:col-span-9 space-y-8">
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-emerald-900 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden"
          >
             {/* Decorative Background */}
             <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <ShieldCheck size={160} />
             </div>

             <div className="relative z-10">
                <Badge variant="warning" className="mb-3 bg-gold-500 text-slate-900 border-none">Analysis in Progress</Badge>
                <h2 className="text-2xl font-bold font-display">Sovereign Document Intelligence</h2>
                <p className="text-emerald-100/70 text-sm max-w-md mt-1">
                  Our agents are currently extracting data and verifying it against national policies.
                </p>
             </div>
             
             <div className="relative z-10">
                <ReadinessScore score={82} />
             </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DocumentCard 
              title="Current Trade License"
              status="valid"
              readinessScore={94}
              onView={() => {}}
              onReplace={() => {}}
            />
            <DocumentCard 
              title="TIN Certificate"
              status="invalid"
              errorMessage="Date of issuance is blurry. Please re-upload for 100% confidence."
              onReplace={() => {}}
            />
            <DocumentCard 
              title="Lease Agreement"
              status="pending"
              onReplace={() => {}}
            />
            <DocumentCard 
              title="Woreda ID"
              status="missing"
              onReplace={() => {}}
            />
          </div>

          <Card className="p-6 border-l-4 border-gold-500 bg-gold-50/30">
            <div className="flex gap-4">
              <AlertCircle className="h-6 w-6 text-gold-600 shrink-0" />
              <div>
                <h4 className="font-bold text-slate-900">Optimization Tip</h4>
                <p className="text-sm text-slate-600 mt-1">
                  High-contrast scans improve analysis speed. Ensure all four corners of the document are visible.
                </p>
              </div>
            </div>
          </Card>

          <div className="pt-8 flex items-center justify-between border-t border-slate-100">
             <Button variant="ghost" onClick={() => router.back()} leftIcon={<ChevronLeft className="h-4 w-4" />}>
               Back
             </Button>
             <Button 
               variant="primary" 
               size="lg" 
               onClick={() => router.push('/flows/trade-license/step-3')}
               rightIcon={<ArrowRight className="h-4 w-4" />}
             >
               Review Compliance
             </Button>
          </div>

        </div>
      </div>
    </div>
  );
}
