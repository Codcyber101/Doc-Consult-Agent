import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
    
    const baseStyles = "inline-flex items-center justify-center rounded-xl font-semibold transition-all focus:outline-none focus:ring-4 focus:ring-emerald-500/10 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] select-none";
    
    const variants = {
      primary: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-[0_4px_14px_0_rgba(0,107,63,0.25)] hover:shadow-[0_6px_20px_rgba(0,107,63,0.23)]",
      secondary: "bg-gold-500 text-slate-900 hover:bg-gold-600 shadow-[0_4px_14px_0_rgba(253,184,19,0.25)]",
      outline: "border-2 border-slate-200 bg-white text-slate-700 hover:border-emerald-600/30 hover:bg-emerald-50/30 hover:text-emerald-700",
      ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
      destructive: "bg-red-earth text-white hover:bg-red-600 shadow-[0_4px_14px_0_rgba(217,78,65,0.25)]",
    };

    const sizes = {
      sm: "h-9 px-4 text-xs",
      md: "h-11 px-6 text-sm",
      lg: "h-14 px-8 text-base",
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.97 }}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {!isLoading && leftIcon && <span className="mr-2 shrink-0">{leftIcon}</span>}
        <span className="truncate">{children}</span>
        {!isLoading && rightIcon && <span className="ml-2 shrink-0">{rightIcon}</span>}
      </motion.button>
    );
  }
);
Button.displayName = 'Button';
