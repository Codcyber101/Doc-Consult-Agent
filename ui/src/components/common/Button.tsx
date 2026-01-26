'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'glow' | 'gradient' | 'glass';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  /** Add a subtle glow effect on hover */
  glowOnHover?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant = 'primary',
    size = 'md',
    isLoading,
    leftIcon,
    rightIcon,
    glowOnHover = false,
    children,
    disabled,
    ...props
  }, ref) => {

    const baseStyles = cn(
      "inline-flex items-center justify-center rounded-xl font-bold",
      "transition-all duration-200 ease-out",
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
      "disabled:opacity-50 disabled:pointer-events-none",
      "select-none cursor-pointer"
    );

    const variants = {
      // Primary Blue Action
      primary: cn(
        "bg-primary text-white",
        "hover:bg-primary-dark",
        "shadow-[0_4px_14px_0_rgba(17,82,212,0.25)]",
        "hover:shadow-[0_6px_20px_rgba(17,82,212,0.3)]"
      ),

      // Secondary Accent
      secondary: cn(
        "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white",
        "hover:bg-slate-200 dark:hover:bg-slate-700",
      ),

      // Outlined button
      outline: cn(
        "border-2 border-slate-200 dark:border-slate-800 bg-transparent text-slate-700 dark:text-slate-300",
        "hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
      ),

      // Ghost/text button
      ghost: cn(
        "text-slate-600 dark:text-slate-400 bg-transparent",
        "hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
      ),

      // Destructive/danger action
      destructive: cn(
        "bg-red-500 text-white",
        "hover:bg-red-600",
        "shadow-[0_4px_14px_0_rgba(239,68,68,0.25)]"
      ),

      // Glow variant with animated glow effect
      glow: cn(
        "bg-primary text-white",
        "shadow-glow-primary hover:shadow-glow-primary",
        "hover:bg-primary-dark",
        "relative overflow-hidden",
        "before:absolute before:inset-0 before:rounded-xl",
        "before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
        "before:translate-x-[-200%] hover:before:translate-x-[200%]",
        "before:transition-transform before:duration-700"
      ),

      // Gradient variant
      gradient: cn(
        "bg-gradient-to-r from-primary to-blue-600 text-white",
        "hover:from-blue-600 hover:to-blue-700",
        "shadow-[0_4px_20px_0_rgba(17,82,212,0.3)]",
        "hover:shadow-[0_8px_30px_rgba(17,82,212,0.4)]"
      ),

      // Glass-morphism variant
      glass: cn(
        "bg-white/10 backdrop-blur-md text-white",
        "border border-white/20",
        "hover:bg-white/20",
      ),
    };

    const sizes = {
      sm: "h-9 px-4 text-xs gap-1.5",
      md: "h-11 px-6 text-sm gap-2",
      lg: "h-14 px-8 text-base gap-2.5",
      xl: "h-16 px-10 text-lg gap-3",
    };

    // Glow effect on hover
    const glowEffect = glowOnHover ? "hover:shadow-glow-primary" : "";

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        disabled={disabled || isLoading}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          glowEffect,
          className
        )}
        {...props}
      >
        {/* Loading spinner */}
        {isLoading && (
          <Loader2 className="h-4 w-4 animate-spin" />
        )}

        {/* Left icon */}
        {!isLoading && leftIcon && (
          <span className="shrink-0">{leftIcon}</span>
        )}

        {/* Button text */}
        <span className="truncate">{children as React.ReactNode}</span>

        {/* Right icon */}
        {!isLoading && rightIcon && (
          <span className="shrink-0">{rightIcon}</span>
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

// ============================================================================
// BUTTON VARIANTS EXPORT (for documentation/storybook)
// ============================================================================

export const buttonVariants = [
  'primary',
  'secondary',
  'outline',
  'ghost',
  'destructive',
  'glow',
  'gradient',
  'glass'
] as const;

export const buttonSizes = ['sm', 'md', 'lg', 'xl'] as const;
