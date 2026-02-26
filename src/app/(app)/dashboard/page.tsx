'use client';

import { Activity, CheckCircle2, XCircle, PauseCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// TODO: Replace with real data from API
const STATS = [
  {
    label: 'Total Monitors',
    value: 0,
    icon: Activity,
    iconClass: 'text-brand',
    iconBg: 'bg-brand-subtle',
  },
  {
    label: 'Up',
    value: 0,
    icon: CheckCircle2,
    iconClass: 'text-status-up',
    iconBg: 'bg-status-up-bg',
  },
  {
    label: 'Down',
    value: 0,
    icon: XCircle,
    iconClass: 'text-status-down',
    iconBg: 'bg-status-down-bg',
  },
  {
    label: 'Paused',
    value: 0,
    icon: PauseCircle,
    iconClass: 'text-status-paused',
    iconBg: 'bg-status-paused-bg',
  },
];

export default function DashboardPage() {
  const hasMonitors = false; // TODO: check from API

  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text-primary">Dashboard</h1>
        <Button size="sm">
          <Activity className="w-3.5 h-3.5" />
          New monitor
        </Button>
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

      {/* Empty state or last incidents */}
      {!hasMonitors ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-4 py-16">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-subtle">
              <Activity className="h-7 w-7 text-brand" />
            </div>
            <div className="text-center">
              <h2 className="font-semibold text-text-primary">No monitors yet</h2>
              <p className="mt-1 text-sm text-text-secondary">
                Create your first monitor to start tracking your APIs.
              </p>
            </div>
            <Button>
              <Activity className="w-4 h-4" />
              Create monitor
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Last incidents</CardTitle>
            <CardDescription>Recent downtime events across all monitors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <CheckCircle2 className="h-8 w-8 text-status-up mb-2" />
              <p className="text-sm text-text-secondary">No incidents recorded</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
