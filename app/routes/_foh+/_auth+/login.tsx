import { useForm } from '@conform-to/react';
import { parse } from '@conform-to/zod';
import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  json,
} from '@remix-run/node';
import { Form, useActionData, useLoaderData } from '@remix-run/react';
import { z } from 'zod';
import { Button } from '#app/components/(ui)/button';
import { Input } from '#app/components/(ui)/input';
import { Label } from '#app/components/(ui)/label';
import { TextField } from '#app/components/(ui)/textfield';
import { authenticator } from '#app/modules/auth/auth.server';
import { commitSession, getSession } from '#app/modules/auth/session.server';

const schema = z.object({
  email: z
    .string({ required_error: 'Email-Adresse ist notwendig.' })
    .email('Ungültige Email-Adresse'),
});

export async function loader({ request }: LoaderFunctionArgs) {
  console.log('Loader');
  const session = await getSession(request.headers.get('Cookie'));
  console.log(session.get(authenticator.sessionErrorKey));
  await authenticator.isAuthenticated(request, {
    successRedirect: '/',
  });

  // const session = await getSession(request.headers.get('Cookie'));
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
  });

  const formData = await request.formData();

  const submission = parse(formData, { schema });
  return json(submission);
}

export default function LoginRoute() {
  const { authError } = useLoaderData<typeof loader>();
  const lastSubmission = useActionData<typeof action>();

  const [form, fields] = useForm({
    lastSubmission,
    shouldValidate: 'onSubmit',
    onValidate({ formData }) {
      return parse(formData, { schema });
    },
  });
  console.log(fields.email);
  return (
    <div className="pt-24 sm:pt-6 md:pt-16">
      <div className="sm:bg-panel max-w-2xl sm:mx-auto sm:rounded-xl sm:px-12 py-4">
        <header className="sm:border-b border-cn pb-4">
          <h2 className="text-xl text-center text-subtle font-semibold ">
            Anmeldung
          </h2>
        </header>
        <section className="px-4 mt-4 mx-2 sm:mx-8">
          <Form
            {...form.props}
            method="post"
            className="flex flex-col items-center gap-y-8"
          >
            <TextField>
              <Label>Email</Label>
              <Input
                placeholder="Deine bekannte Email-Adresse"
                name="email"
                type="email"
                defaultValue={fields.email.defaultValue}
              />
            </TextField>
            {fields.email.errors && (
              <span className="text-error">{fields.email.errors}</span>
            )}
            {authError && (
              <span className="text-error">{authError?.message}</span>
            )}
            <Button type="submit" variant="primary">
              Code anfordern
            </Button>
          </Form>
        </section>
      </div>
    </div>
  );
}
