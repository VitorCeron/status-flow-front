import { MonitorStatus } from '@/features/monitors/types';

/** A monitor entry as returned inside the dashboard last_monitors array */
export interface DashboardMonitor {
  id: string;
  name: string;
  url: string;
  is_up: boolean;
  status: MonitorStatus;
  created_at: string;
}

/** The data payload from GET /dashboard */
export interface DashboardData {
  total_monitors: number;
  total_up: number;
  total_down: number;
  last_monitors: DashboardMonitor[];
}

/** Full API response shape for GET /dashboard */
export interface DashboardResponse {
  data: DashboardData;
}
