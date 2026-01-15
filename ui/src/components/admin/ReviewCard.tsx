'use client';

import React from 'react';
import { 
  FileText, 
  AlertCircle, 
  ChevronRight,
  Clock,
  Fingerprint
} from 'lucide-react';
import { motion } from 'framer-motion';

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
    <motion.div 
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => onClick(item.id)}
      className="group bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:border-sovereign-green transition-all duration-500 cursor-pointer relative overflow-hidden"
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-8 relative z-10">
        <div className="flex items-center gap-8 w-full sm:w-auto">
          <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-inner transition-all duration-500 ${item.status === 'IN_PROGRESS' ? 'bg-sovereign-green text-white rotate-3' : 'bg-sovereign-sand text-sovereign-slate'}`}>
            <Fingerprint size={28} />
          </div>
          
          <div>
            <div className="flex items-center gap-4 mb-1">
              <h3 className="font-black text-sovereign-slate text-xl uppercase tracking-tight">{item.documentType}</h3>
              <span className={`px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase border ${
                item.status === 'IN_PROGRESS' ? 'bg-sovereign-green/10 border-sovereign-green/20 text-sovereign-green' : 'bg-sovereign-gold/10 border-sovereign-gold/20 text-sovereign-gold'
              }`}>
                {item.status}
              </span>
            </div>
            
            <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-gray-400">
              <span className="flex items-center gap-2">
                <Clock size={12} className="text-sovereign-gold" />
                Transmission: {item.submittedAt}
              </span>
              <span className="flex items-center gap-2 hidden lg:flex">
                <FileText size={12} />
                ID: {item.id}
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1 px-8 border-l border-gray-50 hidden xl:block">
          <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-2">Policy Escalation</p>
          <p className="text-sm font-bold text-sovereign-red leading-relaxed line-clamp-1 italic">
            "{item.reason}"
          </p>
        </div>

        <div className="flex items-center gap-8 w-full sm:w-auto justify-between sm:justify-end">
          <div className="text-right">
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 leading-none">Applicant</p>
            <p className="text-sm font-black text-sovereign-slate uppercase tracking-tight leading-none">{item.user}</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-sovereign-sand flex items-center justify-center text-gray-400 group-hover:bg-sovereign-slate group-hover:text-white transition-all shadow-sm">
            <ChevronRight size={24} />
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none group-hover:opacity-[0.05] transition-opacity">
        <AlertCircle size={140} />
      </div>
    </motion.div>
  );
}