'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  Info,
  MapPin,
  Building2,
  AlertCircle,
  FileText,
  ArrowRight,
  ShieldCheck,
  Download
} from 'lucide-react';
import { ReadinessScore } from '../../../components/analysis/ReadinessScore';
import { Upload } from '../../../components/document/Upload';
import { SyncStatus } from '../../../components/common/SyncStatus';
import { saveWizardProgress, getWizardProgress } from '../../../lib/offline/db';
import { ConsentModal } from '../../../components/submission/ConsentModal';
import { TrackingTimeline } from '../../../components/submission/TrackingTimeline';

const STEPS = [
  { id: 'jurisdiction', title: 'Location', amharic: 'አካባቢ', description: 'Business jurisdiction' },
  { id: 'requirements', title: 'Criteria', amharic: 'መስፈርቶች', description: 'Mandatory prerequisites' },
  { id: 'documents', title: 'Analysis', amharic: 'ሰነዶች', description: 'Sovereign document verify' },
  { id: 'review', title: 'Finalize', amharic: 'ማጠቃለያ', description: 'Audit & Submission' }
];

const JURISDICTIONS = {
  regions: ['Addis Ababa', 'Oromia', 'Amhara', 'Dire Dawa'],
  subCities: ['Bole', 'Arada', 'Kirkos', 'Lideta', 'Yeka']
};

