import * as React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
}

export function Breadcrumbs({ items, separator = '/', className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex', className)}>
      <ol className="flex items-center space-x-2 text-sm text-gray-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.href} className="flex items-center">
              {isLast ? (
                <span className="font-medium text-[#1A1A1A]" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <>
                  <Link href={item.href} className="hover:text-[#2D6A4F] hover:underline transition-colors">
                    {item.label}
                  </Link>
                  <span className="mx-2 text-gray-400" aria-hidden="true">
                    {separator}
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
