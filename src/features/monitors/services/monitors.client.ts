import { clientApi } from '@/services/client-api';
import type { Monitor, MonitorRequest, MonitorResponse, MonitorListResponse } from '../types';

const DEFAULT_PER_PAGE = 10;

/**
 * Fetches a paginated list of monitors for the authenticated user.
 *
 * @param page - Page number to fetch (1-based)
 * @param perPage - Number of results per page
 * @returns Full paginated response with data and meta
 */
export async function listMonitors({
  page = 1,
  perPage = DEFAULT_PER_PAGE,
}: { page?: number; perPage?: number } = {}): Promise<MonitorListResponse> {
  return clientApi<MonitorListResponse>(`/monitors?page=${page}&per_page=${perPage}`);
}

/**
 * Fetches a single monitor by ID.
 *
 * @param id - Monitor UUID
 * @returns The monitor object
 */
export async function getMonitor(id: string): Promise<Monitor> {
  const data = await clientApi<MonitorResponse>(`/monitors/${id}`);
  return data.data;
}

/**
 * Creates a new monitor.
 *
 * @param payload - Monitor creation data
 * @returns The newly created monitor
 */
export async function createMonitor(payload: MonitorRequest): Promise<Monitor> {
  const data = await clientApi<MonitorResponse>('/monitors', {
    method: 'POST',
    body: payload,
  });
  return data.data;
}

/**
 * Updates an existing monitor.
 *
 * @param id - Monitor UUID
 * @param payload - Updated monitor data
 * @returns The updated monitor
 */
export async function updateMonitor(id: string, payload: MonitorRequest): Promise<Monitor> {
  const data = await clientApi<MonitorResponse>(`/monitors/${id}`, {
    method: 'PUT',
    body: payload,
  });
  return data.data;
}

/**
 * Deletes a monitor by ID.
 *
 * @param id - Monitor UUID
 */
export async function deleteMonitor(id: string): Promise<void> {
  await clientApi<void>(`/monitors/${id}`, { method: 'DELETE' });
}