export default function TradeLicenseWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [jurisdiction, setJurisdiction] = useState({ region: '', subCity: '' });
  const [isConsentOpen, setIsConsentOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const loadProgress = async () => {
      const saved = await getWizardProgress('trade-license-draft');
      if (saved) {
        // @ts-expect-error - PouchDB response properties
        setCurrentStep(saved.currentStep || 0);
        // @ts-expect-error - PouchDB response properties
        setJurisdiction(saved.jurisdiction || { region: '', subCity: '' });
      }
    };
    loadProgress();
  }, []);

  const nextStep = async () => {
    if (currentStep === STEPS.length - 1) {
      setIsConsentOpen(true);
      return;
    }
    const next = Math.min(currentStep + 1, STEPS.length - 1);
    setCurrentStep(next);
    await saveWizardProgress('trade-license-draft', { 
      currentStep: next, 
      jurisdiction 
    });
  };

  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  return (
    <div className="min-h-screen bg-sovereign-sand selection:bg-sovereign-gold selection:text-white">
      <SyncStatus />
      
      {/* Dynamic Background Pattern */}
      <div className="fixed inset-0 ethio-pattern opacity-20 -z-10" />

      {/* Modern Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-[100]">
        <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button 
              onClick={prevStep} 
              disabled={currentStep === 0 || isSubmitted}
              className="w-12 h-12 flex items-center justify-center bg-white border border-gray-200 rounded-2xl hover:border-sovereign-gold hover:text-sovereign-gold transition-all disabled:opacity-30 disabled:hover:border-gray-200 disabled:hover:text-current"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-sovereign-slate uppercase">
                Trade License <span className="text-sovereign-green italic">Renewal</span>
              </h1>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-0.5">
                National Portal Gateway • ID: ET-TL-2026
              </p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-3">
            {STEPS.map((step, i) => (
              <React.Fragment key={step.id}>
                <div className={`flex flex-col items-center group relative ${i === currentStep ? 'opacity-100' : 'opacity-30'}`}>
                  <span className={`text-[10px] font-black uppercase tracking-widest mb-1 ${i === currentStep ? 'text-sovereign-green' : 'text-gray-500'}`}>
                    {step.title}
                  </span>
                  <div className={`w-10 h-1.5 rounded-full transition-all duration-500 ${i <= currentStep ? 'bg-sovereign-green' : 'bg-gray-200'}`} />
                </div>
                {i !== STEPS.length - 1 && <div className="w-4 h-0.5 bg-gray-100" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "circOut" }}
              className="space-y-10"
            >
              {/* Step 1: Jurisdiction */}
              {currentStep === 0 && (
                <div className="space-y-10">
                  <div className="bg-white p-12 rounded-[3rem] shadow-sovereign border border-gray-100 relative overflow-hidden">
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-10">
                        <div className="w-14 h-14 bg-sovereign-green/10 rounded-2xl flex items-center justify-center text-sovereign-green">
                          <MapPin className="w-7 h-7" />
                        </div>
                        <h2 className="text-3xl font-black tracking-tight text-gray-900 uppercase">Archive Jurisdiction</h2>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-10">
                        <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-4">Region / Chartered City</label>
                          <select 
                            className="block w-full p-6 bg-sovereign-sand border-2 border-transparent focus:border-sovereign-green rounded-[2rem] font-bold text-lg outline-none transition-all appearance-none"
                            value={jurisdiction.region}
                            onChange={(e) => setJurisdiction({...jurisdiction, region: e.target.value, subCity: ''})}
                          >
                            <option value="">Select Region</option>
                            {JURISDICTIONS.regions.map(r => <option key={r} value={r}>{r}</option>)}
                          </select>
                        </div>
                        
                        <AnimatePresence>
                          {jurisdiction.region === 'Addis Ababa' && (
                            <motion.div 
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="space-y-3"
                            >
                              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-4">Administrative Sub-City</label>
                              <select 
                                className="block w-full p-6 bg-sovereign-sand border-2 border-transparent focus:border-sovereign-green rounded-[2rem] font-bold text-lg outline-none transition-all appearance-none"
                                value={jurisdiction.subCity}
                                onChange={(e) => setJurisdiction({...jurisdiction, subCity: e.target.value})}
                              >
                                <option value="">Select Sub-City</option>
                                {JURISDICTIONS.subCities.map(s => <option key={s} value={s}>{s}</option>)}
                              </select>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                    
                    <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none">
                      <MapPin size={240} />
                    </div>
                  </div>

                  <div className="bg-sovereign-slate p-8 rounded-[2.5rem] flex items-start gap-6 text-white shadow-2xl">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Info className="w-6 h-6 text-sovereign-gold" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-bold text-lg">Jurisdiction Optimization</p>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Selecting the correct administrative zone allows our agents to fetch specific sub-city policy YAMLs for precise compliance mapping.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Requirements */}
              {currentStep === 1 && (
                <div className="space-y-10">
                  <div className="bg-white p-12 rounded-[3rem] shadow-sovereign border border-gray-100">
                    <div className="flex items-center gap-4 mb-12">
                      <div className="w-14 h-14 bg-sovereign-gold/10 rounded-2xl flex items-center justify-center text-sovereign-gold">
                        <Building2 className="w-7 h-7" />
                      </div>
                      <h2 className="text-3xl font-black tracking-tight text-gray-900 uppercase">Policy Requirements</h2>
                    </div>
                    
                    <div className="grid gap-4">
                      {[
                        'Original Trade License Archive',
                        'TIN Verification Certificate',
                        'Lease Contract / Title Deed',
                        'Sub-City Audit Authorization'
                      ].map((req, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center justify-between p-6 bg-sovereign-sand rounded-3xl border border-gray-100 group hover:bg-white hover:border-sovereign-green transition-all duration-500"
                        >
                          <div className="flex items-center gap-5">
                            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:bg-sovereign-green group-hover:text-white transition-colors">
                              <CheckCircle2 className="w-5 h-5" />
                            </div>
                            <span className="font-black text-sovereign-slate uppercase tracking-tight">{req}</span>
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Mandatory</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Documents */}
              {currentStep === 2 && (
                <div className="space-y-10">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                    <div>
                      <h2 className="text-2xl font-black tracking-tight text-gray-900 uppercase">Sovereign Analysis</h2>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Real-time Verification</p>
                    </div>
                    <ReadinessScore score={82} />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-4">Primary Document</p>
                      <Upload label="Trade License Scan" onUpload={() => {}} />
                    </div>
                    <div className="space-y-4">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-4">Tax Authorization</p>
                      <Upload label="TIN Certificate" onUpload={() => {}} />
                    </div>
                  </div>

                  <div className="bg-sovereign-gold/5 border-2 border-sovereign-gold/20 p-8 rounded-[2.5rem] flex items-start gap-6 relative overflow-hidden">
                    <div className="w-12 h-12 rounded-2xl bg-sovereign-gold text-white flex items-center justify-center flex-shrink-0 shadow-lg shadow-sovereign-gold/20">
                      <AlertCircle className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-black text-sovereign-slate uppercase tracking-tight mb-1">OCR Warning: Low Contrast</h4>
                      <p className="text-sm text-gray-600 leading-relaxed font-medium">
                        The "Issuance Date" field on the Trade License scan is partially obscured. Please ensure full-frame capture for 100% agent confidence.
                      </p>
                      <button className="mt-4 text-[10px] font-black uppercase tracking-[0.2em] text-sovereign-gold border-b-2 border-sovereign-gold hover:text-sovereign-slate hover:border-sovereign-slate transition-all">
                        Initiate High-Res Capture
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Final Review */}
              {currentStep === 3 && (
                <div className="space-y-10">
                  <div className="bg-white p-16 rounded-[4rem] border-2 border-sovereign-green shadow-2xl text-center relative overflow-hidden">
                    <div className="relative z-10">
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-24 h-24 bg-sovereign-green rounded-[2.5rem] flex items-center justify-center text-white mx-auto mb-10 shadow-2xl shadow-sovereign-green/30"
                      >
                        <ShieldCheck className="w-12 h-12" />
                      </motion.div>
                      <h2 className="text-4xl font-black tracking-tighter text-gray-900 uppercase mb-4">Archive Authenticated</h2>
                      <p className="text-gray-500 max-w-sm mx-auto font-medium text-lg leading-relaxed">
                        All mandatory policy criteria have been satisfied. Archive is ready for national gateway transmission.
                      </p>
                      
                      <div className="mt-12 p-6 bg-sovereign-sand rounded-3xl inline-flex items-center gap-4 border border-gray-100">
                        <FileText className="text-sovereign-green w-5 h-5" />
                        <span className="font-black text-[10px] uppercase tracking-widest text-sovereign-slate">Audit Hash: 0x82f...a12</span>
                      </div>
                    </div>
                    
                    <div className="absolute inset-0 ethio-pattern opacity-10" />
                  </div>
                </div>
              )}

              {/* Enhanced Navigation */}
              <div className="pt-12 flex items-center justify-between border-t border-gray-200">
                <button 
                  onClick={prevStep}
                  className={`px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all ${currentStep === 0 ? 'invisible' : 'text-gray-400 hover:text-sovereign-slate hover:bg-white'}`}
                >
                  Return
                </button>
                <button 
                  onClick={nextStep}
                  disabled={currentStep === 0 && !jurisdiction.subCity}
                  className="group px-12 py-5 bg-sovereign-slate text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl shadow-sovereign-slate/20 hover:bg-black disabled:opacity-30 disabled:grayscale transition-all flex items-center gap-4"
                >
                  {currentStep === STEPS.length - 1 ? 'Authorize & Submit' : 'Continue Process'}
                  <ArrowRight className="w-4 h-4 text-sovereign-gold group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-12"
            >
              <div className="bg-sovereign-green p-16 rounded-[4rem] text-white flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl shadow-sovereign-green/30 relative overflow-hidden">
                <div className="relative z-10">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mb-4 block">National Gateway Status</span>
                  <h2 className="text-5xl font-black tracking-tighter mb-4">Success.</h2>
                  <p className="text-xl font-medium text-white/80">Transmission ID: <span className="text-white font-black underline decoration-sovereign-gold underline-offset-8">ET-MESOB-2026-X99</span></p>
                </div>
                <div className="relative z-10 w-24 h-24 bg-white/10 backdrop-blur-md rounded-[2.5rem] flex items-center justify-center border border-white/20">
                  <CheckCircle2 className="w-12 h-12 text-white" />
                </div>
                <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                  <ShieldCheck size={300} />
                </div>
              </div>

              <TrackingTimeline />

              <div className="flex flex-col sm:flex-row gap-6">
                <button className="flex-1 p-6 bg-white border border-gray-200 rounded-[2rem] flex items-center justify-center gap-4 hover:border-sovereign-gold transition-all group">
                  <Download className="w-6 h-6 text-sovereign-gold group-hover:translate-y-1 transition-transform" />
                  <span className="font-black text-[10px] uppercase tracking-[0.2em]">Download Receipt</span>
                </button>
                <Link href="/" className="flex-1 p-6 bg-sovereign-slate text-white rounded-[2rem] flex items-center justify-center gap-4 hover:bg-black transition-all shadow-xl">
                  <span className="font-black text-[10px] uppercase tracking-[0.2em]">Exit Portal</span>
                  <ArrowRight className="w-6 h-6 text-sovereign-gold" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <ConsentModal 
        isOpen={isConsentOpen} 
        onClose={() => setIsConsentOpen(false)} 
        onConfirm={() => {
          setIsConsentOpen(false);
          setIsSubmitted(true);
        }} 
      />
    </div>
  );
}