'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
  Info,
  Loader2
} from 'lucide-react';

import { WizardShell } from '@/components/domain/WizardShell';
import { DocumentUploadWidget } from '@/components/domain/DocumentUploadWidget';
import { ReadinessPanel } from '@/components/domain/ReadinessPanel';
import { ConsentModal } from '@/components/submission/ConsentModal';
import { ProvenanceViewer } from '@/components/domain/ProvenanceViewer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/common/Input';
import { Separator } from '@/components/ui/separator';
import { apiClient } from '@/lib/api/client';
import { useTranslation } from 'react-i18next';

export default function KebeleIDWizard() {
  const { t } = useTranslation();

  const STEPS = [
    { title: t('services.kebeleId.steps.s1'), description: t('services.kebeleId.steps.s1Desc') },
    { title: t('services.kebeleId.steps.s2'), description: t('services.kebeleId.steps.s2Desc') },
    { title: t('services.kebeleId.steps.s3'), description: t('services.kebeleId.steps.s3Desc') },
    { title: t('services.kebeleId.steps.s4'), description: t('services.kebeleId.steps.s4Desc') }
  ];

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [portalSubmissionId, setPortalSubmissionId] = useState<string | null>(null);
  const [isConsentOpen, setIsConsentOpen] = useState(false);
  const [isProvenanceOpen, setIsProvenanceOpen] = useState(false);
  const [provenanceData, setProvenanceData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    oldId: '',
    dob: '',
    gender: '',
    houseNumber: '',
    subCity: '',
    woreda: ''
  });

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleNext = () => {
    if (currentStep === STEPS.length) {
      setIsConsentOpen(true);
    } else {
      nextStep();
    }
  };

  const handleCapture = () => {
    setIsCapturing(true);
    setTimeout(() => {
      setIsCapturing(false);
      setCapturedPhoto('https://api.dicebear.com/7.x/avataaars/svg?seed=Abebe');
    }, 2000);
  };

  const handleSubmit = async () => {
    setIsConsentOpen(false);
    setIsLoading(true);
    setError(null);
    try {
      const resp = await apiClient.post("/submissions", {
        package: {
          service_type: "KEBELE_ID_RENEWAL",
          jurisdiction: "Addis Ababa",
          form_data: formData,
          biometrics: capturedPhoto ? { photo_url: capturedPhoto } : null,
        },
      });
      setSubmissionId(resp.data?.submission_id || null);
      setPortalSubmissionId(resp.data?.portal_submission_id || "ET-KID-2026-REG");
      setIsSubmitted(true);
    } catch (e: any) {
      setError(e?.message || "Submission failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewProvenance = (itemId: string) => {
    setProvenanceData({
      issuer: "INSA Biometric Core",
      issuedAt: new Date().toISOString(),
      signature: "0x3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b",
      payload: {
        check_type: itemId,
        match_score: 0.992,
        database: "NATIONAL_BIOMETRIC_REGISTRY",
        verified_at: new Date().toISOString()
      }
    });
    setIsProvenanceOpen(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="bg-slate-900 rounded-[3rem] p-12 text-white text-center shadow-sovereign max-w-2xl w-full relative overflow-hidden">
           <div className="relative z-10">
              <CheckCircle2 className="w-20 h-20 text-primary/80 mx-auto mb-8" />
              <h1 className="text-4xl font-display font-bold mb-4">{t('wizard.success')}</h1>
              <p className="text-slate-200/80 text-lg mb-10">
                {t('services.kebeleId.description')}
              </p>
              
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 inline-block mb-10">
                 <p className="text-[10px] uppercase tracking-widest font-black text-primary mb-1">{t('wizard.confirmationId')}</p>
                 <p className="text-xl font-mono font-bold text-blue-400">{portalSubmissionId}</p>
              </div>

              <div className="flex gap-4 justify-center">
                <Link href={submissionId ? `/track/${submissionId}` : "/"}>
                  <Button variant="secondary" className="px-10 h-14 rounded-2xl font-bold">
                    {submissionId ? t('wizard.trackSubmission') : t('wizard.returnDashboard')}
                  </Button>
                </Link>
              </div>
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
      onNext={handleNext}
      isLoading={isLoading}
      nextLabel={currentStep === 4 ? t('wizard.initializeRegistrySync') : t('common.continue')}
    >
      {/* Step 1: Identity */}
      {currentStep === 1 && (
        <div className="space-y-6">
           <Input 
             label={t('services.kebeleId.details.fullName')} 
             placeholder="e.g. Abebe Bikila" 
             leftIcon={<User className="w-4 h-4" />} 
             value={formData.fullName}
             onChange={(e) => setFormData({...formData, fullName: e.target.value})}
           />
           <Input 
             label={t('services.kebeleId.details.oldId')} 
             placeholder="e.g. AA-09-122-01" 
             value={formData.oldId}
             onChange={(e) => setFormData({...formData, oldId: e.target.value})}
           />
           <div className="grid grid-cols-2 gap-4">
              <Input 
                label={t('services.kebeleId.details.dob')} 
                type="date" 
                value={formData.dob}
                onChange={(e) => setFormData({...formData, dob: e.target.value})}
              />
              <Input 
                label={t('services.kebeleId.details.gender')} 
                placeholder="Select..." 
                value={formData.gender}
                onChange={(e) => setFormData({...formData, gender: e.target.value})}
              />
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
                   <p className="text-[10px] font-black uppercase tracking-widest text-center px-8">{t('wizard.alignFace')}</p>
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
                 <Camera className="w-5 h-5" /> {capturedPhoto ? t('wizard.retakePhoto') : t('wizard.captureLive')}
              </Button>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Agent will perform a <strong>{t('wizard.livenessCheck')}</strong> to prevent spoofing. Ensure adequate lighting.
              </p>
           </div>

           <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl flex gap-3">
              <Info className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
              <p className="text-xs text-blue-800 leading-relaxed">
                {t('wizard.biometricNotice')}
              </p>
           </div>
        </div>
      )}

      {/* Step 3: Residency */}
      {currentStep === 3 && (
        <div className="space-y-6">
           <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-primary" />
              <h4 className="font-bold text-slate-900">{t('services.kebeleId.details.residencyAddress')}</h4>
           </div>
           <Input 
             label={t('services.kebeleId.details.houseNumber')} 
             placeholder="e.g. 122/A" 
             value={formData.houseNumber}
             onChange={(e) => setFormData({...formData, houseNumber: e.target.value})}
           />
           <div className="grid grid-cols-2 gap-4">
              <Input 
                label={t('services.kebeleId.details.subCity')} 
                placeholder="e.g. Bole" 
                value={formData.subCity}
                onChange={(e) => setFormData({...formData, subCity: e.target.value})}
              />
              <Input 
                label={t('services.kebeleId.details.woreda')} 
                placeholder="e.g. 03" 
                value={formData.woreda}
                onChange={(e) => setFormData({...formData, woreda: e.target.value})}
              />
           </div>
           <Separator className="my-4" />
           <DocumentUploadWidget 
             label={t('services.kebeleId.details.residencyEvidence')} 
             description={t('services.kebeleId.details.residencyDesc')}
           />
        </div>
      )}

      {/* Step 4: Review */}
      {currentStep === 4 && (
        <div className="space-y-8">
           {error && (
             <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-sm text-red-800">
               {error}
             </div>
           )}
           <ReadinessPanel 
             score={92} 
             items={[
               { id: 'bio', label: t('services.kebeleId.readiness.bio'), status: 'ready' },
               { id: 'map', label: t('services.kebeleId.readiness.map'), status: 'ready' },
               { id: 'doc', label: t('services.kebeleId.readiness.doc'), status: 'invalid', fixActionLabel: t('wizard.fixIssue') }
             ]}
             onViewProvenance={handleViewProvenance}
           />
           <div className="p-6 bg-surface-muted border border-border rounded-3xl flex items-center gap-6">
              <div className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center text-primary shadow-sm border border-border">
                 <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                 <p className="text-sm font-bold text-slate-900">{t('wizard.nationalIdHandshake')}</p>
                 <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-1">{t('wizard.status')}: {t('wizard.readyForTransmission')}</p>
              </div>
           </div>
        </div>
      )}

      <ConsentModal 
        isOpen={isConsentOpen} 
        onClose={() => setIsConsentOpen(false)} 
        onConfirm={handleSubmit} 
      />

      <ProvenanceViewer 
        isOpen={isProvenanceOpen} 
        onClose={() => setIsProvenanceOpen(false)} 
        data={provenanceData} 
      />
    </WizardShell>
  );
}
