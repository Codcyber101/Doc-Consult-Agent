import React from 'react';

export const DiffViewer: React.FC = () => {
  return (
    <div className="mt-8 p-6 bg-surface-muted border border-border rounded-2xl">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-bold text-slate-900">Version Comparison</h4>
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Draft v2.4.1</span>
      </div>
      <div className="grid grid-cols-2 gap-4 text-xs font-mono">
        <div className="p-3 bg-red-50 text-red-700 line-through rounded-lg border border-red-100">
          - fee: 500
        </div>
        <div className="p-3 bg-green-50 text-green-700 rounded-lg border border-green-100">
          + fee: 550
        </div>
      </div>
    </div>
  );
};
