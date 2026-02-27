import type { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface StatsCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  iconClass: string;
  iconBg: string;
}

export function StatsCard({ label, value, icon: Icon, iconClass, iconBg }: StatsCardProps) {
  return (
    <Card>
      <CardContent className="pt-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-text-secondary">{label}</p>
            <p className="mt-1 text-2xl font-bold text-text-primary">{value}</p>
          </div>
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconBg}`}>
            <Icon className={`h-5 w-5 ${iconClass}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
