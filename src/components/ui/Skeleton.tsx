import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circle' | 'rectangle' | 'productCard' | 'productGrid';
}

function Skeleton({ className, variant = 'text', ...props }: SkeletonProps) {
  const base = 'animate-pulse rounded-md bg-gray-200';

  if (variant === 'productCard') {
    return (
      <div className={cn('flex flex-col space-y-3', className)} {...props}>
        <div className={cn(base, 'h-48 w-full rounded-xl')} />
        <div className="space-y-2">
          <div className={cn(base, 'h-4 w-3/4')} />
          <div className={cn(base, 'h-4 w-1/2')} />
        </div>
      </div>
    );
  }

  if (variant === 'productGrid') {
    return (
      <div className={cn('grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4', className)} {...props}>
        {[...Array(8)].map((_, i) => (
          <Skeleton key={i} variant="productCard" />
        ))}
      </div>
    );
  }

  const variants = {
    text: 'h-4 w-full',
    circle: 'h-12 w-12 rounded-full',
    rectangle: 'h-24 w-full',
  };

  return (
    <div
      className={cn(base, variants[variant], className)}
      {...props}
    />
  );
}

export { Skeleton };
