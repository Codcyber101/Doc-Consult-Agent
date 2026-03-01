'use client';

import React from 'react';
import { 
  Cpu, 
  Fingerprint, 
  ExternalLink, 
  CheckCircle2, 
  XCircle,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { apiClient } from "@/lib/api/client";

interface AuditLog {
  id: string;
  timestamp: string;
  event_type: string;
  actor: string;
  details: any;
  signature: string;
  key_id: string;
  correlation_id: string | null;
  created_at: string;
}

interface AuditTableProps {
  logs: AuditLog[];
  onVerify?: (id: string) => void;
}

export function AuditTable({ logs }: AuditTableProps) {
  const [verifying, setVerifying] = React.useState<string | null>(null);
  const [verificationResults, setVerificationResults] = React.useState<Record<string, { valid: boolean; reason?: string }>>({});

  const handleVerify = async (id: string) => {
    setVerifying(id);
    try {
      const resp = await apiClient.post(`/audit/${id}/verify`);
      setVerificationResults(prev => ({
        ...prev,
        [id]: { valid: resp.data.valid, reason: resp.data.reason }
      }));
    } catch (err) {
      setVerificationResults(prev => ({
        ...prev,
        [id]: { valid: false, reason: 'Verification service unavailable' }
      }));
    } finally {
      setVerifying(null);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-surface text-left border-b border-border">
            <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Transaction ID</th>
            <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Event Nature</th>
            <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Entity Source</th>
            <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Digital Hash</th>
            <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Verification</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {logs.map((log) => {
            const vResult = verificationResults[log.id];
            const isVerifying = verifying === log.id;

            return (
              <tr key={log.id} className="hover:bg-surface/50 transition-colors group">
                <td className="px-8 py-6 font-mono text-xs font-bold text-slate-900 truncate max-w-[120px]" title={log.id}>
                  {log.id.slice(0, 8)}...
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      "bg-primary"
                    )} />
                    <span className="text-xs font-bold text-slate-700">{log.event_type}</span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                    <Cpu className="w-3 h-3" /> {log.actor}
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2 font-mono text-[10px] text-slate-400 bg-surface-muted/50 px-2 py-1 rounded w-fit">
                    {log.signature.slice(0, 14)}... <Fingerprint className="w-3 h-3 opacity-50" />
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {vResult && (
                      <span className={cn(
                        "text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1",
                        vResult.valid ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      )}>
                        {vResult.valid ? (
                          <>Valid <CheckCircle2 className="w-3 h-3" /></>
                        ) : (
                          <>Invalid <XCircle className="w-3 h-3" /></>
                        )}
                      </span>
                    )}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 text-primary font-bold text-[10px] uppercase tracking-wider"
                      onClick={() => handleVerify(log.id)}
                      disabled={isVerifying}
                    >
                      {isVerifying ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        'Verify'
                      )}
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
