import { redirect } from '@remix-run/node';
import { sendEmail } from '#app/utils/email.server';
import { generateLoginCode } from '#app/utils/totp.server';
import { renderSentTotpEmail } from '#emails/send-totp';
import { getUserByEmail } from '../api/user.server';
import { commitSession, getAuthSession } from './session.server';

export async function requireAnonymous(request: Request) {
  const session = await getAuthSession(request);
  const userId = session.get('userId');
  if (userId) {
    throw redirect('/');
  }
}

function createMagicLink(request: Request, code: string) {
  const url = new URL('/magic-link', new URL(request.url).origin);
  url.searchParams.set('code', code);
  return url.toString();
}

export async function prepareOnboarding(request: Request, email: string) {
  const user = await getUserByEmail(email);
  const { code, secret } = generateLoginCode();
  const magicLink = createMagicLink(request, code);

  // Create and send email
  const body = await renderSentTotpEmail({ name: user.name, code, magicLink });
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
