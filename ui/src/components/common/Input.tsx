'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle2, Eye, EyeOff } from 'lucide-react';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string;
  error?: string;
  helperText?: string;
  /** Show success state */
  success?: boolean;
  /** Input size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Show character count (requires maxLength) */
  showCount?: boolean;
  /** Left icon/addon */
  leftIcon?: React.ReactNode;
  /** Right icon/addon */
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    className,
    label,
    error,
    helperText,
    success = false,
    size = 'md',
    showCount = false,
    leftIcon,
    rightIcon,
    id,
    type,
    maxLength,
    value,
    onChange,
    ...props
  }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [charCount, setCharCount] = useState(
      typeof value === 'string' ? value.length : 0
    );

    // Handle password visibility toggle
    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    // Handle character count
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCharCount(e.target.value.length);
      onChange?.(e);
    };

    // Size variants
    const sizeStyles = {
      sm: {
        input: "h-10 px-3 pt-4 pb-1 text-xs",
        label: "left-3 text-[10px]",
        icon: "h-3.5 w-3.5",
      },
      md: {
        input: "h-12 px-4 pt-5 pb-2 text-sm",
        label: "left-4 text-xs",
        icon: "h-4 w-4",
      },
      lg: {
        input: "h-14 px-5 pt-6 pb-2 text-base",
        label: "left-5 text-sm",
        icon: "h-5 w-5",
      },
    };

    // Shake animation for errors
    const shakeAnimation = {
      shake: {
        x: [0, -8, 8, -8, 8, 0],
        transition: { duration: 0.4 }
      }
    };

    // Border/ring colors based on state
    const stateStyles = error
      ? "border-red-earth focus:border-red-earth focus:ring-red-earth/20"
      : success
        ? "border-primary focus:border-primary focus:ring-primary/20"
        : "border-border hover:border-border focus:border-primary focus:ring-primary/20";

    return (
      <motion.div
        className="relative w-full"
        animate={error ? "shake" : ""}
        variants={shakeAnimation}
      >
        <div className="relative">
          {/* Left icon */}
          {leftIcon && (
            <div className={cn(
              "absolute left-4 top-1/2 -translate-y-1/2 text-slate-400",
              isFocused && "text-primary",
              error && "text-red-earth"
            )}>
              {leftIcon}
            </div>
          )}

          {/* Input field */}
          <input
            id={inputId}
            ref={ref}
            type={inputType}
            placeholder=" "
            maxLength={maxLength}
            value={value}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={cn(
              "peer block w-full rounded-xl border bg-surface text-slate-900",
              "transition-all duration-200 ease-out",
              "focus:outline-none focus:ring-4",
              "disabled:opacity-50 disabled:bg-surface-muted disabled:cursor-not-allowed",
              "placeholder-transparent",
              stateStyles,
              sizeStyles[size].input,
              leftIcon && "pl-11",
              (rightIcon || isPassword || success || error) && "pr-11",
              className
            )}
            {...props}
          />

          {/* Floating label */}
          <label
            htmlFor={inputId}
            className={cn(
              "absolute top-2 origin-[0] -translate-y-0 transform cursor-text font-medium",
              "transition-all duration-200 ease-out",
              // Unfocused/empty state (centered)
              "peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100",
              // Focused/filled state (floated up)
              "peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:scale-75",
              // Color states
              error
                ? "text-red-earth"
                : success
                  ? "text-primary"
                  : "text-slate-500 peer-focus:text-primary",
              sizeStyles[size].label,
              leftIcon && "peer-placeholder-shown:left-11 peer-focus:left-4"
            )}
          >
            {label}
          </label>

          {/* Right side: icons and toggles */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {/* Password toggle */}
            {isPassword && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={cn(
                  "text-slate-400 hover:text-slate-600 transition-colors",
                  sizeStyles[size].icon
                )}
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className={sizeStyles[size].icon} />
                ) : (
                  <Eye className={sizeStyles[size].icon} />
                )}
              </button>
            )}

            {/* Success indicator */}
            {success && !error && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
              >
                <CheckCircle2 className={cn(sizeStyles[size].icon, "text-primary")} />
              </motion.div>
            )}

            {/* Error indicator */}
            {error && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
              >
                <AlertCircle className={cn(sizeStyles[size].icon, "text-red-earth")} />
              </motion.div>
            )}

            {/* Custom right icon */}
            {rightIcon && !isPassword && !success && !error && (
              <span className="text-slate-400">{rightIcon}</span>
            )}
          </div>
        </div>

        {/* Helper text / Error message / Character count */}
        <div className="flex justify-between items-start mt-1.5 px-1">
          <AnimatePresence mode="wait">
            {error && (
              <motion.p
                key="error"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-xs text-red-earth font-medium"
              >
                {error}
              </motion.p>
            )}
            {!error && helperText && (
              <motion.p
                key="helper"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-slate-500"
              >
                {helperText}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Character count */}
          {showCount && maxLength && (
            <span className={cn(
              "text-xs tabular-nums",
              charCount >= maxLength ? "text-red-earth" : "text-slate-400"
            )}>
              {charCount}/{maxLength}
            </span>
          )}
        </div>
      </motion.div>
    );
  }
);

Input.displayName = 'Input';
