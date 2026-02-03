'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Badge } from './Badge';
import { Button } from './Button';
import {
    CheckCircle2,
    Circle,
    Clock,
    MapPin,
    FileText,
    Coins,
    AlertTriangle,
    ChevronRight,
    HelpCircle
} from 'lucide-react';

interface ProcedureStep {
    id: string;
    title: string;
    /** Office/location where this step is done */
    office?: string;
    /** Required documents for this step */
    documents?: string[];
    /** Fee amount (in ETB) */
    fee?: number;
    /** Estimated time (e.g., "2-3 days") */
    estimatedTime?: string;
    /** Status of this step */
    status: 'completed' | 'current' | 'pending' | 'blocked';
    /** Why this step is needed (for provenance) */
    reason?: string;
    /** Common failure reasons to warn about */
    commonFailures?: string[];
}

interface ProcedureChecklistCardProps {
    /** Step data */
    step: ProcedureStep;
    /** Step number (1-indexed) */
    stepNumber: number;
    /** Show expanded details */
    expanded?: boolean;
    /** Toggle expand handler */
    onToggle?: () => void;
    /** Mark as done handler */
    onMarkDone?: () => void;
    /** Show "Why needed?" modal */
    onShowReason?: () => void;
    /** Custom class name */
    className?: string;
}

/**
 * ProcedureChecklistCard - Step card with requirements
 * 
 * Shows step title, office, required docs, fee, ETA,
 * common failures, and "why needed" provenance link.
 */
export const ProcedureChecklistCard = ({
    step,
    stepNumber,
    expanded = false,
    onToggle,
    onMarkDone,
    onShowReason,
    className,
}: ProcedureChecklistCardProps) => {

    const statusStyles = {
        completed: {
            icon: <CheckCircle2 className="w-6 h-6 text-primary" />,
            border: 'border-primary/20 bg-primary/10',
            badge: 'success' as const,
            badgeText: 'Completed',
        },
        current: {
            icon: <Circle className="w-6 h-6 text-primary animate-pulse" />,
            border: 'border-primary border-2 shadow-lg shadow-primary/20',
            badge: 'info' as const,
            badgeText: 'Current Step',
        },
        pending: {
            icon: <Circle className="w-6 h-6 text-slate-300" />,
            border: 'border-border',
            badge: 'neutral' as const,
            badgeText: 'Pending',
        },
        blocked: {
            icon: <AlertTriangle className="w-6 h-6 text-amber-500" />,
            border: 'border-amber-200 bg-amber-50/50',
            badge: 'warning' as const,
            badgeText: 'Requires Action',
        },
    };

    const styles = statusStyles[step.status];

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: stepNumber * 0.05 }}
            className={cn(
                "rounded-2xl border bg-surface p-5 transition-all",
                styles.border,
                expanded && "shadow-lg",
                className
            )}
        >
            {/* Header */}
            <div
                className={cn(
                    "flex items-start gap-4 cursor-pointer",
                    onToggle && "hover:opacity-80"
                )}
                onClick={onToggle}
            >
                {/* Step number & icon */}
                <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-400 w-6 text-center">
                        {stepNumber}
                    </span>
                    {styles.icon}
                </div>

                {/* Title & badge */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                        <h3 className={cn(
                            "font-bold text-slate-900",
                            step.status === 'completed' && "text-slate-500 line-through"
                        )}>
                            {step.title}
                        </h3>
                        <Badge variant={styles.badge} size="sm">
                            {styles.badgeText}
                        </Badge>
                    </div>

                    {/* Quick info row */}
                    {(step.office || step.estimatedTime || step.fee) && (
                        <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                            {step.office && (
                                <span className="flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    {step.office}
                                </span>
                            )}
                            {step.estimatedTime && (
                                <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {step.estimatedTime}
                                </span>
                            )}
                            {step.fee !== undefined && step.fee > 0 && (
                                <span className="flex items-center gap-1">
                                    <Coins className="w-3 h-3" />
                                    ETB {step.fee.toLocaleString()}
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {/* Expand arrow */}
                {onToggle && (
                    <ChevronRight
                        className={cn(
                            "w-5 h-5 text-slate-400 transition-transform",
                            expanded && "rotate-90"
                        )}
                    />
                )}
            </div>

            {/* Expanded content */}
            {expanded && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-border space-y-4"
                >
                    {/* Required documents */}
                    {step.documents && step.documents.length > 0 && (
                        <div>
                            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                                <FileText className="w-3 h-3" />
                                Required Documents
                            </h4>
                            <ul className="space-y-1">
                                {step.documents.map((doc, i) => (
                                    <li key={i} className="text-sm text-slate-600 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                                        {doc}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Common failures warning */}
                    {step.commonFailures && step.commonFailures.length > 0 && (
                        <div className="bg-amber-50 rounded-xl p-3">
                            <h4 className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" />
                                Common Issues
                            </h4>
                            <ul className="space-y-1">
                                {step.commonFailures.map((failure, i) => (
                                    <li key={i} className="text-sm text-amber-700">
                                        • {failure}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-2">
                        {step.status === 'current' && onMarkDone && (
                            <Button
                                variant="primary"
                                size="sm"
                                onClick={onMarkDone}
                                leftIcon={<CheckCircle2 className="w-4 h-4" />}
                            >
                                Mark as Done
                            </Button>
                        )}

                        {step.reason && onShowReason && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={onShowReason}
                                leftIcon={<HelpCircle className="w-4 h-4" />}
                            >
                                Why is this needed?
                            </Button>
                        )}
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
};

// ============================================================================
// PROCEDURE CHECKLIST (Full list wrapper)
// ============================================================================

interface ProcedureChecklistProps {
    steps: ProcedureStep[];
    className?: string;
}

/**
 * ProcedureChecklist - Full procedure step list
 */
export const ProcedureChecklist = ({ steps, className }: ProcedureChecklistProps) => {
    const [expandedId, setExpandedId] = React.useState<string | null>(null);

    return (
        <div className={cn("space-y-3", className)}>
            {steps.map((step, index) => (
                <ProcedureChecklistCard
                    key={step.id}
                    step={step}
                    stepNumber={index + 1}
                    expanded={expandedId === step.id}
                    onToggle={() => setExpandedId(expandedId === step.id ? null : step.id)}
                />
            ))}
        </div>
    );
};
