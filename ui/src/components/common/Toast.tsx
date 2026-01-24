'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CheckCircle2,
    AlertCircle,
    AlertTriangle,
    Info,
    X
} from 'lucide-react';

// ============================================================================
// TYPES
// ============================================================================

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
    id: string;
    type: ToastType;
    title: string;
    description?: string;
    duration?: number;
    action?: {
        label: string;
        onClick: () => void;
    };
}

interface ToastContextType {
    toasts: Toast[];
    addToast: (toast: Omit<Toast, 'id'>) => string;
    removeToast: (id: string) => void;
    clearAll: () => void;
}

// ============================================================================
// CONTEXT
// ============================================================================

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

// ============================================================================
// PROVIDER
// ============================================================================

interface ToastProviderProps {
    children: React.ReactNode;
    /** Position of toast container */
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
    /** Maximum number of visible toasts */
    maxVisible?: number;
}

export const ToastProvider = ({
    children,
    position = 'top-right',
    maxVisible = 5
}: ToastProviderProps) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
        const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const newToast: Toast = {
            ...toast,
            id,
            duration: toast.duration ?? 5000
        };

        setToasts(prev => {
            const updated = [newToast, ...prev];
            return updated.slice(0, maxVisible);
        });

        // Auto remove after duration
        if (newToast.duration && newToast.duration > 0) {
            setTimeout(() => {
                removeToast(id);
            }, newToast.duration);
        }

        return id;
    }, [maxVisible]);

    const removeToast = useCallback((id: string) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    const clearAll = useCallback(() => {
        setToasts([]);
    }, []);

    // Position styles
    const positionStyles = {
        'top-right': 'top-4 right-4',
        'top-left': 'top-4 left-4',
        'bottom-right': 'bottom-4 right-4',
        'bottom-left': 'bottom-4 left-4',
        'top-center': 'top-4 left-1/2 -translate-x-1/2',
        'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
    };

    return (
        <ToastContext.Provider value={{ toasts, addToast, removeToast, clearAll }}>
            {children}

            {/* Toast container */}
            <div
                className={cn(
                    "fixed z-[100] flex flex-col gap-3 pointer-events-none",
                    positionStyles[position]
                )}
                style={{ maxWidth: '420px', width: '100%' }}
            >
                <AnimatePresence mode="popLayout">
                    {toasts.map(toast => (
                        <ToastItem
                            key={toast.id}
                            toast={toast}
                            onClose={() => removeToast(toast.id)}
                        />
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};

// ============================================================================
// TOAST ITEM
// ============================================================================

interface ToastItemProps {
    toast: Toast;
    onClose: () => void;
}

const ToastItem = ({ toast, onClose }: ToastItemProps) => {
    const icons = {
        success: <CheckCircle2 className="h-5 w-5 text-emerald-500" />,
        error: <AlertCircle className="h-5 w-5 text-red-500" />,
        warning: <AlertTriangle className="h-5 w-5 text-amber-500" />,
        info: <Info className="h-5 w-5 text-blue-500" />,
    };

    const borderColors = {
        success: 'border-l-emerald-500',
        error: 'border-l-red-500',
        warning: 'border-l-amber-500',
        info: 'border-l-blue-500',
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, transition: { duration: 0.2 } }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className={cn(
                "pointer-events-auto",
                "flex items-start gap-3 p-4",
                "bg-white/95 backdrop-blur-lg rounded-xl",
                "border border-slate-200 border-l-4",
                "shadow-xl shadow-slate-200/50",
                borderColors[toast.type]
            )}
        >
            {/* Icon */}
            <div className="shrink-0 mt-0.5">
                {icons[toast.type]}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-900 text-sm">
                    {toast.title}
                </p>
                {toast.description && (
                    <p className="text-sm text-slate-500 mt-1">
                        {toast.description}
                    </p>
                )}
                {toast.action && (
                    <button
                        onClick={toast.action.onClick}
                        className="mt-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
                    >
                        {toast.action.label}
                    </button>
                )}
            </div>

            {/* Close button */}
            <button
                onClick={onClose}
                className="shrink-0 p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
                <X className="h-4 w-4" />
            </button>
        </motion.div>
    );
};

// ============================================================================
// CONVENIENCE HOOKS
// ============================================================================

/**
 * Convenience hook for showing toasts
 */
export const useToastActions = () => {
    const { addToast } = useToast();

    return {
        success: (title: string, description?: string) =>
            addToast({ type: 'success', title, description }),

        error: (title: string, description?: string) =>
            addToast({ type: 'error', title, description }),

        warning: (title: string, description?: string) =>
            addToast({ type: 'warning', title, description }),

        info: (title: string, description?: string) =>
            addToast({ type: 'info', title, description }),
    };
};
