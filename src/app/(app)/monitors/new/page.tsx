'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MonitorForm } from '@/features/monitors/components/monitor-form';
import { useCreateMonitor } from '@/features/monitors/hooks/use-create-monitor';

export default function NewMonitorPage() {
  const { onSubmit, isLoading, serverError } = useCreateMonitor();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Link href="/monitors">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-text-primary">New monitor</h1>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Monitor settings</CardTitle>
            <CardDescription>
              Configure the endpoint you want to monitor and how often to check it.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MonitorForm
              onSubmit={onSubmit}
              isLoading={isLoading}
              serverError={serverError}
              submitLabel="Create monitor"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
