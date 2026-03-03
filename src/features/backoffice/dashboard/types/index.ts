export interface BackofficeDashboardUser {
  id: string;
  name: string;
  email: string;
  timezone: string;
  created_at: string;
}

export interface BackofficeTimezone {
  timezone: string;
  total: number;
}

export interface BackofficeDashboardData {
  total_users: number;
  total_monitors: number;
  total_up: number;
  total_down: number;
  last_users: BackofficeDashboardUser[];
  timezones: BackofficeTimezone[];
}

export interface BackofficeDashboardResponse {
  data: BackofficeDashboardData;
}
