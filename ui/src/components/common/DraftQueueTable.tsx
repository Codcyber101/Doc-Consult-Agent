'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { Badge } from './Badge';
import {
    MoreHorizontal,
    Eye,
    CheckCircle,
    XCircle,
    Clock,
    User,
    FileText,
    Filter
} from 'lucide-react';

export interface DraftQueueItem {
    id: string;
    applicant: string;
    type: string;
    submittedAt: string;
    riskScore: number;
    status: 'pending' | 'in_review' | 'approved' | 'rejected';
}

interface DraftQueueTableProps {
    items: DraftQueueItem[];
    onReview: (id: string) => void;
    onApprove: (id: string) => void;
    onReject: (id: string) => void;
    isLoading?: boolean;
    className?: string;
}

/**
 * DraftQueueTable - List of applications for admin review
 * 
 * Displays submitted applications with risk scores and status.
 * Provides actions for quick review or detailed inspection.
 */
export const DraftQueueTable = ({
    items,
    onReview,
    onApprove,
    onReject,
    isLoading = false,
    className,
}: DraftQueueTableProps) => {

    const getStatusBadge = (status: DraftQueueItem['status']) => {
        switch (status) {
            case 'approved': return <Badge variant="success" size="sm" dot>Approved</Badge>;
            case 'rejected': return <Badge variant="error" size="sm" dot>Rejected</Badge>;
            case 'in_review': return <Badge variant="warning" size="sm" dot>In Review</Badge>;
            default: return <Badge variant="neutral" size="sm" dot>Pending</Badge>;
        }
    };

    const getRiskColor = (score: number) => {
        if (score < 30) return 'text-primary';
        if (score < 70) return 'text-amber-600';
        return 'text-red-600';
    };

    return (
        <div className={cn("bg-surface rounded-2xl border border-border overflow-hidden shadow-sm", className)}>
            {/* Filters Header (Mock) */}
            <div className="px-6 py-4 border-b border-border flex justify-between items-center bg-surface-muted/60">
                <h3 className="font-bold text-slate-700 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-slate-400" />
                    Review Queue <span className="text-slate-400 font-normal">({items.length})</span>
                </h3>
                <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="text-slate-500 gap-2">
                        <Filter className="w-4 h-4" /> Filter
                    </Button>
                </div>
            </div>

            {items.length === 0 && !isLoading && (
                <div className="p-12 text-center text-slate-500">
                    No items in the queue.
                </div>
            )}

            {items.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-slate-500 uppercase bg-surface-muted/60">
                            <tr>
                                <th className="px-6 py-3 font-semibold">Applicant</th>
                                <th className="px-6 py-3 font-semibold">Service Type</th>
                                <th className="px-6 py-3 font-semibold">Submitted</th>
                                <th className="px-6 py-3 font-semibold">Risk Score</th>
                                <th className="px-6 py-3 font-semibold">Status</th>
                                <th className="px-6 py-3 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {items.map((item) => (
                                <tr key={item.id} className="hover:bg-surface-muted/80 transition-colors group">
                                    <td className="px-6 py-4 font-medium text-slate-900">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-surface-muted flex items-center justify-center text-slate-500">
                                                <User className="w-4 h-4" />
                                            </div>
                                            {item.applicant}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">{item.type}</td>
                                    <td className="px-6 py-4 text-slate-500">
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-3 h-3" />
                                            {item.submittedAt}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-full bg-surface-muted rounded-full h-1.5 w-16">
                                                <div
                                                    className={cn("h-full rounded-full",
                                                        item.riskScore < 30 ? "bg-primary" :
                                                            item.riskScore < 70 ? "bg-amber-500" : "bg-red-500"
                                                    )}
                                                    style={{ width: `${item.riskScore}%` }}
                                                />
                                            </div>
                                            <span className={cn("font-bold text-xs", getRiskColor(item.riskScore))}>
                                                {item.riskScore}%
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {getStatusBadge(item.status)}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => onApprove(item.id)}
                                                className="p-1.5 rounded-lg text-primary hover:bg-primary/10 transition-colors"
                                                title="Quick Approve"
                                            >
                                                <CheckCircle className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => onReject(item.id)}
                                                className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                                                title="Quick Reject"
                                            >
                                                <XCircle className="w-4 h-4" />
                                            </button>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => onReview(item.id)}
                                                className="ml-2 gap-1 text-slate-600 hover:text-blue-600"
                                            >
                                                Review <Eye className="w-3 h-3" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};
