import type { LoaderFunctionArgs } from '@remix-run/node';
import { destroyLoggedInSession } from '#app/modules/auth/auth.server';

export async function loader({ request }: LoaderFunctionArgs) {
  return destroyLoggedInSession(request);
}
