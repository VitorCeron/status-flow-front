import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { BackofficeTimezone } from '../types';

interface TimezonesTableProps {
  timezones: BackofficeTimezone[];
}

export function TimezonesTable({ timezones }: TimezonesTableProps) {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle>Timezones</CardTitle>
        <CardDescription>User distribution by timezone</CardDescription>
      </CardHeader>
      <CardContent>
        {timezones.length === 0 ? (
          <div className="flex h-32 items-center justify-center text-sm text-text-secondary">
            No data
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-default">
                <th className="pb-2 text-left text-xs font-medium text-text-secondary">Timezone</th>
                <th className="pb-2 text-right text-xs font-medium text-text-secondary">Users</th>
              </tr>
            </thead>
            <tbody>
              {timezones.map((tz) => (
                <tr key={tz.timezone} className="border-b border-border-default last:border-0">
                  <td className="py-3 pr-4 text-text-primary">{tz.timezone}</td>
                  <td className="py-3 text-right font-semibold text-text-primary">{tz.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </CardContent>
    </Card>
  );
}
