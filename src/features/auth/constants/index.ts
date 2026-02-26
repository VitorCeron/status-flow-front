/** Name of the HttpOnly cookie that stores the Bearer token */
export const AUTH_COOKIE_NAME = 'sf_token';

/** Name of the non-HttpOnly cookie that stores the user role for middleware routing */
export const AUTH_ROLE_COOKIE_NAME = 'sf_role';

/** Cookie max-age in seconds: 1 hour */
export const AUTH_COOKIE_MAX_AGE = 60 * 60;

/** Role-to-dashboard redirect map */
export const ROLE_REDIRECT: Record<string, string> = {
  admin: '/backoffice/dashboard',
  user: '/dashboard',
};

/** Default redirect when role is unknown */
export const DEFAULT_REDIRECT = '/dashboard';
