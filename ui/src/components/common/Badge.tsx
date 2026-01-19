'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'warning' | 'error' | 'neutral' | 'info' | 'premium';
  size?: 'sm' | 'md' | 'lg';
  /** Add shimmer animation (great for "Popular", "New" badges) */
  shimmer?: boolean;
  /** Add soft pulse animation (great for "Action Required" badges) */
  pulse?: boolean;
  /** Show a dot indicator before text */
  dot?: boolean;
  /** Dot color (defaults to variant color) */
  dotColor?: string;
}

export const Badge = ({
  className,
  variant = 'neutral',
  size = 'md',
  shimmer = false,
  pulse = false,
  dot = false,
  dotColor,
  children,
  ...props
}: BadgeProps) => {

  const variants = {
    success: cn(
      "bg-emerald-50 text-emerald-700 border-emerald-200",
      "dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800"
    ),
    warning: cn(
      "bg-gold-50 text-gold-700 border-gold-300",
      "dark:bg-gold-900/30 dark:text-gold-300 dark:border-gold-800"
    ),
    error: cn(
      "bg-red-50 text-red-700 border-red-200",
      "dark:bg-red-900/30 dark:text-red-300 dark:border-red-800"
    ),
    neutral: cn(
      "bg-slate-100 text-slate-600 border-slate-200",
      "dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700"
    ),
    info: cn(
      "bg-blue-50 text-blue-700 border-blue-200",
      "dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800"
    ),
    // NEW: Premium variant with gradient shimmer
    premium: cn(
      "bg-gradient-to-r from-gold-100 via-gold-50 to-gold-100",
      "text-gold-800 border-gold-300",
      "font-bold"
    ),
  };

  const sizes = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-2.5 py-0.5 text-xs",
    lg: "px-3 py-1 text-sm",
  };

  // Dot color based on variant
  const dotColors = {
    success: "bg-emerald-500",
    warning: "bg-gold-500",
    error: "bg-red-500",
    neutral: "bg-slate-400",
    info: "bg-blue-500",
    premium: "bg-gold-500",
  };

  // Shimmer effect styles
  const shimmerStyles = shimmer ? cn(
    "relative overflow-hidden",
    "before:absolute before:inset-0",
    "before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent",
    "before:animate-[shimmer_2s_infinite]",
    "before:-translate-x-full"
  ) : "";

  // Pulse animation
  const pulseStyles = pulse ? "animate-pulse-soft" : "";

  const BadgeContent = (
    <>
      {/* Optional dot indicator */}
      {dot && (
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full mr-1.5",
            dotColor || dotColors[variant]
          )}
        />
      )}
      {children}
    </>
  );

  // Use motion component for animated badges, regular span otherwise
  if (shimmer || pulse) {
    return (
      <motion.span
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "inline-flex items-center rounded-full border font-semibold",
          "transition-colors duration-200",
          "focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2",
          variants[variant],
          sizes[size],
          shimmerStyles,
          pulseStyles,
          className
        )}
        {...(props as any)}
      >
        {BadgeContent}
      </motion.span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-semibold",
        "transition-colors duration-200",
        "focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {BadgeContent}
    </span>
  );
};

// ============================================================================
// BADGE EXPORTS
// ============================================================================

export const badgeVariants = [
  'success',
  'warning',
  'error',
  'neutral',
  'info',
  'premium'
] as const;

export const badgeSizes = ['sm', 'md', 'lg'] as const;
