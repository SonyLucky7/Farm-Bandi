'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';

export interface RatingProps {
  value: number;
  count?: number;
  max?: number;
  readOnly?: boolean;
  onChange?: (value: number) => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Rating({
  value,
  count,
  max = 5,
  readOnly = true,
  onChange,
  size = 'md',
  className,
}: RatingProps) {
  const [hoverValue, setHoverValue] = React.useState<number | null>(null);

  const sizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-6 w-6',
  };

  const handleMouseEnter = (index: number) => {
    if (!readOnly) setHoverValue(index);
  };

  const handleMouseLeave = () => {
    if (!readOnly) setHoverValue(null);
  };

  const handleClick = (index: number) => {
    if (!readOnly && onChange) onChange(index);
  };

  const displayValue = hoverValue !== null ? hoverValue : value;

  return (
    <div className={cn('flex items-center', className)}>
      <div
        className="flex"
        onMouseLeave={handleMouseLeave}
        role={readOnly ? 'img' : 'radiogroup'}
        aria-label={`Rating: ${value} out of ${max} stars`}
      >
        {[...Array(max)].map((_, i) => {
          const ratingValue = i + 1;
          const isFilled = ratingValue <= displayValue;
          
          return (
            <span
              key={i}
              className={cn(
                'text-[#D4A373] transition-colors',
                !readOnly && 'cursor-pointer hover:scale-110'
              )}
              onMouseEnter={() => handleMouseEnter(ratingValue)}
              onClick={() => handleClick(ratingValue)}
              role={!readOnly ? 'radio' : undefined}
              aria-checked={!readOnly ? ratingValue === value : undefined}
              tabIndex={!readOnly ? 0 : undefined}
            >
              <Star
                className={cn(sizes[size])}
                fill={isFilled ? 'currentColor' : 'transparent'}
                strokeWidth={isFilled ? 0 : 2}
              />
            </span>
          );
        })}
      </div>
      {count !== undefined && (
        <span className="ml-2 text-sm text-gray-500">
          ({count})
        </span>
      )}
    </div>
  );
}
