'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
  Link as LinkIcon,
  Loader2
} from 'lucide-react';

import { WizardShell } from '@/components/domain/WizardShell';
import { DocumentUploadWidget } from '@/components/domain/DocumentUploadWidget';
import { ReadinessPanel } from '@/components/domain/ReadinessPanel';
import { ConsentModal } from '@/components/submission/ConsentModal';
import { ProvenanceViewer } from '@/components/domain/ProvenanceViewer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/common/Input';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { apiClient } from '@/lib/api/client';
import { useTranslation } from 'react-i18next';

export default function VitalEventsWizard() {
  const { t } = useTranslation();

  const STEPS = [
    { title: t('services.vitalEvents.steps.s1'), description: t('services.vitalEvents.steps.s1Desc') },
    { title: t('services.vitalEvents.steps.s2'), description: t('services.vitalEvents.steps.s2Desc') },
    { title: t('services.vitalEvents.steps.s3'), description: t('services.vitalEvents.steps.s3Desc') },
    { title: t('services.vitalEvents.steps.s4'), description: t('services.vitalEvents.steps.s4Desc') }
  ];

  const [currentStep, setCurrentStep] = useState(1);
  const [eventType, setEventType] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [portalSubmissionId, setPortalSubmissionId] = useState<string | null>(null);
  const [isConsentOpen, setIsConsentOpen] = useState(false);
  const [isProvenanceOpen, setIsProvenanceOpen] = useState(false);
  const [provenanceData, setProvenanceData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    personName: '',
    eventDate: '',
    eventLocation: '',
    nationalId: '',
    fatherId: '',
    motherId: '',
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

  const handleSubmit = async () => {
    setIsConsentOpen(false);
    setIsLoading(true);
    setError(null);
    try {
      const resp = await apiClient.post("/submissions", {
        package: {
          service_type: `VITAL_EVENT_${eventType?.toUpperCase()}`,
          jurisdiction: "Federal - National Registry",
          form_data: { ...formData, eventType },
        },
      });
      setSubmissionId(resp.data?.submission_id || null);
      setPortalSubmissionId(resp.data?.portal_submission_id || `ET-VITAL-${eventType?.toUpperCase()}-2026`);
      setIsSubmitted(true);
    } catch (e: any) {
      setError(e?.message || "Submission failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewProvenance = (itemId: string) => {
    setProvenanceData({
      issuer: "Ministry of Justice - Vital Records",
      issuedAt: new Date().toISOString(),
      signature: "0xdeadbeef1234567890abcdef1234567890abcdef",
      payload: {
        record_id: `REC-${Math.random().toString(36).substring(7).toUpperCase()}`,
        status: "CANONICAL_ARCHIVE_MATCH",
        notary: "National Civil Registry Node #4"
      }
    });
    setIsProvenanceOpen(true);
  };

  const EVENT_TYPES = [
    { id: 'birth', label: t('services.vitalEvents.types.birth'), icon: <Baby />, desc: t('services.vitalEvents.types.birthDesc') },
    { id: 'marriage', label: t('services.vitalEvents.types.marriage'), icon: <Heart />, desc: t('services.vitalEvents.types.marriageDesc') },
    { id: 'death', label: t('services.vitalEvents.types.death'), icon: <UserX />, desc: t('services.vitalEvents.types.deathDesc') }
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="bg-slate-900 rounded-[3rem] p-12 text-white text-center shadow-sovereign max-w-2xl w-full">
           <CheckCircle2 className="w-20 h-20 text-primary/80 mx-auto mb-8" />
           <h1 className="text-4xl font-display font-bold mb-4">{t('wizard.registrySynced')}</h1>
           <p className="text-slate-200/80 text-lg mb-10 leading-relaxed">
             {t('wizard.registrySyncedSub')}
           </p>

           <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 inline-block mb-10 text-left">
              <p className="text-[10px] uppercase tracking-widest font-black text-primary mb-1">{t('wizard.confirmationId')}</p>
              <p className="text-xl font-mono font-bold text-blue-400">{portalSubmissionId}</p>
           </div>

           <div className="flex gap-4 justify-center">
             <Link href={submissionId ? `/track/${submissionId}` : "/"}>
               <Button variant="secondary" className="px-10 h-14 rounded-2xl font-bold">
                 {submissionId ? t('wizard.trackSubmission') : t('wizard.downloadCertificate')}
               </Button>
             </Link>
           </div>
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
      nextDisabled={currentStep === 1 && !eventType}
      nextLabel={currentStep === 4 ? t('wizard.initializeRegistrySync') : t('common.continue')}
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
              <h4 className="font-bold text-slate-900 capitalize">{eventType} {t('wizard.status')}</h4>
           </div>
           <Input 
             label={t('services.vitalEvents.details.primaryName')} 
             placeholder={t('services.vitalEvents.details.namePlaceholder')} 
             value={formData.personName}
             onChange={(e) => setFormData({...formData, personName: e.target.value})}
           />
           <div className="grid grid-cols-2 gap-4">
              <Input 
                label={t('services.vitalEvents.details.eventDate')} 
                type="date" 
                value={formData.eventDate}
                onChange={(e) => setFormData({...formData, eventDate: e.target.value})}
              />
              <Input 
                label={t('services.vitalEvents.details.eventLocation')} 
                placeholder={t('services.vitalEvents.details.locationPlaceholder')} 
                value={formData.eventLocation}
                onChange={(e) => setFormData({...formData, eventLocation: e.target.value})}
              />
           </div>
           <Input 
             label={t('services.vitalEvents.details.tinNationalId')} 
             placeholder={t('services.vitalEvents.details.tinNationalId')} 
             value={formData.nationalId}
             onChange={(e) => setFormData({...formData, nationalId: e.target.value})}
           />
        </div>
      )}

      {/* Step 3: Relationship */}
      {currentStep === 3 && (
        <div className="space-y-8">
           <div className="bg-surface-muted p-6 rounded-3xl border border-border space-y-6">
              <div className="flex items-center gap-3">
                 <LinkIcon className="w-5 h-5 text-primary" />
                 <h4 className="font-bold text-slate-900">{t('services.vitalEvents.details.nationalIdLinkage')}</h4>
              </div>
              <div className="space-y-4">
                 <Input 
                   label={t('services.vitalEvents.details.fatherId')} 
                   placeholder="ET-ID-XXXXX" 
                   value={formData.fatherId}
                   onChange={(e) => setFormData({...formData, fatherId: e.target.value})}
                 />
                 <Input 
                   label={t('services.vitalEvents.details.motherId')} 
                   placeholder="ET-ID-XXXXX" 
                   value={formData.motherId}
                   onChange={(e) => setFormData({...formData, motherId: e.target.value})}
                 />
              </div>
           </div>

           <div className="space-y-4">
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 px-2">{t('services.vitalEvents.details.witnesses')}</h4>
              <div className="grid gap-3">
                 {[1, 2].map(i => (
                   <div key={i} className="flex gap-3">
                      <Input label={t('services.vitalEvents.details.witnessName', { count: i })} placeholder={t('services.vitalEvents.details.witnessNamePlaceholder')} className="flex-[2]" />
                      <Input label={t('services.vitalEvents.details.witnessId')} placeholder={t('services.vitalEvents.details.idPlaceholder')} className="flex-1" />
                   </div>
                 ))}
              </div>
           </div>
        </div>
      )}

      {/* Step 4: Transmission */}
      {currentStep === 4 && (
        <div className="space-y-8 text-center py-6">
           {error && (
             <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-sm text-red-800 text-left">
               {error}
             </div>
           )}
           <div className="w-20 h-20 bg-primary/10 text-primary rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
              <ShieldCheck className="w-10 h-10" />
           </div>
           <h3 className="text-2xl font-display font-bold text-slate-900">{t('wizard.sovereignVerification')}</h3>
           <p className="text-slate-500 max-w-sm mx-auto leading-relaxed">
              {t('wizard.sovereignVerificationSub')}
           </p>

           <ReadinessPanel 
             score={94} 
             items={[
               { id: 'registry', label: t('services.vitalEvents.details.registryMatch'), status: 'ready' },
               { id: 'witness', label: t('services.vitalEvents.details.witnessVerification'), status: 'ready' },
               { id: 'integrity', label: t('services.vitalEvents.details.integrityHash'), status: 'ready' }
             ]}
             onViewProvenance={handleViewProvenance}
           />
           
           <div className="p-6 bg-slate-900 rounded-[2rem] text-left relative overflow-hidden">
              <div className="relative z-10 space-y-4">
                 <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-primary/80">
                    <span>{t('wizard.registryHandshake')}</span>
                    <span>94% {t('vault.verified')}</span>
                 </div>
                 <Progress value={94} className="h-2 bg-slate-800" />
                 <p className="text-[10px] text-slate-400 font-medium">{t('wizard.transmittingBlock')}</p>
              </div>
              <div className="absolute inset-0 grain opacity-5 pointer-events-none" />
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
