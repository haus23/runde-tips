import {
  commitSession,
  getThemeSession,
} from '#app/modules/theme/session.server';
import { invariant } from '@epic-web/invariant';
import { json, type ActionFunctionArgs } from '@remix-run/node';

export async function action({ request }: ActionFunctionArgs) {
  const session = await getThemeSession(request);

  const bodyParams = await request.formData();

  const brand = bodyParams.get('brand');
  invariant(
    brand === 'violet' || brand === 'orange',
    'Unkwown theme brand color',
  );

  const colorScheme = bodyParams.get('colorScheme');
  invariant(
    colorScheme === 'system' ||
      colorScheme === 'light' ||
      colorScheme === 'dark',
    'Unkwown colorScheme',
  );

  session.set('theme', { brand, colorScheme });

  return json(null, {
    headers: { 'Set-Cookie': await commitSession(session) },
  });
}
