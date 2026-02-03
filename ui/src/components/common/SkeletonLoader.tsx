'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Shape variant */
    variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
    /** Animation style */
    animation?: 'shimmer' | 'pulse' | 'none';
    /** Width (use Tailwind classes or inline style) */
    width?: string | number;
    /** Height (use Tailwind classes or inline style) */
    height?: string | number;
    /** Number of text lines (only for 'text' variant) */
    lines?: number;
}

/**
 * SkeletonLoader - Premium loading placeholder component
 * 
 * Use this to show loading states while content is being fetched.
 * Matches the actual content dimensions for smooth transitions.
 */
export const SkeletonLoader = React.forwardRef<HTMLDivElement, SkeletonLoaderProps>(
    ({
        className,
        variant = 'rectangular',
        animation = 'shimmer',
        width,
        height,
        lines = 1,
        style,
        ...props
    }, ref) => {

        // Variant styles
        const variantStyles = {
            text: 'h-4 rounded',
            circular: 'rounded-full aspect-square',
            rectangular: 'rounded-lg',
            rounded: 'rounded-2xl',
        };

        // Animation styles
        const animationStyles = {
            shimmer: cn(
                'relative overflow-hidden',
                'bg-surface-muted dark:bg-slate-700',
                // Shimmer gradient overlay
                'before:absolute before:inset-0',
                'before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent',
                'before:animate-[shimmer_1.5s_infinite]',
                'before:-translate-x-full'
            ),
            pulse: 'bg-surface-muted dark:bg-slate-700 animate-pulse',
            none: 'bg-surface-muted dark:bg-slate-700',
        };

        // Build inline styles for explicit width/height
        const dimensionStyle: React.CSSProperties = {
            ...style,
            ...(typeof width === 'number' ? { width: `${width}px` } : width ? { width } : {}),
            ...(typeof height === 'number' ? { height: `${height}px` } : height ? { height } : {}),
        };

        // For text variant with multiple lines
        if (variant === 'text' && lines > 1) {
            return (
                <div ref={ref} className={cn("flex flex-col gap-2", className)} {...props}>
                    {Array.from({ length: lines }).map((_, i) => (
                        <div
                            key={i}
                            className={cn(
                                variantStyles[variant],
                                animationStyles[animation],
                                // Last line is shorter for natural text appearance
                                i === lines - 1 && 'w-3/4'
                            )}
                            style={i === lines - 1 ? {} : dimensionStyle}
                        />
                    ))}
                </div>
            );
        }

        return (
            <div
                ref={ref}
                className={cn(
                    variantStyles[variant],
                    animationStyles[animation],
                    className
                )}
                style={dimensionStyle}
                {...props}
            />
        );
    }
);

SkeletonLoader.displayName = 'SkeletonLoader';

// ============================================================================
// PRESET SKELETON COMPOSITIONS
// ============================================================================

interface SkeletonPresetProps extends React.HTMLAttributes<HTMLDivElement> { }

/** Avatar skeleton */
export const SkeletonAvatar = ({ className, ...props }: SkeletonPresetProps) => (
    <SkeletonLoader
        variant="circular"
        className={cn("w-10 h-10", className)}
        {...props}
    />
);

/** Button skeleton */
export const SkeletonButton = ({ className, ...props }: SkeletonPresetProps) => (
    <SkeletonLoader
        variant="rounded"
        className={cn("w-24 h-10", className)}
        {...props}
    />
);

/** Card skeleton */
export const SkeletonCard = ({ className, ...props }: SkeletonPresetProps) => (
    <div className={cn("space-y-4", className)} {...props}>
        <SkeletonLoader variant="rounded" className="w-full h-32" />
        <SkeletonLoader variant="text" className="w-3/4" />
        <SkeletonLoader variant="text" className="w-1/2" />
    </div>
);

/** Service tile skeleton (matches ServiceTile component) */
export const SkeletonServiceTile = ({ className, ...props }: SkeletonPresetProps) => (
    <div className={cn("p-8 rounded-[2rem] border border-border bg-surface", className)} {...props}>
        <div className="flex items-start justify-between mb-6">
            <SkeletonLoader variant="rounded" className="w-14 h-14" />
            <SkeletonLoader variant="rounded" className="w-16 h-6" />
        </div>
        <SkeletonLoader variant="text" className="w-2/3 h-6 mb-3" />
        <SkeletonLoader variant="text" lines={2} className="w-full" />
    </div>
);

/** Activity item skeleton */
export const SkeletonActivityItem = ({ className, ...props }: SkeletonPresetProps) => (
    <div className={cn("flex items-start gap-4", className)} {...props}>
        <SkeletonLoader variant="rounded" className="w-10 h-10 shrink-0" />
        <div className="flex-1 space-y-2">
            <SkeletonLoader variant="text" className="w-3/4" />
            <SkeletonLoader variant="text" className="w-1/2" />
            <SkeletonLoader variant="rounded" className="w-full h-2 mt-2" />
        </div>
    </div>
);
