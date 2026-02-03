'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/common/Button';
import { WizardProgress } from '@/components/common/WizardProgress';
import { X, Save, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function WizardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Mock progress calculation based on path
  // In a real app, this would be derived from the flow state
  const getProgress = () => {
    if (pathname.includes('step-1')) return 20;
    if (pathname.includes('step-2')) return 40;
    if (pathname.includes('step-3')) return 60;
    if (pathname.includes('step-4')) return 80;
    if (pathname.includes('review')) return 95;
    return 10;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Wizard Header - Focus Mode */}
      <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex items-center gap-4">
              <Link href="/" className="p-2 hover:bg-surface-muted rounded-xl transition-colors text-slate-400 hover:text-slate-900">
                <X className="h-5 w-5" />
              </Link>
              <div className="h-6 w-[1px] bg-border hidden sm:block"></div>
              <div className="hidden sm:block">
                <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] leading-none mb-1">Application</p>
                <h2 className="text-sm font-black text-slate-900 leading-none">Trade License Renewal</h2>
              </div>
            </div>

            <div className="flex-1 max-w-md mx-8 hidden md:block">
               <WizardProgress progress={getProgress()} />
            </div>

            <div className="flex items-center gap-2">
               <Button variant="ghost" size="sm" className="hidden sm:flex text-slate-500 font-bold gap-2">
                  <Save className="h-4 w-4" />
                  Save & Exit
               </Button>
               <div className="h-8 w-8 rounded-full bg-surface-muted flex items-center justify-center text-slate-400 hover:text-primary cursor-pointer transition-colors">
                  <HelpCircle className="h-4 w-4" />
               </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Progress Bar */}
        <div className="md:hidden w-full bg-surface-muted h-1">
           <motion.div 
             initial={{ width: 0 }}
             animate={{ width: `${getProgress()}%` }}
             className="h-full bg-primary"
           />
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex-1 flex flex-col"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer is usually handled within the steps to allow for dynamic actions */}
    </div>
  );
}
