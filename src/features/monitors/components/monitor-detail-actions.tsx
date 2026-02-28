'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DeleteMonitorDialog } from './delete-monitor-dialog';
import { deleteMonitor } from '../services/monitors.client';

interface MonitorDetailActionsProps {
  monitorId: string;
  monitorName: string;
}

export function MonitorDetailActions({ monitorId, monitorName }: MonitorDetailActionsProps) {
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleConfirmDelete() {
    setIsDeleting(true);
    try {
      await deleteMonitor(monitorId);
      router.push('/monitors');
    } finally {
      setIsDeleting(false);
      setShowDialog(false);
    }
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <Link href={`/monitors/${monitorId}/edit`}>
          <Button size="sm" variant="secondary">
            <Pencil className="h-3.5 w-3.5" />
            Edit
          </Button>
        </Link>
        <Button size="sm" variant="danger" onClick={() => setShowDialog(true)}>
          <Trash2 className="h-3.5 w-3.5" />
          Delete
        </Button>
      </div>

      {showDialog && (
        <DeleteMonitorDialog
          monitorName={monitorName}
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowDialog(false)}
          isLoading={isDeleting}
        />
      )}
    </>
  );
}
