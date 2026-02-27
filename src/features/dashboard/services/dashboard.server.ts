import { serverApi } from '@/services/server-api';
import type { DashboardResponse } from '../types';

/**
 * Server-side fetch of the dashboard summary data.
 * Returns aggregate monitor counts and the last 5 monitors.
 *
 * @returns Full dashboard response with data payload
 */
export async function getDashboard(): Promise<DashboardResponse> {
  return serverApi<DashboardResponse>('/dashboard');
}
