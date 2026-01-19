'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Wifi,
    WifiOff,
    Cloud,
    CloudOff,
    RefreshCw,
    CheckCircle2,
    AlertCircle,
    Upload
} from 'lucide-react';
import { useToastActions } from './Toast';

type SyncState =
    | 'online'      // Connected, all synced
    | 'offline'     // No connection
    | 'syncing'     // Currently syncing
    | 'queued'      // Items waiting to sync
    | 'error';      // Sync failed

interface SyncStateIndicatorProps {
    /** Current sync state */
    state: SyncState;
    /** Number of items in queue (for 'queued' state) */
    queueCount?: number;
    /** Last sync time */
    lastSynced?: string;
    /** Error message (for 'error' state) */
    errorMessage?: string;
    /** Retry sync handler */
    onRetry?: () => void;
    /** View queue handler */
    onViewQueue?: () => void;
    /** Display variant */
    variant?: 'minimal' | 'compact' | 'full';
    /** Custom class name */
    className?: string;
}

/**
 * SyncStateIndicator - Offline/sync status display
 * 
 * Shows connection status, sync state, queued items count,
 * and last sync time. Provides clear feedback for offline-first UX.
 */
export const SyncStateIndicator = ({
    state,
    queueCount = 0,
    lastSynced,
    errorMessage,
    onRetry,
    onViewQueue,
    variant = 'compact',
    className,
}: SyncStateIndicatorProps) => {

    const stateConfig = {
        online: {
            icon: <CheckCircle2 className="w-4 h-4" />,
            color: 'text-emerald-600',
            bgColor: 'bg-emerald-100',
            label: 'Synced',
            description: lastSynced ? `Last synced ${lastSynced}` : 'All changes saved',
        },
        offline: {
            icon: <WifiOff className="w-4 h-4" />,
            color: 'text-slate-500',
            bgColor: 'bg-slate-100',
            label: 'Offline',
            description: 'Changes saved locally',
        },
        syncing: {
            icon: <RefreshCw className="w-4 h-4 animate-spin" />,
            color: 'text-blue-600',
            bgColor: 'bg-blue-100',
            label: 'Syncing...',
            description: 'Uploading changes',
        },
        queued: {
            icon: <Upload className="w-4 h-4" />,
            color: 'text-amber-600',
            bgColor: 'bg-amber-100',
            label: `${queueCount} Pending`,
            description: 'Will sync when online',
        },
        error: {
            icon: <AlertCircle className="w-4 h-4" />,
            color: 'text-red-600',
            bgColor: 'bg-red-100',
            label: 'Sync Failed',
            description: errorMessage || 'Tap to retry',
        },
    };

    const config = stateConfig[state];

    // Minimal variant - just icon with tooltip
    if (variant === 'minimal') {
        return (
            <div
                className={cn(
                    "relative group",
                    className
                )}
                title={`${config.label}: ${config.description}`}
            >
                <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                    config.bgColor,
                    config.color
                )}>
                    {config.icon}
                </div>

                {/* Pulse for syncing/queued */}
                {(state === 'syncing' || state === 'queued' || state === 'error') && (
                    <span className={cn(
                        "absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full",
                        state === 'error' ? 'bg-red-500' : 'bg-amber-500',
                        "animate-pulse"
                    )} />
                )}
            </div>
        );
    }

    // Compact variant - icon + label
    if (variant === 'compact') {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={cn(
                    "inline-flex items-center gap-2 px-3 py-1.5 rounded-full",
                    config.bgColor,
                    className
                )}
            >
                <span className={config.color}>{config.icon}</span>
                <span className={cn("text-xs font-medium", config.color)}>
                    {config.label}
                </span>

                {/* Retry button for error state */}
                {state === 'error' && onRetry && (
                    <button
                        onClick={onRetry}
                        className="ml-1 text-red-600 hover:text-red-700"
                    >
                        <RefreshCw className="w-3 h-3" />
                    </button>
                )}
            </motion.div>
        );
    }

    // Full variant - complete card
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
                "p-4 rounded-xl border",
                state === 'error' ? 'border-red-200 bg-red-50' : 'border-slate-200 bg-white',
                className
            )}
        >
            <div className="flex items-center gap-3">
                {/* Icon */}
                <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center",
                    config.bgColor,
                    config.color
                )}>
                    {config.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <p className={cn("text-sm font-medium", config.color)}>
                            {config.label}
                        </p>
                        {state === 'offline' && (
                            <span className="flex items-center gap-1 text-xs text-slate-400">
                                <Cloud className="w-3 h-3" />
                                <CloudOff className="w-3 h-3" />
                            </span>
                        )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                        {config.description}
                    </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    {state === 'queued' && onViewQueue && (
                        <button
                            onClick={onViewQueue}
                            className="text-xs font-medium text-amber-600 hover:text-amber-700 hover:underline"
                        >
                            View Queue
                        </button>
                    )}

                    {state === 'error' && onRetry && (
                        <button
                            onClick={onRetry}
                            className="px-3 py-1.5 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                        >
                            Retry
                        </button>
                    )}
                </div>
            </div>

            {/* Queue preview for queued state */}
            {state === 'queued' && queueCount > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Upload className="w-3 h-3" />
                        <span>{queueCount} item{queueCount > 1 ? 's' : ''} waiting to upload</span>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

// ============================================================================
// HOOK FOR SYNC STATE MANAGEMENT
// ============================================================================

/**
 * Example hook for managing sync state
 * (Implementation depends on your sync infrastructure)
 */
export const useSyncState = () => {
    const [state, setState] = React.useState<SyncState>('online');
    const [queueCount, setQueueCount] = React.useState(0);
    const [lastSynced, setLastSynced] = React.useState<string | undefined>();

    const toast = useToastActions();

    // Listen for online/offline events
    React.useEffect(() => {
        const handleOnline = () => {
            setState(prev => prev === 'offline' ? (queueCount > 0 ? 'queued' : 'online') : prev);
            toast.success('Back Online', 'Connection restored.');
        };
        const handleOffline = () => {
            setState('offline');
            toast.warning('You are offline', 'Changes will be saved locally.');
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        // Initial state
        if (!navigator.onLine) setState('offline');

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, [queueCount, toast]);

    return {
        state,
        queueCount,
        lastSynced,
        setSyncing: () => setState('syncing'),
        setSynced: () => {
            setState('online');
            setLastSynced('just now');
        },
        setError: () => setState('error'),
        addToQueue: () => {
            setQueueCount(c => c + 1);
            toast.info('Saved to Drafts', 'Will sync when online.');
        },
        clearQueue: () => setQueueCount(0),
    };
};
