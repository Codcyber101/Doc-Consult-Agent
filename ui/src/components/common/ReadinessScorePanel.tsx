'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { Badge } from './Badge';
import {
    CheckCircle2,
    AlertCircle,
    ArrowRight,
    Sparkles
} from 'lucide-react';

interface MissingItem {
    id: string;
    label: string;
    description?: string;
    action?: {
        label: string;
        onClick: () => void;
    };
}

interface ReadinessScorePanelProps {
    /** Score from 0-100 */
    score: number;
    /** Label for the score (e.g., "Application Readiness") */
    label?: string;
    /** List of missing items to complete */
    missingItems?: MissingItem[];
    /** Completed items count */
    completedCount?: number;
    /** Total items count */
    totalCount?: number;
    /** Show "Submit" button when ready */
    showSubmit?: boolean;
    /** Submit handler */
    onSubmit?: () => void;
    /** Custom class name */
    className?: string;
}

/**
 * ReadinessScorePanel - Visual readiness indicator
 * 
 * Shows overall completion percentage with a donut chart,
 * lists missing items with fix actions, and enables submission
 * when ready.
 */
export const ReadinessScorePanel = ({
    score,
    label = 'Application Readiness',
    missingItems = [],
    completedCount,
    totalCount,
    showSubmit = true,
    onSubmit,
    className,
}: ReadinessScorePanelProps) => {

    const isReady = score >= 100;
    const clampedScore = Math.min(100, Math.max(0, score));

    // SVG donut chart calculations
    const size = 120;
    const strokeWidth = 10;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (clampedScore / 100) * circumference;

    // Score color based on value
    const getScoreColor = () => {
        if (score >= 100) return 'text-primary';
        if (score >= 70) return 'text-primary';
        if (score >= 40) return 'text-gold-500';
        return 'text-red-500';
    };

    const getStrokeColor = () => {
        if (score >= 100) return '#1152d4';
        if (score >= 70) return '#1152d4';
        if (score >= 40) return '#FDB813';
        return '#D94E41';
    };

    return (
        <div className={cn(
            "bg-surface rounded-3xl border-2 border-border p-6 sm:p-8",
            isReady && "border-primary/20 bg-primary/10",
            className
        )}>
            <div className="flex flex-col sm:flex-row items-center gap-6">
                {/* Donut Chart */}
                <div className="relative shrink-0">
                    <svg width={size} height={size} className="-rotate-90">
                        {/* Background circle */}
                        <circle
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            fill="none"
                            stroke="#e2e8f0"
                            strokeWidth={strokeWidth}
                        />
                        {/* Progress circle */}
                        <motion.circle
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            fill="none"
                            stroke={getStrokeColor()}
                            strokeWidth={strokeWidth}
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            initial={{ strokeDashoffset: circumference }}
                            animate={{ strokeDashoffset: offset }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        />
                    </svg>

                    {/* Center content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <motion.span
                            className={cn("text-2xl font-bold", getScoreColor())}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5, type: "spring" }}
                        >
                            {Math.round(clampedScore)}%
                        </motion.span>
                        {isReady && (
                            <motion.div
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                            >
                                <Sparkles className="w-4 h-4 text-primary" />
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-lg font-bold text-slate-900 mb-1">{label}</h3>

                    {completedCount !== undefined && totalCount !== undefined && (
                        <p className="text-sm text-slate-500 mb-3">
                            {completedCount} of {totalCount} items complete
                        </p>
                    )}

                    {isReady ? (
                        <div className="space-y-3">
                            <Badge variant="success" size="lg">
                                <CheckCircle2 className="w-4 h-4 mr-1.5" />
                                Ready to Submit
                            </Badge>

                            {showSubmit && onSubmit && (
                                <Button
                                    variant="glow"
                                    size="lg"
                                    onClick={onSubmit}
                                    className="w-full sm:w-auto"
                                    rightIcon={<ArrowRight className="w-4 h-4" />}
                                >
                                    Submit Application
                                </Button>
                            )}
                        </div>
                    ) : (
                        <p className="text-sm text-slate-500">
                            Complete the items below to proceed
                        </p>
                    )}
                </div>
            </div>

            {/* Missing Items */}
            {!isReady && missingItems.length > 0 && (
                <div className="mt-6 pt-6 border-t border-border">
                    <h4 className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wider">
                        Required Items ({missingItems.length})
                    </h4>

                    <div className="space-y-3">
                        {missingItems.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-start gap-3 p-3 rounded-xl bg-surface-muted hover:bg-surface transition-colors"
                            >
                                <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-slate-900">{item.label}</p>
                                    {item.description && (
                                        <p className="text-xs text-slate-500 mt-0.5">{item.description}</p>
                                    )}
                                </div>
                                {item.action && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={item.action.onClick}
                                        className="shrink-0"
                                    >
                                        {item.action.label}
                                    </Button>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
