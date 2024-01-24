import { invariant } from '@epic-web/invariant';
import { type ActionFunctionArgs, json } from '@remix-run/node';
import {
  commitSession,
  getThemeSession,
} from '#app/modules/theme/session.server';
import { brandNames, colorSchemeNames } from '#app/modules/theme/theme';
import { includes } from '#app/utils/misc';

export async function action({ request }: ActionFunctionArgs) {
  const session = await getThemeSession(request);

  const bodyParams = await request.formData();

  const brand = bodyParams.get('brand');
  invariant(includes(brandNames, brand), 'Unkwown theme brand color');

  const colorScheme = bodyParams.get('colorScheme');
  invariant(includes(colorSchemeNames, colorScheme), 'Unkwown colorScheme');

  session.set('theme', { brand, colorScheme });

  return json(null, {
    headers: { 'Set-Cookie': await commitSession(session) },
  });
}
