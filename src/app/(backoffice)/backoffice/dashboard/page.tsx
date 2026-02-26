'use client';

import { Users, Activity, CheckCircle2, XCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const STATS = [
  {
    label: 'Total Users',
    value: 0,
    icon: Users,
    iconClass: 'text-brand',
    iconBg: 'bg-brand-subtle',
  },
  {
    label: 'Total Monitors',
    value: 0,
    icon: Activity,
    iconClass: 'text-text-secondary',
    iconBg: 'bg-bg-sunken',
  },
  {
    label: 'Monitors Up',
    value: 0,
    icon: CheckCircle2,
    iconClass: 'text-status-up',
    iconBg: 'bg-status-up-bg',
  },
  {
    label: 'Monitors Down',
    value: 0,
    icon: XCircle,
    iconClass: 'text-status-down',
    iconBg: 'bg-status-down-bg',
  },
];

export default function BackofficeDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Backoffice</h1>
          <p className="mt-0.5 text-sm text-text-secondary">System overview and administration</p>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {STATS.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-text-secondary">{stat.label}</p>
                  <p className="mt-1 text-2xl font-bold text-text-primary">{stat.value}</p>
                </div>
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.iconBg}`}>
                  <stat.icon className={`h-5 w-5 ${stat.iconClass}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
