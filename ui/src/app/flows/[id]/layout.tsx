import React from 'react';
import { Button } from '@/components/common/Button';
import { Shield, X } from 'lucide-react';
import Link from 'next/link';

export default function FlowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      
      {/* Focus Header */}
      <header className="bg-white border-b border-slate-200 h-16 sticky top-0 z-40 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-500">
          <Shield className="w-5 h-5 text-emerald-600" />
          <span className="text-sm font-medium hidden sm:inline-block">GovAssist Secure Environment</span>
        </div>

        {/* Mock Progress - In real app this would be dynamic */}
        <div className="flex-1 max-w-xs mx-4 hidden sm:block">
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 w-[35%] rounded-full" />
          </div>
          <p className="text-xs text-center mt-1 text-slate-500">Step 2 of 5</p>
        </div>

        <Link href="/">
          <Button variant="ghost" size="sm" rightIcon={<X className="w-4 h-4" />}>
            Save & Exit
          </Button>
        </Link>
      </header>

      {/* Main Content Area - Narrower width for focus */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {children}
      </main>

      {/* Mobile Sticky Footer Placeholder (if needed by children) */}
    </div>
  );
}
