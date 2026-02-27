import { notFound } from 'next/navigation';
import { getMonitorById } from '@/features/monitors/services/monitors.server';
import { EditMonitorForm } from '@/features/monitors/components/edit-monitor-form';

interface EditMonitorPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditMonitorPage({ params }: EditMonitorPageProps) {
  const { id } = await params;
  const monitor = await getMonitorById(id);

  if (!monitor) {
    notFound();
  }

  return <EditMonitorForm monitor={monitor} />;
}
