import { serverApi } from '@/services/server-api';
import type { Monitor, MonitorResponse, MonitorListResponse } from '../types';

const DEFAULT_PER_PAGE = 10;

/**
 * Server-side fetch of the first page of monitors.
 *
 * @param page - Page number to fetch (1-based)
 * @param perPage - Number of results per page
 * @returns Full paginated response with data and meta
 */
export async function getMonitors({
  page = 1,
  perPage = DEFAULT_PER_PAGE,
}: { page?: number; perPage?: number } = {}): Promise<MonitorListResponse> {
  return serverApi<MonitorListResponse>(`/monitors?page=${page}&per_page=${perPage}`);
}

/**
 * Server-side fetch of a single monitor by ID.
 * Returns null if not found or on error.
 *
 * @param id - Monitor UUID
 * @returns The monitor or null
 */
export async function getMonitorById(id: string): Promise<Monitor | null> {
  try {
    const data = await serverApi<MonitorResponse>(`/monitors/${id}`);
    return data.data;
  } catch {
    return null;
  }
}
