'use client';

import { useEffect, useState } from 'react';
import i18n from '@/lib/i18n';

export function I18nInitializer({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only run on client
    const saved = localStorage.getItem('i18nextLng');
    if (saved && (saved === 'en' || saved === 'am')) {
      if (i18n.language !== saved) {
        i18n.changeLanguage(saved);
      }
    }
    setMounted(true);
  }, []);

  // We still render children immediately, but i18n will switch language in useEffect.
  // This might cause a slight flicker but avoids hydration mismatch.
  return <>{children}</>;
}