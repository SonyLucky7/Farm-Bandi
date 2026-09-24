'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Minus, Plus } from 'lucide-react';

export interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  className,
}: QuantitySelectorProps) {
  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val)) {
      if (val >= min && val <= max) {
        onChange(val);
      } else if (val > max) {
        onChange(max);
      } else if (val < min) {
        onChange(min);
      }
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value === '' || isNaN(parseInt(e.target.value, 10))) {
      onChange(min);
    }
  };

  return (
    <div className={cn('flex items-center rounded-md border border-[#E5E7EB] bg-white', className)}>
      <button
        type="button"
        onClick={handleDecrement}
        disabled={value <= min}
        className="flex h-9 w-9 items-center justify-center text-gray-500 transition-colors hover:bg-gray-100 hover:text-[#1A1A1A] disabled:pointer-events-none disabled:opacity-50"
        aria-label="Decrease quantity"
      >
        <Minus className="h-4 w-4" />
      </button>
      <input
        type="number"
        value={value}
        onChange={handleInputChange}
        onBlur={handleBlur}
        min={min}
        max={max}
        className="h-9 w-12 text-center text-sm font-medium text-[#1A1A1A] focus:outline-none focus:ring-1 focus:ring-[#2D6A4F] [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        aria-label="Quantity"
      />
      <button
        type="button"
        onClick={handleIncrement}
        disabled={value >= max}
        className="flex h-9 w-9 items-center justify-center text-gray-500 transition-colors hover:bg-gray-100 hover:text-[#1A1A1A] disabled:pointer-events-none disabled:opacity-50"
        aria-label="Increase quantity"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}
