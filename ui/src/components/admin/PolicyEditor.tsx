'use client';

import React, { useState } from 'react';
import { 
  Save, 
  Play, 
  History, 
  CheckCircle2, 
  AlertCircle,
  FileCode,
  X
} from 'lucide-react';

const MOCK_YAML = `version: "2.4.0"
jurisdiction: "Addis Ababa / Bole"
flow: "Trade License Renewal"

steps:
  - id: "s1"
    title: "Document Collection"
    requirements:
      - title: "Existing Trade License"
        mandatory: true
      - title: "TIN Certificate"
        mandatory: true
  
  - id: "s2"
    title: "Fee Payment"
    fee_etb: 1500
    office: "Sub-city Finance Bureau"
`;

export function PolicyEditor({ onSave, onClose }: { onSave: (val: string) => void, onClose: () => void }) {
  const [content, setContent] = useState(MOCK_YAML);
  const [isTesting, setIsSyncing] = useState(false);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900 flex flex-col">
      {/* Editor Header */}
      <header className="h-20 bg-slate-800 border-b border-slate-700 flex items-center justify-between px-8">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
            <FileCode size={24} />
          </div>
          <div>
            <h2 className="text-white font-bold">trade-license.yaml</h2>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Editing Draft v2.4.1</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setIsSyncing(true)}
            className="flex items-center space-x-2 px-6 py-2.5 bg-slate-700 text-slate-200 rounded-xl font-bold hover:bg-slate-600 transition-all border border-slate-600"
          >
            <Play size={18} />
            <span>Run Compliance Tests</span>
          </button>
          
          <div className="h-8 w-px bg-slate-700 mx-2" />

          <button 
            onClick={() => onSave(content)}
            className="flex items-center space-x-2 px-8 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-900/40 transition-all"
          >
            <Save size={18} />
            <span>Save & Create PR</span>
          </button>

          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>
      </header>

      {/* Editor Main */}
      <div className="flex-1 flex overflow-hidden">
        {/* Editor Pane (Simplified for now) */}
        <div className="flex-1 bg-slate-900 p-8 font-mono text-slate-300 text-sm leading-relaxed overflow-auto">
          <textarea 
            className="w-full h-full bg-transparent outline-none resize-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            spellCheck={false}
          />
        </div>

        {/* Info/Validation Pane */}
        <div className="w-96 bg-slate-800 border-l border-slate-700 p-8 space-y-8 overflow-auto">
          <div>
            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">Schema Validation</h3>
            <div className="flex items-center space-x-3 text-green-400 bg-green-400/10 p-4 rounded-2xl border border-green-400/20 text-sm">
              <CheckCircle2 size={18} />
              <span className="font-bold">YAML Syntax Correct</span>
            </div>
          </div>

          <div>
            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">Dependencies</h3>
            <div className="space-y-3">
              {['Compliant with Proc. 1205/2020', 'Linked to MESOB-API-v2'].map((dep, i) => (
                <div key={i} className="flex items-center space-x-3 text-slate-300 bg-slate-700/50 p-3 rounded-xl text-xs font-medium">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                  <span>{dep}</span>
                </div>
              ))}
            </div>
          </div>

          {isTesting && (
            <div className="animate-in slide-in-from-right duration-300">
              <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">Test Results</h3>
              <div className="bg-slate-900 rounded-2xl p-4 space-y-4 border border-slate-700 shadow-xl">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Test Case: SME Renewal</span>
                  <span className="text-green-400 font-bold">PASSED</span>
                </div>
                <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-green-500" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}