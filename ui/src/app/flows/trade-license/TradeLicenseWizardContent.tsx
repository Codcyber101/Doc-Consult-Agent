'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2,
  MapPin,
  FileCheck,
  ShieldCheck,
  Download,
  ArrowRight,
  Briefcase,
  AlertCircle
} from 'lucide-react';

import { WizardShell } from '@/components/domain/WizardShell';
import { DocumentUploadWidget } from '@/components/domain/DocumentUploadWidget';
import { ReadinessPanel, ReadinessItem } from '@/components/domain/ReadinessPanel';
import { ProcedureChecklistCard } from '@/components/domain/ProcedureChecklistCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/common/Input';
import { saveWizardProgress, getWizardProgress } from '@/lib/offline/db';

const STEPS = [
  { title: 'Information', description: 'Review requirements and eligibility' },
  { title: 'Jurisdiction', description: 'Select your business location' },
  { title: 'Business Details', description: 'Enter business name and category' },
  { title: 'Documents', description: 'Upload mandatory identifications' },
  { title: 'Review', description: 'Final compliance audit' }
];

export default function TradeLicenseWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    region: '',
    subCity: '',
    businessName: '',
    businessCategory: '',
    tinNumber: ''
  });

  const [readinessItems, setReadinessItems] = useState<ReadinessItem[]>([
    { id: 'id-scan', label: 'Resident ID / Passport', status: 'missing', fixActionLabel: 'Upload' },
    { id: 'tin-cert', label: 'TIN Certificate', status: 'missing', fixActionLabel: 'Upload' },
    { id: 'lease-doc', label: 'Lease Agreement', status: 'ready' },
  ]);

  useEffect(() => {
    const loadProgress = async () => {
      const saved = await getWizardProgress('trade-license-draft');
      if (saved) {
        // @ts-expect-error - saved has data
        if (saved.currentStep) setCurrentStep(saved.currentStep);
        // @ts-expect-error - saved has data
        if (saved.formData) setFormData(saved.formData);
      }
    };
    loadProgress();
  }, []);

  const handleNext = async () => {
    if (currentStep === STEPS.length) {
      handleSubmit();
      return;
    }
    const next = currentStep + 1;
    setCurrentStep(next);
    await saveWizardProgress('trade-license-draft', { 
      currentStep: next, 
      formData 
    });
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full"
        >
          <div className="bg-emerald-900 rounded-[3rem] p-12 text-white text-center shadow-sovereign relative overflow-hidden">
             <div className="relative z-10">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="w-20 h-20 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-glow-emerald"
                >
                   <ShieldCheck className="w-10 h-10 text-white" />
                </motion.div>
                <h1 className="text-4xl font-display font-bold mb-4">Transmission Successful</h1>
                <p className="text-emerald-100/80 text-lg mb-10">
                  Your application for Trade License Renewal has been securely transmitted to the National Gateway.
                </p>
                
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 inline-block mb-10">
                   <p className="text-[10px] uppercase tracking-widest font-black text-emerald-300 mb-1">Confirmation ID</p>
                   <p className="text-xl font-mono font-bold text-gold-500">ET-MESOB-2026-X99</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                   <Button variant="secondary" className="gap-2">
                      <Download className="w-4 h-4" /> Download Receipt
                   </Button>
                   <Link href="/">
                      <Button variant="outline" className="bg-transparent border-white/20 text-white hover:bg-white/10 w-full sm:w-auto">
                         Return to Dashboard
                      </Button>
                   </Link>
                </div>
             </div>
             {/* Decorative pattern */}
             <div className="absolute inset-0 opacity-10 pointer-events-none grain" />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <WizardShell
      currentStep={currentStep}
      totalSteps={STEPS.length}
      title={STEPS[currentStep - 1].title}
      description={STEPS[currentStep - 1].description}
      onBack={currentStep > 1 ? handleBack : undefined}
      onNext={handleNext}
      isLoading={isLoading}
    >
      {/* Step 1: Intro */}
      {currentStep === 1 && (
        <div className="space-y-6">
           <ProcedureChecklistCard 
              title="Trade License Renewal"
              description="Official process for renewing business operations within Ethiopia."
              estimatedTime="2-3 Days"
              cost="500 ETB"
              isOfflineAvailable={true}
              requiredDocsCount={3}
              missingDocsCount={2}
           />
           <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl flex gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
              <p className="text-sm text-amber-800">
                Ensure you have your <strong>Original ID</strong> and <strong>TIN Certificate</strong> scans ready before proceeding.
              </p>
           </div>
        </div>
      )}

      {/* Step 2: Jurisdiction */}
      {currentStep === 2 && (
        <div className="space-y-8">
           <div className="grid gap-6">
              <div className="space-y-3">
                 <label className="text-sm font-bold text-slate-900">Region / Chartered City</label>
                 <div className="grid grid-cols-2 gap-3">
                    {['Addis Ababa', 'Oromia', 'Amhara', 'Dire Dawa'].map(r => (
                       <button 
                         key={r}
                         onClick={() => setFormData({...formData, region: r})}
                         className={`p-4 rounded-xl border-2 text-left transition-all ${formData.region === r ? 'border-emerald-600 bg-emerald-50 text-emerald-900' : 'border-slate-100 bg-slate-50 text-slate-600 hover:border-slate-200'}`}
                       >
                          <MapPin className={`w-4 h-4 mb-2 ${formData.region === r ? 'text-emerald-600' : 'text-slate-400'}`} />
                          <span className="font-bold text-sm">{r}</span>
                       </button>
                    ))}
                 </div>
              </div>

              <AnimatePresence>
                 {formData.region === 'Addis Ababa' && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-3"
                    >
                       <label className="text-sm font-bold text-slate-900">Administrative Sub-City</label>
                       <select 
                         className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white"
                         value={formData.subCity}
                         onChange={(e) => setFormData({...formData, subCity: e.target.value})}
                       >
                          <option value="">Select Sub-City</option>
                          {['Bole', 'Arada', 'Kirkos', 'Lideta'].map(s => <option key={s} value={s}>{s}</option>)}
                       </select>
                    </motion.div>
                 )}
              </AnimatePresence>
           </div>
        </div>
      )}

      {/* Step 3: Business Details */}
      {currentStep === 3 && (
        <div className="space-y-6">
           <Input 
             label="Business Name" 
             placeholder="Enter registered name"
             value={formData.businessName}
             onChange={(e) => setFormData({...formData, businessName: e.target.value})}
             leftIcon={<Building2 className="w-4 h-4" />}
           />
           <Input 
             label="Business Category" 
             placeholder="e.g. Retail, Tech, Manufacturing"
             value={formData.businessCategory}
             onChange={(e) => setFormData({...formData, businessCategory: e.target.value})}
             leftIcon={<Briefcase className="w-4 h-4" />}
           />
           <Input 
             label="TIN Number" 
             placeholder="10-digit tax identification"
             value={formData.tinNumber}
             onChange={(e) => setFormData({...formData, tinNumber: e.target.value})}
             maxLength={10}
             showCount
           />
        </div>
      )}

      {/* Step 4: Documents */}
      {currentStep === 4 && (
        <div className="space-y-8">
           <DocumentUploadWidget 
              label="Resident ID / Passport Scan"
              description="Ensure all four corners are visible and text is legible."
              onUpload={async () => {
                 setReadinessItems(items => items.map(i => i.id === 'id-scan' ? {...i, status: 'ready'} : i));
              }}
           />
           <DocumentUploadWidget 
              label="TIN Certificate"
              description="Upload the latest digital or scanned copy."
              onUpload={async () => {
                 setReadinessItems(items => items.map(i => i.id === 'tin-cert' ? {...i, status: 'ready'} : i));
              }}
           />
        </div>
      )}

      {/* Step 5: Review */}
      {currentStep === 5 && (
        <div className="space-y-8">
           <ReadinessPanel 
              score={readinessItems.every(i => i.status === 'ready') ? 100 : 66} 
              items={readinessItems}
              onFixItem={(id) => {
                 if (id === 'id-scan' || id === 'tin-cert') setCurrentStep(4);
              }}
           />
           
           <div className="p-6 bg-slate-900 rounded-3xl text-white relative overflow-hidden">
              <div className="relative z-10">
                 <div className="flex items-center gap-3 mb-4">
                    <FileCheck className="w-5 h-5 text-emerald-400" />
                    <h3 className="font-display font-bold text-lg">Declaration</h3>
                 </div>
                 <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    I hereby declare that all information provided is accurate and all documents are authentic. 
                    I understand that providing false information is a punishable offense under Ethiopian law.
                 </p>
                 <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-6 h-6 rounded-md border-2 border-slate-700 bg-slate-800 flex items-center justify-center group-hover:border-emerald-500 transition-colors">
                       <div className="w-3 h-3 bg-emerald-500 rounded-sm"></div>
                    </div>
                    <span className="text-sm font-medium">I agree to the terms and conditions</span>
                 </label>
              </div>
           </div>
        </div>
      )}
    </WizardShell>
  );
}
