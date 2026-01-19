'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from './Button';
import { Card } from './Card';
import { DraftQueueTable, DraftQueueItem } from './DraftQueueTable';
import { AnimatedCounter } from './AnimatedCounter';
import {
    LayoutDashboard,
    Users,
    FileCheck,
    AlertTriangle,
    ArrowRight
} from 'lucide-react';

interface HumanReviewDashboardProps {
    queueItems: DraftQueueItem[];
    stats: {
        totalPending: number;
        avgRiskScore: number;
        processedToday: number;
    };
    onReviewItem: (id: string) => void;
    className?: string;
}

/**
 * HumanReviewDashboard - Main view for admin reviewers
 * 
 * Aggregates key metrics (pending, risk, processed) and displayed
 * the active review queue.
 */
export const HumanReviewDashboard = ({
    queueItems,
    stats,
    onReviewItem,
    className,
}: HumanReviewDashboardProps) => {

    return (
        <div className={cn("space-y-8", className)}>
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 font-display tracking-tight">
                        Review Dashboard
                    </h1>
                    <p className="text-slate-500 mt-1">
                        Overview of pending applications and risk assessment.
                    </p>
                </div>
                <Button leftIcon={<LayoutDashboard className="w-4 h-4" />}>
                    Customize View
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6 border-l-4 border-l-blue-500" hoverable>
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">
                                Pending Review
                            </p>
                            <AnimatedCounter
                                value={stats.totalPending}
                                className="text-4xl font-black text-slate-900"
                            />
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                            <Users className="w-6 h-6" />
                        </div>
                    </div>
                    <div className="mt-4 text-xs font-medium text-slate-500">
                        <span className="text-blue-600 font-bold">+12%</span> from yesterday
                    </div>
                </Card>

                <Card className="p-6 border-l-4 border-l-amber-500" hoverable>
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">
                                Avg Risk Score
                            </p>
                            <div className="flex items-baseline gap-1">
                                <AnimatedCounter
                                    value={stats.avgRiskScore}
                                    className="text-4xl font-black text-slate-900"
                                />
                                <span className="text-slate-400 font-bold">%</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
                            <AlertTriangle className="w-6 h-6" />
                        </div>
                    </div>
                    <div className="mt-4 text-xs font-medium text-slate-500">
            Requires attention if > 50%
                    </div>
                </Card>

                <Card className="p-6 border-l-4 border-l-emerald-500" hoverable>
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">
                                Processed Today
                            </p>
                            <AnimatedCounter
                                value={stats.processedToday}
                                className="text-4xl font-black text-slate-900"
                            />
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                            <FileCheck className="w-6 h-6" />
                        </div>
                    </div>
                    <div className="mt-4 text-xs font-medium text-slate-500">
                        <span className="text-emerald-600 font-bold">On track</span> to meet daily goal
                    </div>
                </Card>
            </div>

            {/* Queue Table */}
            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-slate-900">Priority Queue</h2>
                    <Button variant="ghost" size="sm" className="text-blue-600 group">
                        View All <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </div>

                <DraftQueueTable
                    items={queueItems}
                    onReview={onReviewItem}
                    onApprove={(id) => console.log('Approve', id)}
                    onReject={(id) => console.log('Reject', id)}
                />
            </section>
        </div>
    );
};
