'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Badge } from './Badge';
import { Button } from './Button';
import {
    CheckCircle2,
    Clock,
    FileCheck,
    Send,
    AlertCircle,
    Download,
    ExternalLink,
    RefreshCw
} from 'lucide-react';

type SubmissionStatus =
    | 'draft'
    | 'submitted'
    | 'processing'
    | 'under_review'
    | 'action_required'
    | 'approved'
    | 'rejected';

interface TimelineStep {
    id: string;
    label: string;
    description?: string;
    timestamp?: string;
    status: 'completed' | 'current' | 'pending';
}

interface StatusTrackerProps {
    /** MESOB submission ID */
    submissionId?: string;
    /** Current status */
    status: SubmissionStatus;
    /** Status message */
    statusMessage?: string;
    /** Expected completion time */
    expectedCompletion?: string;
    /** Timeline steps */
    timeline?: TimelineStep[];
    /** Download artifact handler */
    onDownload?: () => void;
    /** Refresh status handler */
    onRefresh?: () => void;
    /** View details handler */
    onViewDetails?: () => void;
    /** Action required handler */
    onTakeAction?: () => void;
    /** Is refreshing */
    isRefreshing?: boolean;
    /** Custom class name */
    className?: string;
}

/**
 * StatusTracker - Submission status & timeline
 * 
 * Shows MESOB submission ID, live status, timeline progress,
 * and next action required.
 */
export const StatusTracker = ({
    submissionId,
    status,
    statusMessage,
    expectedCompletion,
    timeline = [],
    onDownload,
    onRefresh,
    onViewDetails,
    onTakeAction,
    isRefreshing = false,
    className,
}: StatusTrackerProps) => {

    const statusConfig = {
        draft: {
            icon: <FileCheck className="w-5 h-5" />,
            color: 'text-slate-500',
            bgColor: 'bg-slate-100',
            badge: 'neutral' as const,
            label: 'Draft',
        },
        submitted: {
            icon: <Send className="w-5 h-5" />,
            color: 'text-blue-600',
            bgColor: 'bg-blue-100',
            badge: 'info' as const,
            label: 'Submitted',
        },
        processing: {
            icon: <Clock className="w-5 h-5 animate-spin" />,
            color: 'text-amber-600',
            bgColor: 'bg-amber-100',
            badge: 'warning' as const,
            label: 'Processing',
        },
        under_review: {
            icon: <Clock className="w-5 h-5" />,
            color: 'text-purple-600',
            bgColor: 'bg-purple-100',
            badge: 'info' as const,
            label: 'Under Review',
        },
        action_required: {
            icon: <AlertCircle className="w-5 h-5" />,
            color: 'text-red-600',
            bgColor: 'bg-red-100',
            badge: 'error' as const,
            label: 'Action Required',
        },
        approved: {
            icon: <CheckCircle2 className="w-5 h-5" />,
            color: 'text-emerald-600',
            bgColor: 'bg-emerald-100',
            badge: 'success' as const,
            label: 'Approved',
        },
        rejected: {
            icon: <AlertCircle className="w-5 h-5" />,
            color: 'text-red-600',
            bgColor: 'bg-red-100',
            badge: 'error' as const,
            label: 'Rejected',
        },
    };

    const config = statusConfig[status];

    return (
        <div className={cn(
            "bg-white rounded-3xl border-2 border-slate-100 overflow-hidden",
            className
        )}>
            {/* Header */}
            <div className="p-6 border-b border-slate-100">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                        {/* Status icon */}
                        <div className={cn(
                            "w-12 h-12 rounded-2xl flex items-center justify-center",
                            config.bgColor,
                            config.color
                        )}>
                            {config.icon}
                        </div>

                        {/* Status info */}
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <Badge variant={config.badge} size="lg">
                                    {config.label}
                                </Badge>
                                {onRefresh && (
                                    <button
                                        onClick={onRefresh}
                                        disabled={isRefreshing}
                                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors disabled:opacity-50"
                                    >
                                        <RefreshCw className={cn(
                                            "w-4 h-4",
                                            isRefreshing && "animate-spin"
                                        )} />
                                    </button>
                                )}
                            </div>

                            {statusMessage && (
                                <p className="text-sm text-slate-600">{statusMessage}</p>
                            )}

                            {expectedCompletion && status !== 'approved' && status !== 'rejected' && (
                                <p className="text-xs text-slate-400 mt-1">
                                    Expected: {expectedCompletion}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Submission ID */}
                    {submissionId && (
                        <div className="text-right">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                Reference
                            </p>
                            <p className="text-sm font-mono font-bold text-slate-700">
                                {submissionId}
                            </p>
                        </div>
                    )}
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-3 mt-4">
                    {status === 'action_required' && onTakeAction && (
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={onTakeAction}
                        >
                            Take Action
                        </Button>
                    )}

                    {status === 'approved' && onDownload && (
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={onDownload}
                            leftIcon={<Download className="w-4 h-4" />}
                        >
                            Download Certificate
                        </Button>
                    )}

                    {onViewDetails && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onViewDetails}
                            rightIcon={<ExternalLink className="w-4 h-4" />}
                        >
                            View Details
                        </Button>
                    )}
                </div>
            </div>

            {/* Timeline */}
            {timeline.length > 0 && (
                <div className="p-6">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4">
                        Progress Timeline
                    </h4>

                    <div className="relative">
                        {/* Vertical line */}
                        <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-slate-200" />

                        <div className="space-y-4">
                            {timeline.map((step, index) => (
                                <motion.div
                                    key={step.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-start gap-4 relative"
                                >
                                    {/* Step indicator */}
                                    <div className={cn(
                                        "w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10",
                                        step.status === 'completed' && "bg-emerald-500",
                                        step.status === 'current' && "bg-emerald-500 ring-4 ring-emerald-100",
                                        step.status === 'pending' && "bg-slate-200"
                                    )}>
                                        {step.status === 'completed' ? (
                                            <CheckCircle2 className="w-4 h-4 text-white" />
                                        ) : step.status === 'current' ? (
                                            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                        ) : (
                                            <div className="w-2 h-2 bg-slate-400 rounded-full" />
                                        )}
                                    </div>

                                    {/* Step content */}
                                    <div className="flex-1 min-w-0 pb-4">
                                        <p className={cn(
                                            "text-sm font-medium",
                                            step.status === 'pending' ? "text-slate-400" : "text-slate-900"
                                        )}>
                                            {step.label}
                                        </p>
                                        {step.description && (
                                            <p className="text-xs text-slate-500 mt-0.5">
                                                {step.description}
                                            </p>
                                        )}
                                        {step.timestamp && (
                                            <p className="text-xs text-slate-400 mt-1">
                                                {step.timestamp}
                                            </p>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
