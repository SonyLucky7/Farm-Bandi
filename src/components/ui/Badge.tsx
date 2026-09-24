import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'discount' | 'new' | 'bestseller' | 'organic' | 'outOfStock' | 'featured';
  size?: 'sm' | 'md';
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'sm', children, ...props }, ref) => {
    const variants = {
      default: 'bg-gray-100 text-gray-800',
      discount: 'bg-red-100 text-red-700',
      new: 'bg-green-100 text-green-700',
      bestseller: 'bg-[#D4A373] text-white',
      organic: 'bg-[#2D6A4F] text-white',
      outOfStock: 'bg-gray-200 text-gray-500 line-through',
      featured: 'bg-purple-100 text-purple-700',
    };

    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-1 text-sm',
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full font-medium transition-colors',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);
Badge.displayName = 'Badge';

export { Badge };
