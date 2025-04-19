import { env } from '$env/dynamic/private';

// This file is used to load environment variables from the .env file
// and make them available in the application.
// It is important to keep this file private and not expose it to the client-side code.

export const JWT_SECRET = env.JWT_SECRET;
export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: env.NODE_ENV === 'production',
  sameSite: env.NODE_ENV === 'production' ? 'strict' : 'lax',
  path: '/',
  maxAge: 3600,
};