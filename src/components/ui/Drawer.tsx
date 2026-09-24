'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  side?: 'right' | 'bottom';
  className?: string;
}

export function Drawer({
  isOpen,
  onClose,
  title,
  children,
  side = 'right',
  className,
}: DrawerProps) {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isMounted || !isOpen) return null;

  const sideStyles = {
    right: 'inset-y-0 right-0 w-full sm:w-96 animate-in slide-in-from-right',
    bottom: 'bottom-0 left-0 right-0 h-[85vh] rounded-t-xl animate-in slide-in-from-bottom',
  };

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'drawer-title' : undefined}
        className={cn(
          'fixed z-50 flex flex-col bg-white shadow-xl duration-300',
          sideStyles[side],
          className
        )}
      >
        <div className="flex items-center justify-between border-b border-[#E5E7EB] px-4 py-4 sm:px-6">
          {title && (
            <h2 id="drawer-title" className="text-lg font-semibold text-[#1A1A1A]">
              {title}
            </h2>
          )}
          <button
            onClick={onClose}
            className="rounded-full p-2 opacity-70 transition-opacity hover:bg-gray-100 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
            aria-label="Close drawer"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
