'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  Info,
  MapPin,
  Building2,
  AlertCircle,
  FileText
} from 'lucide-react';
import { ReadinessScore } from '../../../components/analysis/ReadinessScore';
import { Upload } from '../../../components/document/Upload';
import { SyncStatus } from '../../../components/common/SyncStatus';
import { saveWizardProgress, getWizardProgress } from '../../../lib/offline/db';
import { ConsentModal } from '../../../components/submission/ConsentModal';
import { TrackingTimeline } from '../../../components/submission/TrackingTimeline';

const STEPS = [
  { id: 'jurisdiction', title: 'Location', description: 'Select your business location' },
  { id: 'requirements', title: 'Requirements', description: 'Review mandatory documents' },
  { id: 'documents', title: 'Upload', description: 'Analyze your documents' },
  { id: 'review', title: 'Submit', description: 'Final review and submission' }
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
        setCurrentStep(saved.currentStep || 0);
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
    <div className="min-h-screen bg-gray-50 pb-20">
      <SyncStatus />
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={prevStep} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="ml-4 font-bold text-gray-900">Trade License Renewal</h1>
          </div>
          <div className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            Step {currentStep + 1} of {STEPS.length}
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-100 h-1">
          <div 
            className="bg-blue-600 h-1 transition-all duration-500" 
            style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Step 1: Jurisdiction */}
        {currentStep === 0 && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <MapPin className="w-6 h-6 text-blue-600 mr-2" />
                Where is your business located?
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Region / Chartered City</label>
                  <select 
                    className="block w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
                    value={jurisdiction.region}
                    onChange={(e) => setJurisdiction({...jurisdiction, region: e.target.value})}
                  >
                    <option value="">Select Region</option>
                    {JURISDICTIONS.regions.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                
                {jurisdiction.region === 'Addis Ababa' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sub-City</label>
                    <select 
                      className="block w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
                      value={jurisdiction.subCity}
                      onChange={(e) => setJurisdiction({...jurisdiction, subCity: e.target.value})}
                    >
                      <option value="">Select Sub-City</option>
                      {JURISDICTIONS.subCities.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 flex items-start">
              <Info className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
              <p className="ml-4 text-sm text-blue-800 leading-relaxed">
                Selecting the correct sub-city ensures you see the specific requirements for your local trade office.
              </p>
            </div>
          </div>
        )}

        {/* Step 2: Requirements */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Building2 className="w-6 h-6 text-blue-600 mr-2" />
                Renewal Requirements
              </h2>
              
              <ul className="space-y-4">
                {[
                  'Original and Copy of previous Trade License',
                  'TIN Certificate (Taxpayer Identification Number)',
                  'Lease Agreement or Title Deed for Business Premises',
                  'Audit Report (if applicable based on capital)'
                ].map((req, i) => (
                  <li key={i} className="flex items-start p-4 bg-gray-50 rounded-2xl">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <span className="ml-4 text-gray-700 font-medium">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Step 3: Documents */}
        {currentStep === 2 && (
          <div className="space-y-6">
             <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Document Readiness</h2>
                <ReadinessScore score={75} />
             </div>
             
             <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4">Upload Documents</h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Trade License (Front)</p>
                    <Upload onUpload={(file) => console.log(file)} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">TIN Certificate</p>
                    <Upload onUpload={(file) => console.log(file)} />
                  </div>
                </div>
             </div>

             <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100 flex items-start">
                <AlertCircle className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                <div className="ml-4">
                  <h4 className="font-bold text-amber-900">Missing Information</h4>
                  <p className="text-sm text-amber-800 leading-relaxed">
                    We couldn't find the "Expiry Date" on your Trade License scan. Please ensure the bottom part of the document is visible.
                  </p>
                  <button className="mt-3 text-sm font-bold text-amber-900 underline">Fix Now</button>
                </div>
             </div>
          </div>
        )}

        {/* Step 4: Submission Tracking */}
        {currentStep === 3 && isSubmitted && (
          <div className="space-y-6">
            <div className="bg-green-50 p-8 rounded-3xl border border-green-100 flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-green-900">Application Submitted!</h2>
                <p className="text-green-700 font-medium">Tracking ID: ET-MESOB-2026-X99</p>
              </div>
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <TrackingTimeline />
          </div>
        )}

        {/* Step 4: Initial Review (Pre-Submit) */}
        {currentStep === 3 && !isSubmitted && (
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center">
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
                <FileText className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Ready to Submit</h2>
              <p className="text-gray-500 max-w-sm mx-auto">
                All mandatory documents have been analyzed and verified. Your application is ready for the Ministry of Trade portal.
              </p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-12 flex items-center justify-between">
          {!isSubmitted && (
            <>
              <button 
                onClick={prevStep}
                className={`px-8 py-4 rounded-2xl font-bold transition-all ${currentStep === 0 ? 'invisible' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Back
              </button>
              <button 
                onClick={nextStep}
                disabled={currentStep === 0 && !jurisdiction.subCity}
                className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 disabled:opacity-50 disabled:shadow-none flex items-center transition-all"
              >
                {currentStep === STEPS.length - 1 ? 'Submit Online' : 'Next Step'}
                <ChevronRight className="ml-2 w-5 h-5" />
              </button>
            </>
          )}
          {isSubmitted && (
            <Link href="/" className="w-full text-center px-10 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-all">
              Return to Home
            </Link>
          )}
        </div>
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
