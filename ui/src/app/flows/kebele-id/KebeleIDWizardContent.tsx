'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Camera, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle,
  FileCheck,
  Scan,
  RefreshCw,
  Info
} from 'lucide-react';

import { WizardShell } from '@/components/domain/WizardShell';
import { DocumentUploadWidget } from '@/components/domain/DocumentUploadWidget';
import { ReadinessPanel } from '@/components/domain/ReadinessPanel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/common/Input';
import { Separator } from '@/components/ui/separator';

const STEPS = [
  { title: 'Identity', description: 'Basic personal information' },
  { title: 'Biometrics', description: 'Facial recognition capture' },
  { title: 'Residency', description: 'Address and Woreda mapping' },
  { title: 'Review', description: 'National Registry validation' }
];

export default function KebeleIDWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleCapture = () => {
    setIsCapturing(true);
    setTimeout(() => {
      setIsCapturing(false);
      setCapturedPhoto('https://api.dicebear.com/7.x/avataaars/svg?seed=Abebe');
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="bg-slate-900 rounded-[3rem] p-12 text-white text-center shadow-sovereign max-w-2xl w-full relative overflow-hidden">
           <div className="relative z-10">
              <CheckCircle2 className="w-20 h-20 text-primary/80 mx-auto mb-8" />
              <h1 className="text-4xl font-display font-bold mb-4">Renewal Initialized</h1>
              <p className="text-slate-200/80 text-lg mb-10">
                Your Kebele ID data has been matched with the National Biometric Database.
              </p>
              <Button variant="secondary" className="px-10 h-14 rounded-2xl font-bold">Track Transmission</Button>
           </div>
           <div className="absolute inset-0 grain opacity-10" />
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
    >
      {/* Step 1: Identity */}
      {currentStep === 1 && (
        <div className="space-y-6">
           <Input label="Full Name (as on physical ID)" placeholder="e.g. Abebe Bikila" leftIcon={<User className="w-4 h-4" />} />
           <Input label="Old Kebele ID Number" placeholder="e.g. AA-09-122-01" />
           <div className="grid grid-cols-2 gap-4">
              <Input label="Date of Birth" type="date" />
              <Input label="Gender" placeholder="Select..." />
           </div>
        </div>
      )}

      {/* Step 2: Biometrics */}
      {currentStep === 2 && (
        <div className="space-y-8">
           <div className="relative aspect-square max-w-[300px] mx-auto bg-slate-900 rounded-full border-4 border-border overflow-hidden group">
              {capturedPhoto ? (
                <Image src={capturedPhoto} alt="Captured" fill sizes="300px" className="object-cover" />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white/20">
                   <Scan className="w-16 h-16 mb-4 animate-pulse" />
                   <p className="text-[10px] font-black uppercase tracking-widest text-center px-8">Align face within the circle</p>
                </div>
              )}
              
              {isCapturing && (
                <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm flex items-center justify-center">
                   <RefreshCw className="w-10 h-10 text-white animate-spin" />
                </div>
              )}
              
              {/* Guides */}
              <div className="absolute inset-0 border-[20px] border-slate-900/50 pointer-events-none" />
           </div>

          <div className="text-center space-y-4">
              <Button 
                onClick={handleCapture}
                className="bg-primary hover:bg-primary-dark text-white rounded-full px-8 h-14 font-bold shadow-lg gap-2"
              >
                 <Camera className="w-5 h-5" /> {capturedPhoto ? 'Retake Photo' : 'Capture Live Biometric'}
              </Button>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Agent will perform a <strong>Liveness Check</strong> to prevent spoofing. Ensure adequate lighting.
              </p>
           </div>

           <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl flex gap-3">
              <Info className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
              <p className="text-xs text-blue-800 leading-relaxed">
                This image will be compared against your <strong>National Digital ID</strong> record via the sovereign biometric API.
              </p>
           </div>
        </div>
      )}

      {/* Step 3: Residency */}
      {currentStep === 3 && (
        <div className="space-y-6">
           <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-primary" />
              <h4 className="font-bold text-slate-900">Residential Address</h4>
           </div>
           <Input label="House Number" placeholder="e.g. 122/A" />
           <div className="grid grid-cols-2 gap-4">
              <Input label="Sub-city" placeholder="e.g. Bole" />
              <Input label="Woreda" placeholder="e.g. 03" />
           </div>
           <Separator className="my-4" />
           <DocumentUploadWidget 
             label="Residency Evidence" 
             description="Upload Lease Agreement or Utility Bill (Water/Electric)"
           />
        </div>
      )}

      {/* Step 4: Review */}
      {currentStep === 4 && (
        <div className="space-y-8">
           <ReadinessPanel 
             score={92} 
             items={[
               { id: 'bio', label: 'Biometric Liveness', status: 'ready' },
               { id: 'map', label: 'Woreda Address Match', status: 'ready' },
               { id: 'doc', label: 'Evidence Quality', status: 'invalid', fixActionLabel: 'Verify' }
             ]}
           />
           <div className="p-6 bg-surface-muted border border-border rounded-3xl flex items-center gap-6">
              <div className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center text-primary shadow-sm border border-border">
                 <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                 <p className="text-sm font-bold text-slate-900">National ID Handshake</p>
                 <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-1">Status: Ready for Transmission</p>
              </div>
           </div>
        </div>
      )}
    </WizardShell>
  );
}
