import * as React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from './Badge';

export interface PriceProps {
  price: number;
  compareAtPrice?: number;
  currency?: string;
  size?: 'sm' | 'md' | 'lg';
  showDiscount?: boolean;
  className?: string;
}

export function Price({
  price,
  compareAtPrice,
  currency = '$',
  size = 'md',
  showDiscount = false,
  className,
}: PriceProps) {
  const sizes = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl',
  };

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD', // Using USD as default but symbol is overridable conceptually
    }).format(val).replace('$', currency);
  };

  const isDiscounted = compareAtPrice && compareAtPrice > price;
  
  let discountPercentage = 0;
  if (isDiscounted) {
    discountPercentage = Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
  }

  return (
    <div className={cn('flex items-center flex-wrap gap-2', className)}>
      <span className={cn('font-bold text-[#1A1A1A]', sizes[size])}>
        {formatPrice(price)}
      </span>
      {isDiscounted && (
        <span className="text-sm text-gray-400 line-through">
          {formatPrice(compareAtPrice)}
        </span>
      )}
      {isDiscounted && showDiscount && (
        <Badge variant="discount" size="sm">
          {discountPercentage}% OFF
        </Badge>
      )}
    </div>
  );
}
