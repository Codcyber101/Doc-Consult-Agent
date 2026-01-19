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
      "inline-flex items-center justify-center rounded-xl font-semibold",
      "transition-all duration-200 ease-out",
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2",
      "disabled:opacity-50 disabled:pointer-events-none",
      "select-none cursor-pointer"
    );

    const variants = {
      // Solid emerald (primary action)
      primary: cn(
        "bg-emerald-600 text-white",
        "hover:bg-emerald-700",
        "shadow-[0_4px_14px_0_rgba(0,107,63,0.25)]",
        "hover:shadow-[0_6px_20px_rgba(0,107,63,0.3)]"
      ),

      // Gold accent (secondary action)
      secondary: cn(
        "bg-gold-500 text-slate-900 font-bold",
        "hover:bg-gold-400",
        "shadow-[0_4px_14px_0_rgba(253,184,19,0.25)]",
        "hover:shadow-[0_6px_20px_rgba(253,184,19,0.35)]"
      ),

      // Outlined button
      outline: cn(
        "border-2 border-slate-200 bg-white text-slate-700",
        "hover:border-emerald-500/50 hover:bg-emerald-50/50 hover:text-emerald-700"
      ),

      // Ghost/text button
      ghost: cn(
        "text-slate-600 bg-transparent",
        "hover:bg-slate-100 hover:text-slate-900"
      ),

      // Destructive/danger action
      destructive: cn(
        "bg-red-earth text-white",
        "hover:bg-red-600",
        "shadow-[0_4px_14px_0_rgba(217,78,65,0.25)]"
      ),

      // NEW: Glow variant with animated glow effect
      glow: cn(
        "bg-emerald-600 text-white",
        "shadow-glow-emerald hover:shadow-glow-emerald-lg",
        "hover:bg-emerald-500",
        "relative overflow-hidden",
        // Animated glow ring
        "before:absolute before:inset-0 before:rounded-xl",
        "before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
        "before:translate-x-[-200%] hover:before:translate-x-[200%]",
        "before:transition-transform before:duration-700"
      ),

      // NEW: Gradient variant (emerald to teal)
      gradient: cn(
        "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white",
        "hover:from-emerald-500 hover:to-emerald-400",
        "shadow-[0_4px_20px_0_rgba(0,107,63,0.3)]",
        "hover:shadow-[0_8px_30px_rgba(0,107,63,0.4)]"
      ),

      // NEW: Glass-morphism variant
      glass: cn(
        "bg-white/70 backdrop-blur-md text-slate-800",
        "border border-white/50",
        "hover:bg-white/80",
        "shadow-lg shadow-slate-200/20"
      ),
    };

    const sizes = {
      sm: "h-9 px-4 text-xs gap-1.5",
      md: "h-11 px-6 text-sm gap-2",
      lg: "h-14 px-8 text-base gap-2.5",
      xl: "h-16 px-10 text-lg gap-3",
    };

    // Glow effect on hover (optional enhancement for any variant)
    const glowEffect = glowOnHover ? "hover:shadow-glow-emerald" : "";

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
        <span className="truncate">{children}</span>

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
