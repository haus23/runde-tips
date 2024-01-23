import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  json,
  redirect,
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

  const session = await getSession(request.headers.get('cookie'));
  const authEmail = session.get('auth:email');
  const authError = session.get(authenticator.sessionErrorKey);
  if (!authEmail) return redirect('/login');

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
  const url = new URL(request.url);
  const currentPath = url.pathname;

  await authenticator.authenticate('TOTP', request, {
    successRedirect: currentPath,
    failureRedirect: currentPath,
  });
}

export default function OnboardingRoute() {
  const { authError } = useLoaderData<typeof loader>();

  return (
    <div className="pt-24 sm:pt-6 md:pt-16">
      <div className="sm:bg-panel max-w-2xl sm:mx-auto sm:rounded-xl sm:px-12 py-4">
        <header className="sm:border-b border-cn pb-4">
          <h2 className="text-xl text-center text-subtle font-semibold ">
            Code Eingabe
          </h2>
        </header>
        <section className="p-4 mt-4 mx-2 sm:mx-8">
          <Form method="post" className="flex flex-col items-center gap-y-8">
            <TextField className="flex justify-center">
              <Label className="sr-only">Code</Label>
              <Input className="text-4xl w-40 py-8" autoFocus name="code" />
            </TextField>
            <span>{authError?.message}</span>
            <Button type="submit" variant="primary">
              Anmelden
            </Button>
          </Form>
        </section>
      </div>
    </div>
  );
}
