'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
  error?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="flex items-start">
        <div className="flex h-5 items-center">
          <div className="relative flex items-center justify-center">
            <input
              type="checkbox"
              ref={ref}
              className={cn(
                'peer h-5 w-5 appearance-none rounded-md border-2 border-gray-300 bg-white transition-all checked:border-[#2D6A4F] checked:bg-[#2D6A4F] hover:border-[#2D6A4F] focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                error && 'border-red-500',
                className
              )}
              {...props}
            />
            <Check className="pointer-events-none absolute h-3.5 w-3.5 text-white opacity-0 transition-opacity peer-checked:opacity-100" strokeWidth={3} />
          </div>
        </div>
        {label && (
          <div className="ml-3 text-sm">
            <label className={cn("font-medium text-[#1A1A1A]", props.disabled && "opacity-50 cursor-not-allowed")}>
              {label}
            </label>
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
          </div>
        )}
      </div>
    );
  }
);
Checkbox.displayName = 'Checkbox';

export { Checkbox };
