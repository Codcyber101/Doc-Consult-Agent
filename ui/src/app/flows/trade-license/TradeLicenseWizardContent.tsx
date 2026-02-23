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
import { apiClient } from '@/lib/api/client';

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
  const [analysisId, setAnalysisId] = useState<string | null>(null);
  const [analysisStatus, setAnalysisStatus] = useState<string | null>(null);
  const [complianceReport, setComplianceReport] = useState<any | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, { label: string; documentId: string }>>({});
  const [formData, setFormData] = useState({
    region: '',
    subCity: '',
    businessName: '',
    businessCategory: '',
    tinNumber: ''
  });

  const [readinessItems, setReadinessItems] = useState<ReadinessItem[]>([
    { id: 'trade-license', label: 'Original Trade License', status: 'missing', fixActionLabel: 'Upload' },
    { id: 'tin-cert', label: 'TIN Certificate', status: 'missing', fixActionLabel: 'Upload' },
    { id: 'lease-doc', label: 'Lease Agreement (valid)', status: 'missing', fixActionLabel: 'Upload' },
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

  // When entering review step, trigger backend analysis and poll results
  useEffect(() => {
    if (currentStep !== 5) return;
    if (analysisId) return;

    const uploaded = Object.values(uploadedDocs);
    if (uploaded.length === 0) return;

    const start = async () => {
      setIsLoading(true);
      setAnalysisError(null);
      try {
        const primaryDocId = uploaded[0].documentId;
        const docLabels = uploaded.map((d) => d.label);
        const resp = await apiClient.post(`/documents/${primaryDocId}/analyze`, {
          jurisdiction_key: 'addis-ababa',
          process_id: 'trade-license',
          documents: docLabels,
        });
        const aId = resp.data?.analysis_id as string;
        if (!aId) throw new Error('No analysis_id returned from backend');
        setAnalysisId(aId);
        setAnalysisStatus(resp.data?.status || 'PROCESSING');

        // Poll analysis status
        const poll = async () => {
          const r = await apiClient.get(`/documents/analysis/${aId}`);
          const status = r.data?.status as string;
          setAnalysisStatus(status);
          if (status === 'PROCESSING') return false;
          setComplianceReport(r.data?.results || null);
          return true;
        };

        const interval = setInterval(async () => {
          try {
            const done = await poll();
            if (done) {
              clearInterval(interval);
              setIsLoading(false);
            }
          } catch (e: any) {
            clearInterval(interval);
            setIsLoading(false);
            setAnalysisError(e?.message || 'Failed to fetch analysis');
          }
        }, 2000);

        return () => clearInterval(interval);
      } catch (e: any) {
        setIsLoading(false);
        setAnalysisError(e?.message || 'Failed to start analysis');
      }
    };

    start();
  }, [currentStep, analysisId, uploadedDocs]);

  // When we get a compliance report, map missing-doc issues back to readiness items
  useEffect(() => {
    if (!complianceReport) return;
    const issues: any[] = complianceReport.issues || [];
    const missingLabels = new Set<string>();
    for (const i of issues) {
      if (i.code === 'MISSING_DOCUMENT' && typeof i.message === 'string') {
        const parts = i.message.split(':');
        const label = parts.length > 1 ? parts.slice(1).join(':').trim() : '';
        if (label) missingLabels.add(label);
      }
    }

    setReadinessItems((items) =>
      items.map((it) => {
        const isMissing = Array.from(missingLabels).some((m) => it.label.includes(m) || m.includes(it.label));
        return { ...it, status: isMissing ? 'missing' : 'ready' };
      }),
    );
  }, [complianceReport]);

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-surface dark:bg-slate-950 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full"
        >
          <div className="bg-slate-900 dark:bg-black rounded-[3rem] p-12 text-white text-center shadow-2xl shadow-primary/20 relative overflow-hidden">
             {/* Abstract background for success */}
             <div className="absolute inset-0 bg-mesh opacity-20 mix-blend-screen" />
             
             <div className="relative z-10">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-primary/40"
                >
                   <ShieldCheck className="w-10 h-10 text-white" />
                </motion.div>
                <h1 className="text-4xl font-display font-bold mb-4 tracking-tight">Transmission Successful</h1>
                <p className="text-slate-400 text-lg mb-10 max-w-md mx-auto">
                  Your application for Trade License Renewal has been securely transmitted to the National Gateway.
                </p>
                
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 inline-block mb-10">
                   <p className="text-[10px] uppercase tracking-widest font-black text-primary mb-1">Confirmation ID</p>
                   <p className="text-xl font-mono font-bold text-blue-400">ET-MESOB-2026-X99</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                   <Button variant="outline" className="gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20 h-12 px-6">
                      <Download className="w-4 h-4" /> Download Receipt
                   </Button>
                   <Link href="/">
                      <Button className="bg-primary hover:bg-primary-dark text-white h-12 px-8 font-bold shadow-lg shadow-primary/20">
                         Return to Dashboard
                      </Button>
                   </Link>
                </div>
             </div>
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
           <Input label="Document ID Number" placeholder="e.g. 123456789" />
        </div>
      )}

      {/* Step 2: Jurisdiction */}
      {currentStep === 2 && (
        <div className="space-y-8">
           <div className="grid gap-6">
              <div className="space-y-3">
                 <label className="text-sm font-bold text-slate-900 dark:text-white">Region / Chartered City</label>
                 <div className="grid grid-cols-2 gap-3">
                    {['Addis Ababa', 'Oromia', 'Amhara', 'Dire Dawa'].map(r => (
                       <button 
                         key={r}
                         onClick={() => setFormData({...formData, region: r})}
                         className={`p-4 rounded-xl border-2 text-left transition-all ${formData.region === r ? 'border-primary bg-primary/5 text-primary' : 'border-border dark:border-slate-800 bg-surface dark:bg-slate-900 text-slate-600 hover:border-border'}`}
                       >
                          <MapPin className={`w-4 h-4 mb-2 ${formData.region === r ? 'text-primary' : 'text-slate-400'}`} />
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
                       <label className="text-sm font-bold text-slate-900 dark:text-white">Administrative Sub-City</label>
                       <select 
                         className="w-full h-12 px-4 rounded-xl border border-border dark:border-slate-800 bg-surface dark:bg-slate-900 text-slate-900 dark:text-white"
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
              label="Original Trade License"
              description="Upload a clear scan or photo of your current trade license."
              onUploaded={async ({ documentId }) => {
                 setUploadedDocs((prev) => ({ ...prev, "Original Trade License": { label: "Original Trade License", documentId } }));
                 setReadinessItems(items => items.map(i => i.id === 'trade-license' ? {...i, status: 'ready'} : i));
              }}
           />
           <DocumentUploadWidget 
              label="TIN Certificate"
              description="Upload the latest digital or scanned copy."
              onUploaded={async ({ documentId }) => {
                 setUploadedDocs((prev) => ({ ...prev, "TIN Certificate": { label: "TIN Certificate", documentId } }));
                 setReadinessItems(items => items.map(i => i.id === 'tin-cert' ? {...i, status: 'ready'} : i));
              }}
           />
           <DocumentUploadWidget 
              label="Lease Agreement (valid)"
              description="Upload your current, valid lease agreement."
              onUploaded={async ({ documentId }) => {
                 setUploadedDocs((prev) => ({ ...prev, "Lease Agreement (valid)": { label: "Lease Agreement (valid)", documentId } }));
                 setReadinessItems(items => items.map(i => i.id === 'lease-doc' ? {...i, status: 'ready'} : i));
              }}
           />
        </div>
      )}

      {/* Step 5: Review */}
      {currentStep === 5 && (
        <div className="space-y-8">
           {analysisError && (
             <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-sm text-red-800">
               {analysisError}
             </div>
           )}
           <ReadinessPanel 
              score={typeof complianceReport?.readiness_score === 'number'
                ? complianceReport.readiness_score
                : readinessItems.every(i => i.status === 'ready') ? 100 : 66} 
              items={readinessItems}
              onFixItem={(id) => {
                 if (id === 'trade-license' || id === 'tin-cert' || id === 'lease-doc') setCurrentStep(4);
              }}
           />
           
           <div className="p-6 bg-slate-900 rounded-3xl text-white relative overflow-hidden">
              <div className="relative z-10">
                 <div className="flex items-center gap-3 mb-4">
                    <FileCheck className="w-5 h-5 text-primary/80" />
                    <h3 className="font-display font-bold text-lg">Declaration</h3>
                 </div>
                 <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    I hereby declare that all information provided is accurate and all documents are authentic. 
                    I understand that providing false information is a punishable offense under Ethiopian law.
                 </p>
                 <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-6 h-6 rounded-md border-2 border-slate-700 bg-slate-800 flex items-center justify-center group-hover:border-primary transition-colors">
                       <div className="w-3 h-3 bg-primary rounded-sm"></div>
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
