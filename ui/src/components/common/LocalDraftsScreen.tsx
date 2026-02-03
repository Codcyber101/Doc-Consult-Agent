'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';
import { Badge } from './Badge';
import { Card } from './Card';
import {
    FileText,
    Trash2,
    RefreshCw,
    Clock,
    ChevronRight,
    CloudOff,
    AlertCircle
} from 'lucide-react';

interface DraftItem {
    id: string;
    title: string;
    type: string;
    lastModified: string;
    progress: number;
    hasConflict?: boolean;
}

interface LocalDraftsScreenProps {
    drafts: DraftItem[];
    isLoading?: boolean;
    onResumeDraft: (id: string) => void;
    onDeleteDraft: (id: string) => void;
    onSyncDraft?: (id: string) => void;
    className?: string;
}

/**
 * LocalDraftsScreen - Manage offline drafts
 * 
 * Displays a list of locally saved applications/drafts.
 * Allows users to resume, delete, or retry syncing drafts.
 * Highlights conflicts if synchronization failed.
 */
export const LocalDraftsScreen = ({
    drafts,
    isLoading = false,
    onResumeDraft,
    onDeleteDraft,
    onSyncDraft,
    className,
}: LocalDraftsScreenProps) => {

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    if (drafts.length === 0 && !isLoading) {
        return (
            <div className={cn("flex flex-col items-center justify-center p-12 text-center", className)}>
                <div className="w-16 h-16 bg-surface-muted rounded-full flex items-center justify-center mb-4 text-slate-400">
                    <FileText className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">No Drafts Found</h3>
                <p className="text-slate-500 max-w-xs">
                    Applications you start will appear here so you can continue them later, even without internet.
                </p>
            </div>
        );
    }

    return (
        <div className={cn("space-y-6", className)}>
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 font-display">Local Drafts</h2>
                    <p className="text-slate-500 text-sm flex items-center gap-2 mt-1">
                        <CloudOff className="w-3 h-3" />
                        Stored on this device
                    </p>
                </div>
                <Badge variant="neutral" size="lg">
                    {drafts.length} Draft{drafts.length !== 1 ? 's' : ''}
                </Badge>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-3"
            >
                <AnimatePresence mode="popLayout">
                    {drafts.map((draft) => (
                        <motion.div
                            key={draft.id}
                            variants={itemVariants}
                            layout
                            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                        >
                            <Card
                                className={cn(
                                    "p-4 hover:shadow-md transition-shadow cursor-pointer border-l-4",
                                    draft.hasConflict ? "border-l-red-500" : "border-l-primary"
                                )}
                                hoverable
                                onClick={() => onResumeDraft(draft.id)}
                            >
                                <div className="flex items-center gap-4">
                                    {/* Icon */}
                                    <div className="w-10 h-10 rounded-xl bg-surface-muted flex items-center justify-center shrink-0 text-slate-500">
                                        <FileText className="w-5 h-5" />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-bold text-slate-900 truncate">
                                                {draft.title}
                                            </h3>
                                            {draft.hasConflict && (
                                                <Badge variant="error" size="sm" className="gap-1">
                                                    <AlertCircle className="w-3 h-3" />
                                                    Conflict
                                                </Badge>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-3 text-xs text-slate-500">
                                            <span className="font-medium text-primary">
                                                {draft.type}
                                            </span>
                                            <span>•</span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                Modified {draft.lastModified}
                                            </span>
                                        </div>

                                        {/* Progress bar */}
                                        <div className="mt-3 w-full bg-surface-muted h-1.5 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-primary rounded-full"
                                                style={{ width: `${draft.progress}%` }}
                                            />
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-2 ml-2" onClick={(e) => e.stopPropagation()}>
                                        {onSyncDraft && draft.hasConflict && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => onSyncDraft(draft.id)}
                                                className="text-amber-600 hover:bg-amber-50"
                                                title="Retry Sync"
                                            >
                                                <RefreshCw className="w-4 h-4" />
                                            </Button>
                                        )}

                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => onDeleteDraft(draft.id)}
                                            className="text-slate-400 hover:text-red-500 hover:bg-red-50"
                                            title="Delete Draft"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>

                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => onResumeDraft(draft.id)}
                                            className="text-slate-400 hover:text-primary"
                                        >
                                            <ChevronRight className="w-5 h-5" />
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};
