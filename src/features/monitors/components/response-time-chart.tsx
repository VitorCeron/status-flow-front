'use client';

import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import type { ResponseTimePoint } from '../types';

interface ResponseTimeChartProps {
  data: ResponseTimePoint[];
}

interface TooltipPayload {
  value: number;
  name: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;

  const avg = payload.find((p) => p.name === 'avg_ms')?.value;
  const min = payload.find((p) => p.name === 'min_ms')?.value;
  const max = payload.find((p) => p.name === 'max_ms')?.value;

  return (
    <div className="rounded-lg border border-border-default bg-bg-overlay px-3 py-2 shadow-md text-xs">
      <p className="font-medium text-text-primary mb-1">{label}</p>
      {avg !== undefined && <p className="text-text-primary">Avg: <span className="font-semibold">{avg} ms</span></p>}
      {min !== undefined && <p className="text-text-secondary">Min: {min} ms</p>}
      {max !== undefined && <p className="text-text-secondary">Max: {max} ms</p>}
    </div>
  );
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function ResponseTimeChart({ data }: ResponseTimeChartProps) {
  if (!data.length) {
    return (
      <div className="flex items-center justify-center h-48 text-sm text-text-secondary">
        No data yet
      </div>
    );
  }

  const chartData = data.map((point) => ({
    ...point,
    date: formatDate(point.date),
    range: [point.min_ms, point.max_ms] as [number, number],
  }));

  return (
    <ResponsiveContainer width="100%" height={220}>
      <ComposedChart data={chartData} margin={{ top: 4, right: 4, left: -8, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-default)" />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 11, fill: 'var(--color-text-secondary)' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: 'var(--color-text-secondary)' }}
          axisLine={false}
          tickLine={false}
          unit=" ms"
        />
        <Tooltip content={<CustomTooltip />} />
        {/* Min/max shaded range */}
        <Area
          type="monotone"
          dataKey="max_ms"
          stroke="none"
          fill="var(--palette-brand-100, #c4cfdf)"
          fillOpacity={0.5}
          legendType="none"
          name="max_ms"
        />
        <Area
          type="monotone"
          dataKey="min_ms"
          stroke="none"
          fill="var(--color-bg-surface)"
          fillOpacity={1}
          legendType="none"
          name="min_ms"
        />
        {/* Avg line */}
        <Line
          type="monotone"
          dataKey="avg_ms"
          stroke="var(--color-brand, #09264e)"
          strokeWidth={2}
          dot={{ r: 3, fill: 'var(--color-brand, #09264e)', strokeWidth: 0 }}
          activeDot={{ r: 5 }}
          name="avg_ms"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
