import { redirect } from '@remix-run/node';
import { getAuthSession } from './session.server';

export async function requireAnonymous(request: Request) {
  const session = await getAuthSession(request);
  const userId = session.get('userId');
  if (userId) {
    throw redirect('/');
  }
}
