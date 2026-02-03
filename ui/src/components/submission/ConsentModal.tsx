'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Lock, AlertCircle, X, FileSignature } from 'lucide-react';

interface ConsentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function ConsentModal({ isOpen, onClose, onConfirm }: ConsentModalProps) {
  const [agreed, setAgreed] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
          />
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-surface w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden relative z-10 border border-white/20"
          >
            <div className="p-8 border-b border-border flex items-center justify-between bg-surface-muted/60">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                  <FileSignature className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-black tracking-tight text-slate-900 uppercase">Sovereign Consent</h2>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Sovereign Data processing</p>
                </div>
              </div>
              <button 
                onClick={onClose} 
                className="w-10 h-10 flex items-center justify-center bg-surface border border-border rounded-full hover:bg-surface-muted transition-colors group"
              >
                <X className="w-5 h-5 text-gray-400 group-hover:rotate-90 transition-transform" />
              </button>
            </div>

            <div className="p-10 space-y-8">
              <div className="flex items-start gap-5 p-6 bg-primary/5 rounded-3xl border border-primary/10">
                <Lock className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <p className="text-sm text-slate-800 leading-relaxed font-semibold">
                  Archive data is cryptographically anchored to Ethiopian sovereign infrastructure. 
                  Zero-Knowledge protocols ensure your PII never exits authorized bureau boundaries.
                </p>
              </div>

              <div className="space-y-5">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Authorized Operations:</p>
                <ul className="space-y-4">
                  {[
                    'Automated policy compliance verification',
                    'PII extraction for official bureau submission',
                    'Asynchronous transmission via MESOB Gateway',
                    'Cryptographic audit trail anchoring'
                  ].map((auth, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                      <ShieldCheck className="w-4 h-4 text-gold-500" />
                      {auth}
                    </li>
                  ))}
                </ul>
              </div>

              <label className="flex items-start gap-4 p-6 bg-surface-muted rounded-3xl cursor-pointer border-2 border-transparent hover:border-gold-500/20 transition-all group">
                <div className="relative flex items-center mt-1">
                  <input 
                    type="checkbox" 
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="peer h-6 w-6 cursor-pointer appearance-none rounded-lg border-2 border-border bg-surface checked:border-primary checked:bg-primary transition-all focus:outline-none"
                  />
                  <ShieldCheck className="absolute h-4 w-4 text-white opacity-0 peer-checked:opacity-100 left-1 transition-opacity pointer-events-none" />
                </div>
                <span className="text-sm font-black text-slate-900 leading-tight uppercase tracking-tight group-hover:text-slate-900 transition-colors">
                  I ratify the data processing agreement and authorize sovereign archival transmission.
                </span>
              </label>
            </div>

            <div className="p-8 bg-slate-900 flex gap-4">
              <button 
                onClick={onClose}
                className="flex-1 px-8 py-5 bg-white/5 border border-white/10 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] text-white hover:bg-white/10 transition-all"
              >
                Retract
              </button>
              <button 
                disabled={!agreed}
                onClick={onConfirm}
                className="flex-[2] px-8 py-5 bg-primary text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-primary-dark disabled:opacity-30 disabled:grayscale transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2"
              >
                Agree & Initialize Submission
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
