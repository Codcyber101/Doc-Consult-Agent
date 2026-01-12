'use client';

import React from 'react';
import { 
  FileText, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  ChevronRight,
  Clock,
  Eye
} from 'lucide-react';

interface ReviewItem {
  id: string;
  documentType: string;
  reason: string;
  submittedAt: string;
  user: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
}

interface ReviewCardProps {
  item: ReviewItem;
  onClick: (id: string) => void;
}

export function ReviewCard({ item, onClick }: ReviewCardProps) {
  return (
    <div 
      onClick={() => onClick(item.id)}
      className="group bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all cursor-pointer flex items-center justify-between"
    >
      <div className="flex items-center space-x-6">
        <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
          <FileText size={28} />
        </div>
        
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <h3 className="font-bold text-gray-900 text-lg">{item.documentType}</h3>
            <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full uppercase tracking-wider">
              {item.status}
            </span>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center">
              <Clock size={14} className="mr-1.5" />
              {item.submittedAt}
            </span>
            <span className="flex items-center">
              <AlertCircle size={14} className="mr-1.5 text-amber-500" />
              {item.reason}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="text-right hidden sm:block">
          <p className="text-xs font-bold text-gray-400 uppercase">Applicant</p>
          <p className="text-sm font-bold text-gray-900">{item.user}</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
          <ChevronRight size={20} />
        </div>
      </div>
    </div>
  );
}
