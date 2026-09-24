'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface RadioOption {
  label: string;
  value: string;
  description?: string;
}

export interface RadioGroupProps {
  options: RadioOption[];
  value?: string;
  onChange: (value: string) => void;
  name: string;
  direction?: 'horizontal' | 'vertical';
  className?: string;
}

export function RadioGroup({
  options,
  value,
  onChange,
  name,
  direction = 'vertical',
  className,
}: RadioGroupProps) {
  return (
    <div
      className={cn(
        'flex',
        direction === 'vertical' ? 'flex-col space-y-3' : 'flex-row space-x-6',
        className
      )}
      role="radiogroup"
    >
      {options.map((option) => (
        <label
          key={option.value}
          className={cn(
            'flex cursor-pointer items-start',
            direction === 'horizontal' && 'items-center'
          )}
        >
          <div className="flex h-5 items-center">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="peer h-5 w-5 appearance-none rounded-full border-2 border-gray-300 bg-white transition-all checked:border-[6px] checked:border-[#2D6A4F] hover:border-[#2D6A4F] focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] focus:ring-offset-2"
            />
          </div>
          <div className={cn('ml-3 flex flex-col', direction === 'horizontal' && 'mt-0')}>
            <span className="text-sm font-medium text-[#1A1A1A]">{option.label}</span>
            {option.description && (
              <span className="text-sm text-gray-500">{option.description}</span>
            )}
          </div>
        </label>
      ))}
    </div>
  );
}
