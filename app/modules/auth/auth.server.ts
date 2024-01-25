import { redirect } from '@remix-run/node';
import { redirectBack } from 'remix-utils/redirect-back';
import { sendEmail } from '#app/utils/email.server';
import { generateLoginCode } from '#app/utils/totp.server';
import { renderSentTotpEmail } from '#emails/send-totp';
import { getUserByEmail, getUserById } from '../api/user.server';
import {
  commitSession,
  destroySession,
  getAuthSession,
} from './session.server';

async function getUserIdFromSession(request: Request) {
  const session = await getAuthSession(request);
  return session.get('userId') ?? null;
}

export async function getUser(request: Request) {
  const userId = await getUserIdFromSession(request);
  return userId ? await getUserById(userId) : null;
}

export async function requireAnonymous(request: Request) {
  const userId = await getUserIdFromSession(request);
  if (userId) {
    throw redirect('/');
  }
}

export async function requireAdmin(request: Request) {
  const user = await getUser(request);
  if (!user?.role.includes('ADMIN')) {
    throw redirect('/');
  }
}

export async function prepareOnboarding(request: Request, email: string) {
  const user = await getUserByEmail(email);
  const { code, secret } = generateLoginCode();

  // Create and send email
  const body = await renderSentTotpEmail({ name: user.name, code });
  await sendEmail({
    to: email,
    subject: 'Tipprunde Login Code',
    body,
  });

  return secret;
}

export async function createLoggedInSession(
  request: Request,
  email: string,
  redirectTo?: string,
) {
  const session = await getAuthSession(request);

  const user = await getUserByEmail(email);

  session.set('userId', user.id);
  // Delete flash data by reading
  session.get('secret');
  session.get('email');

  return redirect(redirectTo || '/', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}

export async function destroyLoggedInSession(request: Request) {
  const session = await getAuthSession(request);

  return redirectBack(request, {
    fallback: '/',
    headers: { 'Set-Cookie': await destroySession(session) },
  });
}
