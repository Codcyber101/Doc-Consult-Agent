'use client';

import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, RefreshCw, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function SyncStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    if (isOnline) {
      setIsSyncing(true);
      const timer = setTimeout(() => setIsSyncing(false), 3000);
      return () => clearTimeout(timer);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [isOnline]);

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] pointer-events-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={isOnline ? (isSyncing ? 'syncing' : 'online') : 'offline'}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          className={`
            px-6 py-3 rounded-full shadow-2xl border flex items-center gap-3 backdrop-blur-md pointer-events-auto
            ${isOnline 
              ? 'bg-sovereign-slate/90 text-white border-white/10' 
              : 'bg-sovereign-red text-white border-white/20'}
          `}
        >
          {isSyncing ? (
            <RefreshCw className="w-4 h-4 text-sovereign-gold animate-spin" />
          ) : isOnline ? (
            <ShieldCheck className="w-4 h-4 text-sovereign-green" />
          ) : (
            <WifiOff className="w-4 h-4 text-white" />
          )}
          
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] leading-none mb-0.5 opacity-60">
              Sovereign Sync
            </span>
            <span className="text-xs font-bold leading-none">
              {isSyncing ? 'Synchronizing Archive...' : isOnline ? 'System Secure & Synced' : 'Offline Mode Active'}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}