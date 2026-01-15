import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    // Generated ID if not provided for label association
    const inputId = id || React.useId();

    return (
      <div className="relative w-full">
        <div className="relative">
          <input
            id={inputId}
            ref={ref}
            placeholder=" " 
            className={cn(
              "peer block w-full rounded-lg border bg-white px-4 pt-4 pb-2 text-sm text-slate-900",
              "focus:outline-none focus:ring-4 transition-all disabled:opacity-50 disabled:bg-slate-50 placeholder-transparent",
              error 
                ? "border-red-earth focus:border-red-earth focus:ring-red-earth/20" 
                : "border-slate-300 focus:border-emerald-500 focus:ring-emerald-500/20",
              className
            )}
            {...props}
          />
          <label
            htmlFor={inputId}
            className={cn(
              "absolute left-4 top-1.5 z-10 origin-[0] -translate-y-1 scale-75 transform cursor-text text-xs duration-300",
              "peer-placeholder-shown:top-3.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-slate-500",
              "peer-focus:top-1.5 peer-focus:scale-75",
              error ? "text-red-earth" : "text-slate-500 peer-focus:text-emerald-600"
            )}
          >
            {label}
          </label>
        </div>
        {error && (
          <p className="mt-1 text-xs text-red-earth flex items-center animate-in slide-in-from-top-1">
             {error}
          </p>
        )}
        {!error && helperText && (
          <p className="mt-1 text-xs text-slate-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';
