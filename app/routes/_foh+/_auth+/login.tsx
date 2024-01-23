import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  json,
} from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { Button } from '#app/components/(ui)/button';
import { Input } from '#app/components/(ui)/input';
import { Label } from '#app/components/(ui)/label';
import { TextField } from '#app/components/(ui)/textfield';
import { authenticator } from '#app/modules/auth/auth.server';
import { commitSession, getSession } from '#app/modules/auth/session.server';

export async function loader({ request }: LoaderFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    successRedirect: '/',
  });

  const session = await getSession(request.headers.get('Cookie'));
  const authError = session.get(authenticator.sessionErrorKey);

  return json(
    { authError },
    {
      headers: {
        'set-cookie': await commitSession(session),
      },
    },
  );
}

export async function action({ request }: ActionFunctionArgs) {
  await authenticator.authenticate('TOTP', request, {
    successRedirect: '/onboarding',
    failureRedirect: '/login',
  });
}

export default function LoginRoute() {
  const { authError } = useLoaderData<typeof loader>();

  return (
    <div className="pt-24 sm:pt-6 md:pt-16">
      <div className="sm:bg-panel max-w-2xl sm:mx-auto sm:rounded-xl sm:px-12 py-4">
        <header className="sm:border-b border-cn pb-4">
          <h2 className="text-xl text-center text-subtle font-semibold ">
            Anmeldung
          </h2>
        </header>
        <section className="px-4 mt-4 mx-2 sm:mx-8">
          <Form method="post" className="flex flex-col items-center gap-y-8">
            <TextField>
              <Label>Email</Label>
              <Input placeholder="Deine bekannte Email-Adresse" name="email" />
            </TextField>
            <span>{authError?.message}</span>
            <Button type="submit" variant="primary">
              Code anfordern
            </Button>
          </Form>
        </section>
      </div>
    </div>
  );
}
