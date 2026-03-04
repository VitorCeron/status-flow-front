export interface ChangePasswordRequest {
  old_password: string;
  password: string;
  password_confirmation: string;
}

export interface TimezoneOption {
  value: string;
  label: string;
}

export interface TimezoneListResponse {
  data: TimezoneOption[];
}

export interface UpdateProfileRequest {
  name: string;
  timezone: string;
}
