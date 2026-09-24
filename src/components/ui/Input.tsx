'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isSearch?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      isSearch,
      ...props
    },
    ref
  ) => {
    const inputType = isSearch ? 'search' : type;
    const actualLeftIcon = isSearch ? <Search className="h-4 w-4 text-gray-400" /> : leftIcon;

    return (
      <div className="w-full">
        {label && (
          <label className="mb-1.5 block text-sm font-medium text-[#1A1A1A]">
            {label}
          </label>
        )}
        <div className="relative">
          {actualLeftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              {actualLeftIcon}
            </div>
          )}
          <input
            type={inputType}
            ref={ref}
            className={cn(
              'flex h-10 w-full rounded-md border border-[#E5E7EB] bg-white px-3 py-2 text-sm text-[#1A1A1A] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] disabled:cursor-not-allowed disabled:opacity-50 transition-colors',
              actualLeftIcon && 'pl-9',
              rightIcon && 'pr-9',
              error && 'border-red-500 focus:ring-red-500',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
