import { type LoaderFunctionArgs, redirect } from '@remix-run/node';
import {
  createLoggedInSession,
  requireAnonymous,
} from '#app/modules/auth/auth.server';
import { getAuthSession } from '#app/modules/auth/session.server';
import { validateLoginCode } from '#app/utils/totp.server';

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAnonymous(request);

  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  if (!code) {
    return redirect('/login');
  }

  const session = await getAuthSession(request);
  const secret = session.get('secret');
  const email = session.get('email');

  if (!email || !secret) {
    return redirect('/login');
  }

  const ok = validateLoginCode(code, secret);

  if (!ok) {
    return redirect('/login');
  }

  return createLoggedInSession(request, email);
}
