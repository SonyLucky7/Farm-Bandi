'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TabOption {
  label: string;
  value: string;
}

export interface TabsProps {
  tabs: TabOption[];
  activeTab: string;
  onChange: (value: string) => void;
  children?: React.ReactNode;
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, children, className }: TabsProps) {
  return (
    <div className={cn('w-full', className)}>
      <div className="relative border-b border-[#E5E7EB]">
        <nav className="flex space-x-8 overflow-x-auto no-scrollbar" aria-label="Tabs">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => onChange(tab.value)}
                className={cn(
                  'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2D6A4F]',
                  isActive
                    ? 'border-[#2D6A4F] text-[#2D6A4F]'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
