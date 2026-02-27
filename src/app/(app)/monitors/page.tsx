import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getMonitors } from '@/features/monitors/services/monitors.server';
import { MonitorList } from '@/features/monitors/components/monitor-list';

export default async function MonitorsPage() {
  const { data: monitors, meta } = await getMonitors();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text-primary">Monitors</h1>
        <Link href="/monitors/new">
          <Button size="sm">
            <Plus className="h-3.5 w-3.5" />
            New monitor
          </Button>
        </Link>
      </div>

      <MonitorList monitors={monitors} meta={meta} />
    </div>
  );
}
