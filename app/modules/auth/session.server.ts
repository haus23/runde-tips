import { createCookieSessionStorage } from '@remix-run/node';

export const authSessionStorage = createCookieSessionStorage({
  cookie: {
    name: '__auth',
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    secrets: [process.env.AUTH_SESSION_SECRET],
    secure: process.env.NODE_ENV === 'production',
  },
});

export const { commitSession, destroySession, getSession } = authSessionStorage;
