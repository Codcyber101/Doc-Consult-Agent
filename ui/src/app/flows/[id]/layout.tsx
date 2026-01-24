import React from 'react';
import { Button } from '@/components/common/Button';
import { X, Save } from 'lucide-react';
import Link from 'next/link';

export default async function FlowLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Wizard Header - Focused Mode */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 h-16 shadow-sm-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 -ml-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
              <X className="h-6 w-6" />
              <span className="sr-only">Exit</span>
            </Link>
            <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>
            <div className="flex flex-col">
               <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Application</span>
               <span className="text-sm font-bold text-slate-900 leading-none">Trade License</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 hidden sm:inline-block">Auto-saved 2 mins ago</span>
            <Button variant="outline" size="sm" className="hidden sm:flex" leftIcon={<Save className="h-4 w-4" />}>
              Save & Exit
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-white rounded-2xl shadow-sm-soft border border-slate-200 min-h-[600px] p-6 sm:p-8 lg:p-10">
           {children}
        </div>
      </main>

      {/* Mobile Footer Actions (Sticky) */}
      <div className="sm:hidden sticky bottom-0 bg-white border-t border-slate-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline">Back</Button>
          <Button variant="primary">Next</Button>
        </div>
      </div>
    </div>
  );
}