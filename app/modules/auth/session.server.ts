import { createCookieSessionStorage } from '@remix-run/node';

type SessionData = {
  userId: number;
};

const {
  commitSession,
  destroySession,
  getSession: getRawSession,
} = createCookieSessionStorage<SessionData>({
  cookie: {
    name: '__auth',
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    secrets: [process.env.AUTH_SESSION_SECRET],
    secure: process.env.NODE_ENV === 'production',
  },
});

async function getAuthSession(request: Request) {
  return getRawSession(request.headers.get('Cookie'));
}

export { commitSession, destroySession, getAuthSession };
