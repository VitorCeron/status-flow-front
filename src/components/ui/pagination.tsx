import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Button } from './button';

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  perPage: number;
  total: number;
  from: number;
  to: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
  perPageOptions?: number[];
}

const DEFAULT_PER_PAGE_OPTIONS = [10, 15, 50];

function getPageNumbers(currentPage: number, lastPage: number): (number | '…')[] {
  if (lastPage <= 7) {
    return Array.from({ length: lastPage }, (_, i) => i + 1);
  }

  const pages: (number | '…')[] = [1];

  if (currentPage > 3) pages.push('…');

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(lastPage - 1, currentPage + 1);

  for (let i = start; i <= end; i++) pages.push(i);

  if (currentPage < lastPage - 2) pages.push('…');

  pages.push(lastPage);

  return pages;
}

export function Pagination({
  currentPage,
  lastPage,
  perPage,
  total,
  from,
  to,
  onPageChange,
  onPerPageChange,
  perPageOptions = DEFAULT_PER_PAGE_OPTIONS,
}: PaginationProps) {
  const pages = getPageNumbers(currentPage, lastPage);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-text-secondary">
        Showing {from}–{to} of {total}
      </p>

      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {pages.map((page, i) =>
          page === '…' ? (
            <span key={`ellipsis-${i}`} className="px-1 text-sm text-text-secondary select-none">
              …
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={cn(
                'flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-sm font-medium transition-colors',
                page === currentPage
                  ? 'bg-brand text-white'
                  : 'text-text-secondary hover:bg-bg-sunken'
              )}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </button>
          )
        )}

        <Button
          variant="secondary"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === lastPage}
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        <select
          value={perPage}
          onChange={(e) => onPerPageChange(Number(e.target.value))}
          className="ml-2 rounded-lg border border-border-default bg-bg-surface px-2 py-1 text-sm text-text-primary focus:outline-none"
          aria-label="Items per page"
        >
          {perPageOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt} / page
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
