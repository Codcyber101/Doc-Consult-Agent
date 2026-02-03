import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { FileText, RefreshCw, Eye, AlertCircle } from 'lucide-react';

interface DocumentCardProps {
  title: string;
  status: 'pending' | 'analyzing' | 'valid' | 'invalid' | 'missing';
  thumbnailUrl?: string;
  readinessScore?: number;
  errorMessage?: string;
  onReplace?: () => void;
  onView?: () => void;
  className?: string;
}

export const DocumentCard = ({ 
  title, 
  status, 
  thumbnailUrl, 
  readinessScore, 
  errorMessage,
  onReplace, 
  onView,
  className 
}: DocumentCardProps) => {
  
  const getStatusBadge = () => {
    switch (status) {
      case 'valid': return <Badge variant="success">Verified</Badge>;
      case 'analyzing': return <Badge variant="warning">Analyzing...</Badge>;
      case 'invalid': return <Badge variant="error">Action Required</Badge>;
      case 'pending': return <Badge variant="neutral">Pending</Badge>;
      case 'missing': return <Badge variant="neutral">Required</Badge>;
      default: return null;
    }
  };

  return (
    <div className={cn("group relative flex flex-col rounded-xl border border-border bg-surface overflow-hidden shadow-sm-soft transition-all hover:shadow-md-soft", className)}>
      
      {/* Preview Area */}
      <div className="relative aspect-[3/2] bg-surface-muted flex items-center justify-center border-b border-border/60">
        {thumbnailUrl ? (
          <Image
            src={thumbnailUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 420px"
            className="object-cover"
          />
        ) : (
          <FileText className="h-10 w-10 text-slate-300" />
        )}
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
           {onView && (
             <Button variant="ghost" size="sm" onClick={onView} className="bg-surface/90 hover:bg-surface shadow-sm">
               <Eye className="h-4 w-4 mr-1" /> View
             </Button>
           )}
        </div>
      </div>

      {/* Info Area */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-slate-900 text-sm line-clamp-1" title={title}>{title}</h3>
          {getStatusBadge()}
        </div>
        
        {/* OCR Score or Error */}
        <div className="mt-auto">
          {status === 'invalid' && errorMessage && (
             <div className="flex items-start gap-1.5 text-xs text-danger mt-2">
                <AlertCircle className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                <span>{errorMessage}</span>
             </div>
          )}
          
          {status === 'valid' && readinessScore !== undefined && (
            <div className="mt-2">
              <div className="flex justify-between text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">
                 <span>Legibility</span>
                 <span>{readinessScore}%</span>
              </div>
              <div className="h-1.5 w-full bg-surface-muted rounded-full overflow-hidden">
                <div 
                   className={cn("h-full rounded-full", readinessScore > 80 ? "bg-primary" : "bg-gold-500")} 
                   style={{ width: `${readinessScore}%` }} 
                />
              </div>
            </div>
          )}
          
          {/* Action Button */}
          {(status === 'missing' || status === 'invalid' || status === 'valid') && onReplace && (
             <Button 
               variant="outline" 
               size="sm" 
               onClick={onReplace} 
               className="w-full mt-3 h-8 text-xs"
               leftIcon={<RefreshCw className="h-3 w-3" />}
             >
               {status === 'missing' ? 'Upload' : 'Replace'}
             </Button>
          )}
        </div>
      </div>
    </div>
  );
};
