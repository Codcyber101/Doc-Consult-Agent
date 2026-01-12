'use client';

import React, { useState, useRef } from 'react';
import { Upload as UploadIcon, File, X, CheckCircle2 } from 'lucide-react';

interface UploadProps {
  onUpload: (file: File) => void;
  accept?: string;
}

export function Upload({ onUpload, accept = 'image/*,application/pdf' }: UploadProps) {
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
      {!file ? (
        <div 
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`
            cursor-pointer border-2 border-dashed rounded-3xl p-8 transition-all flex flex-col items-center justify-center text-center
            ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-400 hover:bg-gray-50'}
          `}
        >
          <input 
            type="file" 
            ref={inputRef} 
            onChange={handleFileChange} 
            accept={accept} 
            className="hidden" 
          />
          <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
            <UploadIcon className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-gray-900 font-bold mb-1">Click or drag to upload</p>
          <p className="text-sm text-gray-500">PDF, PNG, or JPG (Max 10MB)</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center overflow-hidden">
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <File className="w-5 h-5 text-green-600" />
            </div>
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-bold text-gray-900 truncate">{file.name}</p>
              <p className="text-xs text-gray-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
            </div>
          </div>
          <div className="flex items-center ml-4">
            <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
            <button 
              onClick={() => setFile(null)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}