'use client';

import React, { useState } from 'react';
import { ShieldCheck, Lock, AlertCircle, X } from 'lucide-react';

interface ConsentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function ConsentModal({ isOpen, onClose, onConfirm }: ConsentModalProps) {
  const [agreed, setAgreed] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Data Processing Consent</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="p-8 space-y-6">
          <div className="flex items-start p-4 bg-blue-50 rounded-2xl border border-blue-100">
            <Lock className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
            <p className="ml-4 text-sm text-blue-800 leading-relaxed font-medium">
              Your data will be securely processed by GovAssist Ethiopia and submitted to the relevant government portals. No data will leave sovereign Ethiopian infrastructure.
            </p>
          </div>

          <div className="space-y-4 max-h-60 overflow-y-auto text-sm text-gray-600 leading-relaxed pr-2">
            <p>I hereby authorize GovAssist Ethiopia to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Analyze my uploaded documents for compliance verification.</li>
              <li>Extract necessary PII (Personally Identifiable Information) for application completion.</li>
              <li>Electronically submit my application to the MESOB portal on my behalf.</li>
              <li>Store a cryptographic hash of this consent for audit purposes.</li>
            </ul>
          </div>

          <label className="flex items-center space-x-4 p-4 border border-gray-200 rounded-2xl cursor-pointer hover:bg-gray-50 transition-colors">
            <input 
              type="checkbox" 
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="w-6 h-6 rounded-lg text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="text-sm font-bold text-gray-900 leading-tight">
              I have read and agree to the Data Processing Agreement and Privacy Policy.
            </span>
          </label>
        </div>

        <div className="p-6 bg-gray-50 flex space-x-4">
          <button 
            onClick={onClose}
            className="flex-1 px-6 py-4 bg-white border border-gray-200 rounded-2xl font-bold text-gray-600 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button 
            disabled={!agreed}
            onClick={onConfirm}
            className="flex-1 px-6 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 disabled:opacity-50 transition-all shadow-lg shadow-blue-200"
          >
            Agree & Submit
          </button>
        </div>
      </div>
    </div>
  );
}
