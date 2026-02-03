'use client';

import React, { useState } from 'react';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Info,
  ShieldCheck,
  Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function Step1Page() {
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<{ name: string; size: string; status: 'analyzing' | 'ready' | 'error' } | null>(null);

  const simulateUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setFile({ name: 'Business_Certificate_2025.pdf', size: '1.2 MB', status: 'analyzing' });
      setIsUploading(false);
      
      setTimeout(() => {
        setFile(prev => prev ? { ...prev, status: 'ready' } : null);
      }, 2000);
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Instructions & Action */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 font-black uppercase tracking-widest text-[10px]">Step 01 / 05</Badge>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight font-display mb-6">
                Upload your <span className="text-primary">Old Trade License</span>
              </h1>
              <p className="text-lg text-slate-500 font-medium leading-relaxed">
                To begin your renewal, we need to analyze your existing license. Our AI will automatically extract the details to save you time.
              </p>
            </div>

            <Card className="p-8 border-2 border-dashed border-border bg-surface-muted/60 hover:bg-surface hover:border-primary/30 transition-all group">
               {!file && !isUploading ? (
                 <div className="flex flex-col items-center text-center py-10">
                    <div className="w-16 h-16 bg-surface rounded-2xl flex items-center justify-center shadow-md mb-6 group-hover:scale-110 transition-transform text-primary">
                      <Upload className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-black text-slate-900 mb-2">Click to upload or drag & drop</h3>
                    <p className="text-sm text-slate-400 font-bold uppercase tracking-tighter mb-8">PDF, PNG, or JPG (Max 10MB)</p>
                    <Button onClick={simulateUpload} variant="outline" className="rounded-2xl border-2 border-border">Select Document</Button>
                 </div>
               ) : (
                 <div className="space-y-6">
                    <div className="flex items-center gap-4 p-4 bg-surface rounded-2xl border border-border shadow-sm">
                       <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                          <FileText className="w-6 h-6" />
                       </div>
                       <div className="flex-1 min-w-0">
                          <p className="text-sm font-black text-slate-900 truncate">{file?.name}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{file?.size}</p>
                       </div>
                       <button onClick={() => setFile(null)} className="text-xs font-black text-red-500 uppercase tracking-tighter hover:underline">Remove</button>
                    </div>

                    <AnimatePresence mode="wait">
                      {isUploading || file?.status === 'analyzing' ? (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="space-y-3"
                        >
                           <div className="flex items-center justify-between">
                              <span className="text-xs font-black text-primary uppercase tracking-widest flex items-center gap-2">
                                <span className="flex h-2 w-2 rounded-full bg-primary animate-ping"></span>
                                Analyzing Content...
                              </span>
                              <span className="text-xs font-bold text-slate-400 italic">Expected: 15s</span>
                           </div>
                           <div className="w-full h-1.5 bg-surface-muted rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: "70%" }}
                                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                                className="h-full bg-primary rounded-full"
                              />
                           </div>
                        </motion.div>
                      ) : file?.status === 'ready' ? (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-primary/10 rounded-2xl p-4 flex items-start gap-3 border border-primary/20"
                        >
                           <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                           <div>
                              <p className="text-sm font-black text-slate-900 leading-tight mb-1">Analysis Complete</p>
                              <p className="text-xs font-medium text-slate-700">We&apos;ve extracted your License Number, Business Name, and Expiry Date successfully.</p>
                           </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                 </div>
               )}
            </Card>

            <div className="bg-slate-900 rounded-[2rem] p-6 text-white flex items-center gap-4 border-l-4 border-gold-500 shadow-xl">
               <Info className="w-10 h-10 text-gold-500 shrink-0" />
               <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gold-500 mb-1">Tip for Citizens</p>
                  <p className="text-sm font-medium text-slate-300">Make sure the document is well-lit and all four corners are visible for the best analysis results.</p>
               </div>
            </div>
          </div>

          {/* Right Column: Preview / Side Panel */}
          <div className="lg:col-span-7 h-full">
            <div className="bg-surface-muted rounded-[2.5rem] border-2 border-border min-h-[500px] flex flex-col overflow-hidden relative group">
               
               {file?.status === 'ready' ? (
                 <>
                   <div className="absolute top-6 left-6 z-10">
                      <Badge className="bg-slate-900 text-white border-none shadow-lg py-1.5 px-3 flex items-center gap-2">
                         <Eye className="w-3 h-3 text-primary" />
                         <span className="text-[9px] font-black uppercase tracking-widest">Document Preview</span>
                      </Badge>
                   </div>
                   
                   {/* Mock Document Preview Content */}
                   <div className="flex-1 bg-surface m-4 rounded-[1.5rem] shadow-inner flex flex-col p-12 overflow-hidden">
                      <div className="w-full max-w-md mx-auto space-y-8 opacity-40 select-none">
                         <div className="flex justify-between items-start">
                            <div className="w-16 h-16 bg-surface-muted rounded-full"></div>
                            <div className="space-y-2 text-right">
                               <div className="h-4 w-32 bg-surface-muted rounded ml-auto"></div>
                               <div className="h-3 w-48 bg-surface-muted rounded ml-auto"></div>
                            </div>
                         </div>
                         <div className="h-8 w-64 bg-surface-muted rounded"></div>
                         <div className="space-y-4">
                            <div className="h-4 w-full bg-surface-muted rounded"></div>
                            <div className="h-4 w-full bg-surface-muted rounded"></div>
                            <div className="h-4 w-3/4 bg-surface-muted rounded"></div>
                         </div>
                         <div className="grid grid-cols-2 gap-8 pt-8 border-t border-border/60">
                            <div className="space-y-3">
                               <div className="h-3 w-20 bg-surface-muted rounded"></div>
                               <div className="h-4 w-32 bg-surface-muted rounded"></div>
                            </div>
                            <div className="space-y-3 text-right">
                               <div className="h-3 w-20 bg-surface-muted rounded ml-auto"></div>
                               <div className="h-4 w-32 bg-surface-muted rounded ml-auto"></div>
                            </div>
                         </div>
                      </div>
                      
                      {/* OCR Highlighting Overlays */}
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 pointer-events-none"
                      >
                         <div className="absolute top-[185px] left-[78px] w-[260px] h-[35px] bg-primary/10 border-2 border-primary/30 rounded-lg backdrop-blur-[1px]"></div>
                         <div className="absolute top-[310px] left-[78px] w-[140px] h-[25px] bg-primary/10 border-2 border-primary/30 rounded-lg backdrop-blur-[1px]"></div>
                      </motion.div>
                   </div>
                 </>
               ) : (
                 <div className="flex-1 flex flex-col items-center justify-center text-slate-400 px-12 text-center">
                    <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center mb-6 border border-border">
                       <Eye className="w-8 h-8 opacity-20" />
                    </div>
                    <p className="text-lg font-black uppercase tracking-widest opacity-30">Preview Area</p>
                    <p className="text-sm font-medium mt-2 max-w-xs italic">Upload a document to see the automated extraction in real-time.</p>
                 </div>
               )}

               {/* Decorative floating elements */}
               <div className="absolute bottom-4 right-4 bg-surface/80 backdrop-blur shadow-sm border border-border rounded-2xl py-2 px-4 flex items-center gap-3">
                  <div className="flex -space-x-2">
                     {[1,2,3].map(i => (
                       <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-surface-muted flex items-center justify-center text-[8px] font-black text-slate-400">
                          {i}
                       </div>
                     ))}
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">12 Citizens Uploading</span>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Footer for Navigation */}
      <footer className="sticky bottom-0 bg-surface border-t border-border py-6 px-4 shadow-[0_-10px_30px_rgba(0,0,0,0.02)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
           <Button variant="ghost" className="rounded-2xl font-black text-slate-400">Back</Button>
           <div className="flex items-center gap-4">
              <p className="hidden sm:block text-[11px] font-black text-slate-400 uppercase tracking-widest">Saving Automatically...</p>
              <Link href="/flows/trade-license/step-2">
                <Button disabled={file?.status !== 'ready'} size="lg" className="rounded-2xl group min-w-[180px]">
                  Continue <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
           </div>
        </div>
      </footer>
    </div>
  );
}
