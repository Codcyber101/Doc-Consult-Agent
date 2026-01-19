'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { X, Cloud, Monitor, AlertTriangle } from 'lucide-react';

interface ConflictResolutionDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onResolve: (strategy: 'local' | 'remote') => void;
    localVersion: {
        lastModified: string;
        description: string;
    };
    remoteVersion: {
        lastModified: string;
        description: string;
        author?: string;
    };
    title?: string;
}

/**
 * ConflictResolutionDialog - UI for resolving data conflicts
 * 
 * Modal that forces the user to choose between their local version
 * and the server version when a sync conflict occurs.
 */
export const ConflictResolutionDialog = ({
    isOpen,
    onClose,
    onResolve,
    localVersion,
    remoteVersion,
    title = "Conflict Detected",
}: ConflictResolutionDialogProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Dialog Panel */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
                {/* Header */}
                <div className="bg-amber-50 p-6 border-b border-amber-100 flex items-start justify-between">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0 text-amber-600">
                            <AlertTriangle className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 mb-1">{title}</h3>
                            <p className="text-sm text-slate-600">
                                Changes were made on another device or tab since you last loaded this page.
                                Please choose which version to keep.
                            </p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content - Comparison */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* Remote Version */}
                    <div className="rounded-2xl border border-slate-200 p-4 bg-slate-50/50 hover:bg-slate-50 hover:border-blue-200 transition-colors cursor-pointer group"
                        onClick={() => onResolve('remote')}>
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <Cloud className="w-5 h-5 text-blue-500" />
                                <span className="font-bold text-slate-700">Server Version</span>
                            </div>
                            <div className="w-5 h-5 rounded-full border-2 border-slate-300 group-hover:border-blue-500" />
                        </div>

                        <div className="space-y-2 text-sm">
                            <p className="text-slate-500">Last Modified:</p>
                            <p className="font-medium text-slate-900">{remoteVersion.lastModified}</p>

                            {remoteVersion.author && (
                                <>
                                    <p className="text-slate-500 mt-2">Modified By:</p>
                                    <p className="font-medium text-slate-900">{remoteVersion.author}</p>
                                </>
                            )}

                            <p className="text-slate-500 mt-2">Summary:</p>
                            <p className="font-medium text-slate-900">{remoteVersion.description}</p>
                        </div>
                    </div>

                    {/* Local Version */}
                    <div className="rounded-2xl border-2 border-emerald-500 bg-emerald-50/10 p-4 cursor-pointer group relative"
                        onClick={() => onResolve('local')}>
                        <div className="absolute top-3 right-3 text-emerald-600 text-xs font-bold uppercase tracking-wider bg-emerald-100 px-2 py-1 rounded-md">
                            Recommended
                        </div>

                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <Monitor className="w-5 h-5 text-emerald-600" />
                                <span className="font-bold text-slate-900">Your Device</span>
                            </div>
                            <div className="w-5 h-5 rounded-full border-[5px] border-emerald-600" />
                        </div>

                        <div className="space-y-2 text-sm">
                            <p className="text-slate-500">Last Modified:</p>
                            <p className="font-medium text-slate-900">{localVersion.lastModified}</p>

                            <p className="text-slate-500 mt-2">Summary:</p>
                            <p className="font-medium text-slate-900">{localVersion.description}</p>
                        </div>
                    </div>
                </div>

                {/* Footer actions */}
                <div className="p-6 pt-0 flex justify-end gap-3 text-sm">
                    <Button variant="ghost" onClick={onClose}>
                        Cancel
                    </Button>
                </div>
            </motion.div>
        </div>
    );
};
