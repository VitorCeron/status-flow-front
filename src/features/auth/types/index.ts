/**
 * User roles in the system.
 * @enum {string}
 */
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

/** Authenticated user shape returned by the API */
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  timezone: string;
  role: UserRole;
  created_at: string;
}

/** Body sent to POST /auth/login */
export interface LoginRequest {
  email: string;
  password: string;
}

/** Body sent to POST /auth/register */
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

/** Body sent to POST /auth/forgot-password */
export interface ForgotPasswordRequest {
  email: string;
}

/** Wrapper shape for login and register API responses */
export interface AuthResponse {
  data: {
    user: AuthUser;
    access_token: string;
    token_type: string;
    expires_at: string;
  };
}

/** Wrapper shape for GET /auth/me */
export interface MeResponse {
  data: AuthUser;
}
