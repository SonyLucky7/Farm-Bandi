'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = [];
  const maxVisiblePages = 5;

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <nav className={cn('flex items-center justify-center space-x-1', className)} aria-label="Pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#E5E7EB] bg-white text-gray-500 hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {startPage > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-transparent text-sm text-gray-700 hover:bg-gray-100"
          >
            1
          </button>
          {startPage > 2 && <span className="px-2 text-gray-400">...</span>}
        </>
      )}

      {pages.map((page) => {
        const isActive = page === currentPage;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'inline-flex h-9 w-9 items-center justify-center rounded-md border text-sm font-medium transition-colors',
              isActive
                ? 'border-[#2D6A4F] bg-[#2D6A4F] text-white'
                : 'border-transparent text-gray-700 hover:bg-gray-100'
            )}
          >
            {page}
          </button>
        );
      })}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="px-2 text-gray-400">...</span>}
          <button
            onClick={() => onPageChange(totalPages)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-transparent text-sm text-gray-700 hover:bg-gray-100"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#E5E7EB] bg-white text-gray-500 hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50"
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}
