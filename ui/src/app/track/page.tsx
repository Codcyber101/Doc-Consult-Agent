// Implements: /specs/001-govassist-ethiopia/spec.md#requirements
// Generated-by: Codex prompt-id: civic-editorial-ui-20260218
// Generated-at: 2026-02-18T00:00:00Z

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Clock,
  AlertCircle,
  Briefcase,
  User,
  FileText,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  MoreVertical,
} from 'lucide-react';
import { Navbar } from '@/components/domain/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const APPLICATIONS = [
  {
    id: 'ET-TL-2026-B812',
    service: 'Trade License Renewal',
    status: 'In Review',
    statusColor: 'text-accent',
    progress: 65,
    lastUpdate: 'Today, 10:24 AM',
    nextStep: 'Officer review in Bole Sub-city',
    icon: <Briefcase className="text-primary" />,
    urgent: false,
  },
  {
    id: 'ET-ID-2026-A004',
    service: 'Kebele ID Renewal',
    status: 'Action Required',
    statusColor: 'text-danger',
    progress: 30,
    lastUpdate: 'Yesterday, 04:15 PM',
    nextStep: 'Re-upload Resident ID Scan (Contrast too low)',
    icon: <User className="text-primary" />,
    urgent: true,
  },
  {
    id: 'ET-VE-2025-C991',
    service: 'Vital Events: Birth Certificate',
    status: 'Completed',
    statusColor: 'text-primary',
    progress: 100,
    lastUpdate: 'Dec 12, 2025',
    nextStep: 'Download Issued Certificate',
    icon: <FileText className="text-primary" />,
    urgent: false,
  },
];

export default function TrackPage() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary/20 selection:text-foreground font-sans">
      <div className="fixed inset-0 bg-mesh pointer-events-none opacity-30" />
      <Navbar user={{ name: 'Abebe Bikila' }} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="mb-12">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted">National Transmission Registry</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground tracking-tight">
              Application <span className="text-primary italic">Tracking</span>
            </h1>
            <p className="mt-4 text-lg text-muted">
              Monitor the live status of your government submissions across all jurisdictions.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-6">
            {APPLICATIONS.map((app, i) => (
              <motion.div key={app.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                <Card
                  className={cn(
                    'overflow-hidden border transition-all duration-300',
                    app.urgent ? 'border-red-200/60 hover:border-red-300' : 'border-border hover:border-primary/30'
                  )}
                >
                  <CardHeader className="flex flex-row items-center justify-between pb-2 bg-surface-muted/60">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center shadow-sm border border-border">
                        {app.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{app.service}</CardTitle>
                        <CardDescription className="font-mono text-[10px] uppercase font-bold tracking-widest">
                          {app.id}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={cn('text-xs font-black uppercase tracking-widest', app.statusColor)}>{app.status}</span>
                      <Button variant="ghost" size="icon" className="text-muted">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                          <span className="text-muted">Transmission Progress</span>
                          <span className="text-foreground">{app.progress}%</span>
                        </div>
                        <Progress value={app.progress} className="h-2" />
                      </div>

                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-surface-muted rounded-2xl border border-border">
                        <div className="flex gap-3">
                          {app.urgent ? (
                            <AlertCircle className="w-5 h-5 text-danger shrink-0" />
                          ) : (
                            <Clock className="w-5 h-5 text-muted shrink-0" />
                          )}
                          <div>
                            <p className="text-xs font-bold text-muted uppercase tracking-widest mb-1">Current Action</p>
                            <p className={cn('text-sm font-medium', app.urgent ? 'text-danger' : 'text-foreground')}>{app.nextStep}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 md:border-l md:pl-6 md:border-border">
                          <div className="text-right">
                            <p className="text-xs font-bold text-muted uppercase tracking-widest mb-1">Updated</p>
                            <p className="text-sm font-medium text-foreground">{app.lastUpdate}</p>
                          </div>
                          <Button size="sm" variant={app.urgent ? 'destructive' : 'secondary'} className="h-10 rounded-xl gap-2">
                            {app.urgent ? 'Fix Now' : 'Details'}
                            <ArrowRight className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="lg:col-span-4 space-y-8">
            <Card className="bg-foreground text-surface border-none overflow-hidden relative">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-surface/10 rounded-2xl flex items-center justify-center mb-6 shadow-glow-primary">
                  <RefreshCw className="w-6 h-6 text-surface" />
                </div>
                <h3 className="text-xl font-display font-bold mb-2">Real-time Polling</h3>
                <p className="text-surface/70 text-sm leading-relaxed mb-8">
                  Our gateway agents are constantly polling the national registry for updates. You will receive a mobile notification as soon as an officer acts on your submission.
                </p>
                <Button variant="secondary" className="w-full h-12 rounded-xl font-bold uppercase tracking-widest text-[10px]">
                  Manual Sync Refresh
                </Button>
              </CardContent>
              <div className="absolute inset-0 paper-grain opacity-10 pointer-events-none" />
            </Card>

            <Card className="border-border bg-surface shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm uppercase tracking-widest text-muted font-black">Archive Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-0">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted">In Progress</span>
                  <span className="font-bold text-foreground">2</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted">Action Required</span>
                  <span className="font-bold text-danger">1</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted">History (2025)</span>
                  <span className="font-bold text-foreground">14</span>
                </div>
                <div className="w-full h-[1px] bg-surface-muted my-2" />
                <Button variant="link" className="w-full text-primary font-bold p-0 justify-start">
                  Download Audit Ledger <ExternalLink className="w-3 h-3 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
