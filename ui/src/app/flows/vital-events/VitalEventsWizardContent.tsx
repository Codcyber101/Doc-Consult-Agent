'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Baby, 
  UserX, 
  Users, 
  FileText, 
  CheckCircle2, 
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  Link as LinkIcon
} from 'lucide-react';

import { WizardShell } from '@/components/domain/WizardShell';
import { DocumentUploadWidget } from '@/components/domain/DocumentUploadWidget';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/common/Input';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const STEPS = [
  { title: 'Event Type', description: 'Select the nature of registry' },
  { title: 'Data Entry', description: 'Details of the vital event' },
  { title: 'Relationship', description: 'Family and witness linkage' },
  { title: 'Transmission', description: 'Final registry sync' }
];

export default function VitalEventsWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [eventType, setEventType] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const EVENT_TYPES = [
    { id: 'birth', label: 'Birth Registration', icon: <Baby />, desc: 'Register a newborn citizen' },
    { id: 'marriage', label: 'Marriage Certificate', icon: <Heart />, desc: 'Legalize civil partnership' },
    { id: 'death', label: 'Death Registration', icon: <UserX />, desc: 'Official record of passing' }
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="bg-slate-900 rounded-[3rem] p-12 text-white text-center shadow-sovereign max-w-2xl w-full">
           <CheckCircle2 className="w-20 h-20 text-primary/80 mx-auto mb-8" />
           <h1 className="text-4xl font-display font-bold mb-4">Registry Synced</h1>
           <p className="text-slate-200/80 text-lg mb-10 leading-relaxed">
             The vital event archive has been successfully recorded in the National Civil Registry.
           </p>
           <Button variant="secondary" className="px-10 h-14 rounded-2xl font-bold">Download Certificate</Button>
        </div>
      </div>
    );
  }

  return (
    <WizardShell
      currentStep={currentStep}
      totalSteps={STEPS.length}
      title={STEPS[currentStep - 1].title}
      description={STEPS[currentStep - 1].description}
      onBack={currentStep > 1 ? prevStep : undefined}
      onNext={currentStep === STEPS.length ? () => setIsSubmitted(true) : nextStep}
      nextDisabled={currentStep === 1 && !eventType}
    >
      {/* Step 1: Event Type */}
      {currentStep === 1 && (
        <div className="grid gap-4">
           {EVENT_TYPES.map((type) => (
             <button
               key={type.id}
               onClick={() => setEventType(type.id)}
               className={cn(
                 "p-6 rounded-[2rem] border-2 text-left transition-all flex items-center gap-6 group",
                 eventType === type.id 
                   ? "border-primary bg-primary/10 shadow-md" 
                   : "border-border bg-surface hover:border-border"
               )}
             >
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center transition-colors",
                  eventType === type.id ? "bg-primary text-white" : "bg-surface-muted text-slate-400"
                )}>
                   {React.cloneElement(type.icon as any, { className: 'w-7 h-7' })}
                </div>
                <div className="flex-1">
                   <h4 className="text-lg font-bold text-slate-900">{type.label}</h4>
                   <p className="text-sm text-slate-500">{type.desc}</p>
                </div>
                <ChevronRight className={cn(
                  "w-5 h-5 transition-transform",
                  eventType === type.id ? "text-primary translate-x-1" : "text-slate-300"
                )} />
             </button>
           ))}
        </div>
      )}

      {/* Step 2: Data Entry */}
      {currentStep === 2 && (
        <div className="space-y-6">
           <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-primary" />
              <h4 className="font-bold text-slate-900 capitalize">{eventType} Details</h4>
           </div>
           <Input label="Primary Person Full Name" placeholder="e.g. Abebe Bikila" />
           <div className="grid grid-cols-2 gap-4">
              <Input label="Event Date" type="date" />
              <Input label="Event Location" placeholder="e.g. Black Lion Hospital" />
           </div>
           <Input label="TIN / National ID (Optional)" placeholder="For cross-registry linkage" />
        </div>
      )}

      {/* Step 3: Relationship */}
      {currentStep === 3 && (
        <div className="space-y-8">
           <div className="bg-surface-muted p-6 rounded-3xl border border-border space-y-6">
              <div className="flex items-center gap-3">
                 <LinkIcon className="w-5 h-5 text-primary" />
                 <h4 className="font-bold text-slate-900">National ID Linkage</h4>
              </div>
              <div className="space-y-4">
                 <Input label="Father's National ID" placeholder="ET-ID-XXXXX" />
                 <Input label="Mother's National ID" placeholder="ET-ID-XXXXX" />
              </div>
           </div>

           <div className="space-y-4">
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 px-2">Official Witnesses</h4>
              <div className="grid gap-3">
                 {[1, 2].map(i => (
                   <div key={i} className="flex gap-3">
                      <Input label={`Witness #${i} Full Name`} placeholder="Name" className="flex-[2]" />
                      <Input label="Witness ID" placeholder="ID Number" className="flex-1" />
                   </div>
                 ))}
              </div>
           </div>
        </div>
      )}

      {/* Step 4: Transmission */}
      {currentStep === 4 && (
        <div className="space-y-8 text-center py-6">
           <div className="w-20 h-20 bg-primary/10 text-primary rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
              <ShieldCheck className="w-10 h-10" />
           </div>
           <h3 className="text-2xl font-display font-bold text-slate-900">Sovereign Verification</h3>
           <p className="text-slate-500 max-w-sm mx-auto leading-relaxed">
              Our agents are now cross-referencing these details with the <strong>National Health & Civil Registry</strong> clusters.
           </p>
           
           <div className="p-6 bg-slate-900 rounded-[2rem] text-left relative overflow-hidden">
              <div className="relative z-10 space-y-4">
                 <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-primary/80">
                    <span>Registry Handshake</span>
                    <span>94% Success</span>
                 </div>
                 <Progress value={94} className="h-2 bg-slate-800" />
                 <p className="text-[10px] text-slate-400 font-medium">Transmitting encrypted block to Addis Ababa civil node...</p>
              </div>
              <div className="absolute inset-0 grain opacity-5 pointer-events-none" />
           </div>
        </div>
      )}
    </WizardShell>
  );
}
