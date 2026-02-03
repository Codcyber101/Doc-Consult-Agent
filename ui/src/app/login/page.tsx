'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Fingerprint, Smartphone, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/common/Input';

export default function LoginPage() {
  const [method, setMethod] = useState<'id' | 'mobile'>('id');

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 selection:bg-primary selection:text-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 bg-mesh opacity-20 pointer-events-none" />
      <div className="fixed inset-0 grain opacity-5 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full z-10"
      >
        <div className="text-center mb-10">
           <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow-primary">
              <Shield className="w-8 h-8 text-white" />
           </div>
           <h1 className="text-3xl font-display font-bold text-white tracking-tight uppercase">
             GovAssist <span className="text-primary italic">Ethiopia</span>
           </h1>
           <p className="text-slate-400 mt-2 font-medium">National Gateway Authentication Portal</p>
        </div>

        <div className="bg-surface rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
           <div className="relative z-10">
              <div className="flex bg-surface-muted p-1 rounded-2xl mb-8">
                 <button 
                   onClick={() => setMethod('id')}
                   className={`flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${method === 'id' ? 'bg-surface text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                 >
                    National ID
                 </button>
                 <button 
                   onClick={() => setMethod('mobile')}
                   className={`flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${method === 'mobile' ? 'bg-surface text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                 >
                    Mobile e-ID
                 </button>
              </div>

              <div className="space-y-6">
                 {method === 'id' ? (
                   <>
                      <Input label="Digital ID Number" placeholder="ET-ID-XXXX-XXXX" leftIcon={<Fingerprint className="w-4 h-4" />} />
                      <Input label="Access Passcode" type="password" leftIcon={<Lock className="w-4 h-4" />} />
                   </>
                 ) : (
                   <>
                      <Input label="Registered Mobile Number" placeholder="+251 ..." leftIcon={<Smartphone className="w-4 h-4" />} />
                      <p className="text-[10px] text-slate-400 font-medium text-center">A 6-digit secure token will be sent via SMS.</p>
                   </>
                 )}

                 <Button className="w-full h-14 rounded-2xl bg-primary hover:bg-primary-dark text-white font-bold gap-2 shadow-glow-primary mt-4">
                    Enter Gateway <ArrowRight className="w-4 h-4" />
                 </Button>
              </div>

              <div className="mt-10 pt-8 border-t border-border flex items-center justify-between">
                 <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">Forgot Credentials?</button>
                 <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">New Registration</button>
              </div>
           </div>
           <div className="absolute inset-0 grain opacity-[0.02] pointer-events-none" />
        </div>

        <div className="mt-8 flex items-center justify-center gap-6">
           <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3 h-3 text-primary" />
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">ISO 27001 Certified</span>
           </div>
           <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3 h-3 text-primary" />
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">HSM Encrypted</span>
           </div>
        </div>
      </motion.div>
    </div>
  );
}
