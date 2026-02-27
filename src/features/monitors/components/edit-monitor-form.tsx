'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MonitorForm } from './monitor-form';
import { useEditMonitor } from '../hooks/use-edit-monitor';
import type { Monitor } from '../types';
import type { MonitorFormValues } from '../schemas';

interface EditMonitorFormProps {
  monitor: Monitor;
}

export function EditMonitorForm({ monitor }: EditMonitorFormProps) {
  const { onSubmit, isLoading, serverError } = useEditMonitor(monitor.id);

  const defaultValues: MonitorFormValues = {
    name: monitor.name,
    url: monitor.url,
    method: monitor.method,
    interval: monitor.interval,
    timeout: monitor.timeout,
    fail_threshold: monitor.fail_threshold,
    notify_email: monitor.notify_email,
    is_active: monitor.is_active,
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Link href={`/monitors/${monitor.id}`}>
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-text-primary">Edit monitor</h1>
      </div>

      <div className="max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Monitor settings</CardTitle>
            <CardDescription>Update the configuration for {monitor.name}.</CardDescription>
          </CardHeader>
          <CardContent>
            <MonitorForm
              defaultValues={defaultValues}
              onSubmit={onSubmit}
              isLoading={isLoading}
              serverError={serverError}
              submitLabel="Save changes"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
