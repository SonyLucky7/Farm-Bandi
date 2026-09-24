'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown, Search } from 'lucide-react';

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps {
  label?: string;
  options: SelectOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchable?: boolean;
  error?: string;
  className?: string;
}

export function Select({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  searchable = false,
  error,
  className,
}: SelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className={cn('relative w-full', className)} ref={containerRef}>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-[#1A1A1A]">
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex h-10 w-full items-center justify-between rounded-md border border-[#E5E7EB] bg-white px-3 py-2 text-sm text-[#1A1A1A] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]',
          error && 'border-red-500 focus:ring-red-500',
          !selectedOption && 'text-gray-400'
        )}
      >
        <span className="truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className="h-4 w-4 text-gray-500" />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-md border border-[#E5E7EB] bg-white shadow-lg animate-in fade-in zoom-in-95">
          {searchable && (
            <div className="border-b border-[#E5E7EB] p-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search..."
                  className="w-full rounded-md bg-gray-50 py-1.5 pl-9 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
                />
              </div>
            </div>
          )}
          <ul className="max-h-60 overflow-auto py-1">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => (
                <li
                  key={opt.value}
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                    setSearch('');
                  }}
                  className={cn(
                    'cursor-pointer px-3 py-2 text-sm hover:bg-gray-100',
                    value === opt.value && 'bg-green-50 text-[#2D6A4F] font-medium'
                  )}
                >
                  {opt.label}
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-sm text-gray-500 text-center">
                No results found
              </li>
            )}
          </ul>
        </div>
      )}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
