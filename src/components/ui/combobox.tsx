'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Check, Search } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface ComboboxOption {
  value: string;
  label: string;
}

interface ComboboxProps {
  options: ComboboxOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  id?: string;
}

export function Combobox({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  searchPlaceholder = 'Search...',
  label,
  error,
  disabled,
  id,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

  const filtered = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  const selectedLabel = options.find((opt) => opt.value === value)?.label;

  useEffect(() => {
    if (open) {
      setSearch('');
      setTimeout(() => searchRef.current?.focus(), 0);
    }
  }, [open]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleSelect(optValue: string) {
    onChange(optValue);
    setOpen(false);
  }

  return (
    <div className="flex flex-col gap-1.5" ref={containerRef}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-text-primary">
          {label}
        </label>
      )}

      <button
        id={inputId}
        type="button"
        disabled={disabled}
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          'h-9 w-full rounded-lg border bg-bg-surface px-3 text-sm text-left flex items-center justify-between',
          'outline-none transition-colors duration-150',
          error
            ? 'border-status-down focus:border-status-down focus:ring-2 focus:ring-status-down-bg'
            : 'border-border-default focus:border-border-focus focus:ring-2 focus:ring-brand-subtle',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          selectedLabel ? 'text-text-primary' : 'text-text-tertiary'
        )}
      >
        <span className="truncate">{selectedLabel ?? placeholder}</span>
        <ChevronDown
          className={cn('shrink-0 size-4 text-text-secondary transition-transform duration-150', open && 'rotate-180')}
        />
      </button>

      {open && (
        <div className="relative z-50">
          <div className="absolute top-1 left-0 right-0 rounded-lg border border-border-default bg-bg-surface shadow-lg overflow-hidden">
            <div className="flex items-center gap-2 border-b border-border-default px-3 py-2">
              <Search className="shrink-0 size-4 text-text-secondary" />
              <input
                ref={searchRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={searchPlaceholder}
                className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-tertiary outline-none"
              />
            </div>
            <ul className="max-h-52 overflow-y-auto py-1">
              {filtered.length === 0 ? (
                <li className="px-3 py-2 text-sm text-text-secondary">No results found.</li>
              ) : (
                filtered.map((opt) => (
                  <li key={opt.value}>
                    <button
                      type="button"
                      onClick={() => handleSelect(opt.value)}
                      className={cn(
                        'w-full flex items-center justify-between px-3 py-2 text-sm text-left',
                        'text-text-primary hover:bg-bg-subtle transition-colors duration-100',
                        opt.value === value && 'bg-bg-subtle'
                      )}
                    >
                      <span>{opt.label}</span>
                      {opt.value === value && <Check className="shrink-0 size-4 text-brand" />}
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      )}

      {error && <p className="text-xs text-status-down-text">{error}</p>}
    </div>
  );
}
