'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload as UploadIcon, File, X, ShieldCheck, AlertCircle } from 'lucide-react';

interface UploadProps {
  onUpload: (file: File) => void;
  accept?: string;
  label?: string;
}

export function Upload({ onUpload, accept = 'image/*,application/pdf', label = 'Document' }: UploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      onUpload(selectedFile);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFile = e.dataTransfer.files[0];
      setFile(selectedFile);
      onUpload(selectedFile);
    }
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!file ? (
          <motion.div 
            key="empty"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`
              cursor-pointer relative overflow-hidden rounded-[2rem] border-2 border-dashed p-10 transition-all duration-500 flex flex-col items-center justify-center text-center group
              ${isDragging 
                ? 'border-sovereign-green bg-sovereign-green/5 ring-4 ring-sovereign-green/10' 
                : 'border-gray-200 hover:border-sovereign-gold hover:bg-surface'}
            `}
          >
            <input 
              type="file" 
              ref={inputRef} 
              onChange={handleFileChange} 
              accept={accept} 
              className="hidden" 
            />
            
            <div className={`
              w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500
              ${isDragging ? 'bg-sovereign-green text-white rotate-12 scale-110' : 'bg-sovereign-sand text-sovereign-green group-hover:bg-sovereign-gold group-hover:text-white'}
            `}>
              <UploadIcon className="w-8 h-8" />
            </div>
            
            <div className="space-y-1">
              <p className="text-xl font-black tracking-tight text-gray-900">
                Archive your <span className="text-sovereign-green italic">{label}</span>
              </p>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-widest">
                Drag and drop or click to browse
              </p>
            </div>

            <div className="mt-8 flex gap-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
              <span className="px-2 py-1 rounded bg-gray-100 border border-gray-200">PDF</span>
              <span className="px-2 py-1 rounded bg-gray-100 border border-gray-200">PNG</span>
              <span className="px-2 py-1 rounded bg-gray-100 border border-gray-200">JPG</span>
            </div>

            {/* Subtle background motif */}
            <div className="absolute -bottom-4 -right-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
              <UploadIcon size={120} />
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="filled"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-surface border-2 border-sovereign-green p-6 rounded-[2rem] flex items-center justify-between shadow-sovereign"
          >
            <div className="flex items-center overflow-hidden gap-4">
              <div className="w-14 h-14 bg-sovereign-green/10 rounded-2xl flex items-center justify-center flex-shrink-0 text-sovereign-green">
                <File className="w-7 h-7" />
              </div>
              <div className="overflow-hidden">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-black text-gray-900 truncate uppercase tracking-tight">{file.name}</p>
                  <ShieldCheck className="w-4 h-4 text-sovereign-green flex-shrink-0" />
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                  <span className="w-1 h-1 rounded-full bg-gray-200" />
                  <p className="text-[10px] font-bold text-sovereign-green uppercase tracking-widest">
                    Ready for analysis
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setFile(null)}
                className="w-10 h-10 flex items-center justify-center bg-gray-50 text-gray-400 hover:bg-sovereign-red/10 hover:text-sovereign-red rounded-full transition-all group"
                title="Remove file"
              >
                <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
