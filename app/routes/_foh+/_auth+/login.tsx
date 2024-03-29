import { useForm } from '@conform-to/react';
import { parse, refine } from '@conform-to/zod';
import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  json,
  redirect,
} from '@remix-run/node';
import { Form, useActionData, useLoaderData } from '@remix-run/react';
import { z } from 'zod';
import { Button } from '#app/components/(ui)/button';
import { TextField } from '#app/components/(ui)/textfield';
import { isKnownEmail } from '#app/modules/api/user.server';
import {
  prepareOnboarding,
  requireAnonymous,
} from '#app/modules/auth/auth.server';
import {
  commitSession,
  getAuthSession,
} from '#app/modules/auth/session.server';

function createSchema(constraint?: {
  isKnownEmail?: (email: string) => Promise<boolean>;
}) {
  return z.object({
    email: z
      .string({ required_error: 'Email-Adresse fehlt.' })
      .email('Ungültige Email-Adresse')
      .pipe(
        z.string().superRefine((email, ctx) =>
          refine(ctx, {
            validate: () => constraint?.isKnownEmail?.(email),
            message: 'Unbekannte Email-Adresse. Wende dich an Micha.',
          }),
        ),
      ),
  });
}

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAnonymous(request);

  // If revisiting login page, reuse email but destroy old secret (and code ...)
  const session = await getAuthSession(request);
  const email = session.get('email');
  const secret = session.get('secret');

  return json(
    { email },
    {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    },
  );
}

export async function action({ request }: ActionFunctionArgs) {
  await requireAnonymous(request);

  const formData = await request.formData();

  const submission = await parse(formData, {
    async: true,
    schema: createSchema({ isKnownEmail }),
  });

  if (submission.intent !== 'submit' || !submission.value) {
    return json(submission);
  }

  // Create code and send code email
  const totpSecretUsed = await prepareOnboarding(
    request,
    submission.value.email,
  );

  const session = await getAuthSession(request);
  session.flash('email', submission.value.email);
  session.flash('secret', totpSecretUsed);

  return redirect('/onboarding', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}

export default function LoginRoute() {
  const { email: lastEmail } = useLoaderData<typeof loader>();
  const lastSubmission = useActionData<typeof action>();

  const [form, { email }] = useForm({
    defaultValue: { email: lastEmail },
    lastSubmission,
    onValidate({ formData }) {
      return parse(formData, { schema: createSchema() });
    },
  });

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
            <TextField
              className="w-full"
              label="Email"
              name="email"
              type="email"
              placeholder="Deine Tipprunden Email-Adresse"
              defaultValue={email.defaultValue}
              isInvalid={!!email.error}
              errorMessage={email.error}
            />
            <Button type="submit" variant="primary">
              Code anfordern
            </Button>
          </Form>
        </section>
      </div>
    </div>
  );
}
