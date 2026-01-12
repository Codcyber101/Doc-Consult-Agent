'use client';

import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, RefreshCw, CheckCircle2 } from 'lucide-react';

export function SyncStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Mock sync behavior
    if (isOnline) {
      setIsSyncing(true);
      const timer = setTimeout(() => setIsSyncing(false), 2000);
      return () => clearTimeout(timer);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [isOnline]);

  return (
    <div className={`
      fixed bottom-6 right-6 px-4 py-2 rounded-2xl shadow-lg border transition-all flex items-center space-x-3
      ${isOnline ? 'bg-white border-gray-100' : 'bg-red-50 border-red-100'}
    `}>
      {isSyncing ? (
        <>
          <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />
          <span className="text-xs font-bold text-gray-600">Syncing data...</span>
        </>
      ) : isOnline ? (
        <>
          <CheckCircle2 className="w-4 h-4 text-green-500" />
          <span className="text-xs font-bold text-gray-600">Synced & Secure</span>
        </>
      ) : (
        <>
          <WifiOff className="w-4 h-4 text-red-500" />
          <span className="text-xs font-bold text-red-700">Working Offline</span>
        </>
      )}
    </div>
  );
}
