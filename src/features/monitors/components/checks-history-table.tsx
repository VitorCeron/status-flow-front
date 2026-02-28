import { Badge } from '@/components/ui/badge';
import type { CheckHistoryItem } from '../types';
import { MonitorStatus } from '../types';

interface ChecksHistoryTableProps {
  checks: CheckHistoryItem[];
}

const STATUS_BADGE: Record<MonitorStatus, 'up' | 'down' | 'paused' | 'default'> = {
  [MonitorStatus.UP]: 'up',
  [MonitorStatus.DOWN]: 'down',
  [MonitorStatus.PAUSED]: 'paused',
  [MonitorStatus.UNKNOWN]: 'default',
};

function formatCheckedAt(dateStr: string) {
  return new Date(dateStr).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function ChecksHistoryTable({ checks }: ChecksHistoryTableProps) {
  if (!checks.length) {
    return (
      <div className="flex items-center justify-center h-32 text-sm text-text-secondary">
        No checks yet
      </div>
    );
  }

  return (
    <div className="overflow-auto max-h-[260px]">
      <table className="w-full text-sm">
        <thead className="sticky top-0 bg-bg-surface">
          <tr className="border-b border-border-default">
            <th className="text-left py-2 pr-3 text-xs font-medium text-text-secondary">Status</th>
            <th className="text-left py-2 pr-3 text-xs font-medium text-text-secondary">Code</th>
            <th className="text-right py-2 pr-3 text-xs font-medium text-text-secondary">Time</th>
            <th className="text-right py-2 text-xs font-medium text-text-secondary">Checked at</th>
          </tr>
        </thead>
        <tbody>
          {checks.slice(0, 20).map((check) => (
            <tr key={check.id} className="border-b border-border-default last:border-0">
              <td className="py-2 pr-3">
                <Badge variant={STATUS_BADGE[check.status]} dot>
                  {check.status}
                </Badge>
              </td>
              <td className="py-2 pr-3 text-text-primary font-mono">{check.response_code}</td>
              <td className="py-2 pr-3 text-right text-text-secondary">{check.response_time_ms} ms</td>
              <td className="py-2 text-right text-text-secondary whitespace-nowrap">
                {formatCheckedAt(check.checked_at)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
