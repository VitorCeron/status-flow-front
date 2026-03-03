import { serverApi } from '@/services/server-api';
import type { BackofficeDashboardResponse } from '../types';

export async function getBackofficeDashboard(): Promise<BackofficeDashboardResponse> {
  return serverApi<BackofficeDashboardResponse>('/backoffice/dashboard');
}
