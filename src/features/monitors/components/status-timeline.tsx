import type { StatusTimelineItem } from '../types';
import { MonitorStatus } from '../types';

interface StatusTimelineProps {
  timeline: StatusTimelineItem[];
}

function formatTitle(dateStr: string) {
  return new Date(dateStr).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function StatusTimeline({ timeline }: StatusTimelineProps) {
  if (!timeline.length) {
    return (
      <div className="flex items-center justify-center h-10 text-sm text-text-secondary">
        No data yet
      </div>
    );
  }

  // Show up to 50 segments, oldest left → newest right
  const segments = [...timeline].reverse().slice(0, 50);

  return (
    <div className="flex gap-0.5 h-8 items-stretch w-full">
      {segments.map((item, i) => {
        const isUp = item.status === MonitorStatus.UP;
        const isDown = item.status === MonitorStatus.DOWN;

        return (
          <div
            key={i}
            title={`${item.status.toUpperCase()} — ${formatTitle(item.checked_at)}`}
            className={[
              'flex-1 rounded-sm cursor-default transition-opacity hover:opacity-75',
              isUp ? 'bg-status-up' : isDown ? 'bg-status-down' : 'bg-status-paused',
            ].join(' ')}
          />
        );
      })}
    </div>
  );
}
