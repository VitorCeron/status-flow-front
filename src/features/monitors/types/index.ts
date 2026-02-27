/**
 * HTTP methods supported for monitor checks.
 * @enum {string}
 */
export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
}

/**
 * Possible statuses of a monitor.
 * @enum {string}
 */
export enum MonitorStatus {
  UNKNOWN = 'unknown',
  UP = 'up',
  DOWN = 'down',
  PAUSED = 'paused',
}

/** Check interval options in seconds */
export const INTERVAL_OPTIONS = [
  { value: 60, label: '1 minute' },
  { value: 300, label: '5 minutes' },
  { value: 600, label: '10 minutes' },
] as const;

export type IntervalValue = (typeof INTERVAL_OPTIONS)[number]['value'];

/** Full monitor object returned by the API */
export interface Monitor {
  id: string;
  user_id: string;
  name: string;
  url: string;
  method: HttpMethod;
  interval: IntervalValue;
  timeout: number;
  fail_threshold: number;
  notify_email: string;
  is_active: boolean;
  status: MonitorStatus;
  last_checked_at: string | null;
  created_at: string;
  updated_at: string;
}

/** Body sent to POST /monitors and PUT /monitors/:id */
export interface MonitorRequest {
  name: string;
  url: string;
  method: HttpMethod;
  interval: IntervalValue;
  timeout: number;
  fail_threshold: number;
  notify_email: string;
  is_active: boolean;
}

/** Wrapper shape for single monitor API responses */
export interface MonitorResponse {
  data: Monitor;
}

/** Pagination meta returned by the API list endpoint */
export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
}

/** Pagination links returned by the API list endpoint */
export interface PaginationLinks {
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
}

/** Wrapper shape for monitor list API responses */
export interface MonitorListResponse {
  data: Monitor[];
  meta: PaginationMeta;
  links: PaginationLinks;
}
