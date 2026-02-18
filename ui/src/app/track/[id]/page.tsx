// Implements: /specs/001-govassist-ethiopia/spec.md#requirements
// Generated-by: Codex prompt-id: civic-editorial-ui-20260218
// Generated-at: 2026-02-18T00:00:00Z

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ShieldCheck,
  MessageSquare,
  Send,
  MapPin,
  Network,
  ExternalLink,
  MoreVertical,
  User,
  Database,
  Eye,
} from 'lucide-react';
import { Navbar } from '@/components/domain/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const TRACKING_DATA: Record<string, any> = {
  'ET-TL-2026-B812': {
    service: 'Trade License Renewal',
    jurisdiction: 'Addis Ababa • Bole Sub-city',
    status: 'In Review',
    progress: 65,
    startedAt: 'Jan 18, 2026',
    estimatedCompletion: 'Jan 22, 2026',
    transmissionPath: [
      { node: 'Citizen Portal', status: 'Completed', timestamp: 'Jan 18, 10:24 AM', icon: <User className="w-4 h-4" /> },
      { node: 'National Gateway', status: 'Completed', timestamp: 'Jan 18, 10:25 AM', icon: <Network className="w-4 h-4" /> },
      { node: 'Bole Data Node', status: 'Completed', timestamp: 'Jan 18, 11:12 AM', icon: <Database className="w-4 h-4" /> },
      { node: 'Officer Review', status: 'Active', timestamp: 'In progress...', icon: <Eye className="w-4 h-4" /> },
      { node: 'Final Issuance', status: 'Pending', timestamp: '---', icon: <ShieldCheck className="w-4 h-4" /> },
    ],
    messages: [
      { sender: 'System', text: 'Document archive received and verified by National Root.', time: 'Jan 18, 10:25 AM', isOfficer: false },
      { sender: 'Officer #992', text: 'Please clarify the business category. Your TIN record suggests "Retail" but application says "Consultancy".', time: 'Jan 19, 02:15 PM', isOfficer: true },
    ],
  },
};

export default function TrackingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const app = TRACKING_DATA[id] || TRACKING_DATA['ET-TL-2026-B812'];
  const [message, setMessage] = useState('');

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20 selection:text-foreground font-sans">
      <div className="fixed inset-0 bg-mesh pointer-events-none opacity-30" />
      <Navbar user={{ name: 'Abebe Bikila' }} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <Link href="/track">
            <Button variant="ghost" className="gap-2 text-muted hover:text-foreground">
              <ArrowLeft className="w-4 h-4" /> Back to History
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted">Application ID</span>
            <span className="font-mono text-sm font-bold text-foreground bg-surface px-3 py-1 rounded-lg border border-border shadow-sm">{id}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8">
            <Card className="bg-surface border-border shadow-xl overflow-hidden">
              <CardHeader className="p-8 border-b border-border">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <CardTitle className="text-2xl mb-1">{app.service}</CardTitle>
                    <p className="text-sm font-medium text-muted flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" /> {app.jurisdiction}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black uppercase text-muted mb-1">Est. Completion</p>
                    <p className="text-sm font-bold text-foreground">{app.estimatedCompletion}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-black uppercase tracking-widest text-primary">
                    <span>Sovereign Transmission Status</span>
                    <span>{app.progress}% Complete</span>
                  </div>
                  <Progress value={app.progress} className="h-3" />
                </div>
              </CardHeader>
              <CardContent className="p-10">
                <div className="relative">
                  <div className="absolute left-[23px] top-0 bottom-0 w-1 bg-surface-muted rounded-full" />
                  <div className="space-y-12">
                    {app.transmissionPath.map((step: any, i: number) => (
                      <div key={i} className="flex gap-8 relative z-10">
                        <div
                          className={cn(
                            'w-12 h-12 rounded-2xl border-4 border-surface shadow-md flex items-center justify-center transition-all duration-500',
                            step.status === 'Completed'
                              ? 'bg-primary text-surface'
                              : step.status === 'Active'
                              ? 'bg-surface text-primary border-primary animate-pulse'
                              : 'bg-surface text-muted'
                          )}
                        >
                          {step.icon}
                        </div>
                        <div className="flex-1 pt-1">
                          <div className="flex justify-between items-center mb-1">
                            <h4 className={cn('font-bold text-lg', step.status === 'Completed' ? 'text-foreground' : 'text-muted')}>
                              {step.node}
                            </h4>
                            <span className="text-[10px] font-black uppercase text-muted">{step.timestamp}</span>
                          </div>
                          <p className={cn('text-sm font-medium', step.status === 'Active' ? 'text-primary' : 'text-muted')}>{step.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-foreground text-surface border-none overflow-hidden relative">
              <CardContent className="p-8 flex flex-col md:flex-row items-center gap-8">
                <div className="w-16 h-16 rounded-2xl bg-surface/10 flex items-center justify-center border border-surface/10 shrink-0">
                  <ShieldCheck className="w-8 h-8 text-accent" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-display font-bold mb-1">Audit Ledger Entry</h4>
                  <p className="text-sm text-surface/70 leading-relaxed">
                    Transmission hash <strong>0x82fa...e122</strong> has been recorded on the National Trust Ledger. The integrity of this application is cryptographically guaranteed.
                  </p>
                </div>
                <Button variant="outline" className="border-surface/20 text-surface hover:bg-surface/10 gap-2">
                  View Ledger <ExternalLink className="w-4 h-4" />
                </Button>
              </CardContent>
              <div className="absolute inset-0 paper-grain opacity-[0.08] pointer-events-none" />
            </Card>
          </div>

          <div className="lg:col-span-4 flex flex-col h-[800px]">
            <Card className="flex-1 bg-surface border-border shadow-xl overflow-hidden flex flex-col">
              <CardHeader className="bg-surface-muted border-b border-border flex flex-row items-center justify-between p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center text-primary shadow-sm border border-border">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <CardTitle className="text-lg">Officer Chat</CardTitle>
                </div>
                <Button variant="ghost" size="icon" className="text-muted">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </CardHeader>

              <CardContent className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                {app.messages.map((msg: any, i: number) => (
                  <div key={i} className={cn('flex flex-col max-w-[85%]', msg.isOfficer ? 'items-start' : 'items-end ml-auto')}>
                    <p className="text-[10px] font-black uppercase text-muted mb-1 px-1">
                      {msg.sender} • {msg.time}
                    </p>
                    <div
                      className={cn(
                        'p-4 rounded-2xl text-sm leading-relaxed',
                        msg.isOfficer ? 'bg-surface-muted text-foreground rounded-tl-none' : 'bg-primary text-surface rounded-tr-none shadow-lg shadow-primary/20'
                      )}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </CardContent>

              <div className="p-6 border-t border-border bg-surface-muted/60">
                <div className="relative">
                  <textarea
                    rows={2}
                    placeholder="Type your response..."
                    className="w-full p-4 pr-12 bg-surface border border-border rounded-2xl text-sm outline-none focus:border-primary shadow-sm resize-none"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <Button size="icon" className="absolute right-3 bottom-3 bg-foreground hover:bg-primary text-surface rounded-xl shadow-lg" disabled={!message.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-[9px] text-center text-muted mt-3 uppercase font-bold tracking-widest">
                  <ShieldCheck className="w-3 h-3 inline mr-1 mb-0.5" /> End-to-End Encrypted
                </p>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
