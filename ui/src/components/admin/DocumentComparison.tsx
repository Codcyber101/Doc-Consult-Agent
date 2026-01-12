'use client';

import React from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Edit3, 
  Eye, 
  ExternalLink,
  ShieldAlert
} from 'lucide-react';

interface DocumentComparisonProps {
  documentId: string;
  onApprove: () => void;
  onReject: (reason: string) => void;
}

export function DocumentComparison({ documentId, onApprove, onReject }: DocumentComparisonProps) {
  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-200px)] gap-8">
      {/* Original Document View */}
      <div className="flex-1 bg-slate-200 rounded-3xl overflow-hidden flex flex-col border border-gray-200 shadow-inner">
        <div className="bg-slate-800 text-white p-4 flex items-center justify-between px-6">
          <div className="flex items-center space-x-2">
            <Eye size={18} />
            <span className="font-bold text-sm uppercase tracking-widest">Original Scan</span>
          </div>
          <button className="text-slate-400 hover:text-white transition-colors">
            <ExternalLink size={18} />
          </button>
        </div>
        <div className="flex-1 flex items-center justify-center p-10">
          <div className="w-full h-full bg-white shadow-2xl rounded-lg flex items-center justify-center text-gray-300 italic font-medium">
            [ Document Viewer - PDF/JPG Preview ]
          </div>
        </div>
      </div>

      {/* Extracted Metadata View */}
      <div className="w-full lg:w-[450px] flex flex-col space-y-6">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex-1 overflow-auto">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Edit3 className="w-5 h-5 text-blue-600 mr-2" />
            Verification Data
          </h3>

          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Company Name</label>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <span className="font-bold text-gray-900">Ethio SME Corp</span>
                <CheckCircle2 size={18} className="text-green-500" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 text-red-500">Stamp Detection</label>
              <div className="flex items-center justify-between p-4 bg-red-50 rounded-2xl border border-red-100 ring-2 ring-red-500 ring-offset-2">
                <span className="font-bold text-red-900 italic">Not Found</span>
                <ShieldAlert size={18} className="text-red-500" />
              </div>
              <p className="mt-2 text-xs font-medium text-red-600">Reviewer must visually confirm stamp presence on page 2.</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">TIN Number</label>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <span className="font-bold text-gray-900">0012345678</span>
                <CheckCircle2 size={18} className="text-green-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-lg flex space-x-4">
          <button 
            onClick={() => onReject('Missing mandatory stamp')}
            className="flex-1 py-4 px-6 border border-gray-200 rounded-2xl font-bold text-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all flex items-center justify-center space-x-2"
          >
            <XCircle size={20} />
            <span>Reject</span>
          </button>
          <button 
            onClick={onApprove}
            className="flex-1 py-4 px-6 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all flex items-center justify-center space-x-2"
          >
            <CheckCircle2 size={20} />
            <span>Sign & Approve</span>
          </button>
        </div>
      </div>
    </div>
  );
}
