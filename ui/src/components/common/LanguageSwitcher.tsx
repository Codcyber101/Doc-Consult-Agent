'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const languages = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'am', name: 'Amharic', native: 'አማርኛ' },
];

export const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [currentLang, setCurrentLang] = React.useState('en');

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-slate-100 transition-colors text-slate-600 hover:text-slate-900 border border-transparent hover:border-slate-200"
      >
        <Globe className="h-4 w-4" />
        <span className="text-sm font-bold uppercase tracking-wider">{currentLang}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-20"
            >
              <div className="p-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setCurrentLang(lang.code);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-colors",
                      currentLang === lang.code 
                        ? "bg-emerald-50 text-emerald-700 font-bold" 
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    <div className="flex flex-col items-start">
                      <span className="font-display">{lang.native}</span>
                      <span className="text-[10px] opacity-60 uppercase tracking-tighter">{lang.name}</span>
                    </div>
                    {currentLang === lang.code && <Check className="h-4 w-4" />}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
