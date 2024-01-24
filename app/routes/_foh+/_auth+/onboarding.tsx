import { useForm } from '@conform-to/react';
import { parse, refine } from '@conform-to/zod';
import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  json,
  redirect,
} from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';
import { z } from 'zod';
import { Button } from '#app/components/(ui)/button';
import { TextField } from '#app/components/(ui)/textfield';
import {
  createLoggedInSession,
  requireAnonymous,
} from '#app/modules/auth/auth.server';
import { getAuthSession } from '#app/modules/auth/session.server';
import { validateLoginCode } from '#app/utils/totp.server';

function createFormSchema(constraint?: {
  isValidCode?: (code: string) => Promise<boolean>;
}) {
  return z.object({
    code: z
      .string({ required_error: 'Ohne Code geht es nicht weiter.' })
      .regex(/^\d{6}$/, 'Kein Code. Ein Code hat genau sechs Ziffern.')
      .pipe(
        z.string().superRefine((code, ctx) =>
          refine(ctx, {
            validate: () => constraint?.isValidCode?.(code),
            message: 'Ungültiger Code.',
          }),
        ),
      ),
  });
}

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAnonymous(request);

  const session = await getAuthSession(request);

  const email = session.get('email');
  if (!email) {
    return redirect('/login');
  }

  return null;
}

export async function action({ request }: ActionFunctionArgs) {
  await requireAnonymous(request);

  const session = await getAuthSession(request);

  const email = session.get('email');
  const secret = session.get('secret');
  if (!email || !secret) {
    return redirect('/login');
  }

  const formData = await request.formData();

  const submission = await parse(formData, {
    schema: createFormSchema({
      isValidCode: async (code) => validateLoginCode(code, secret),
    }),
    async: true,
  });

  if (submission.intent !== 'submit' || !submission.value) {
    return json(submission);
  }

  return createLoggedInSession(request, email);
}

export default function OnboardingRoute() {
  const lastSubmission = useActionData<typeof action>();

  const [form, { code }] = useForm({
    lastSubmission,
    onValidate({ formData }) {
      return parse(formData, { schema: createFormSchema() });
    },
  });

  return (
    <div className="pt-24 sm:pt-6 md:pt-16">
      <div className="sm:bg-panel max-w-2xl sm:mx-auto sm:rounded-xl sm:px-12 py-4">
        <header className="sm:border-b border-cn pb-4">
          <h2 className="text-xl text-center text-subtle font-semibold ">
            Code Eingabe
          </h2>
        </header>
        <section className="p-4 mt-4 mx-2 sm:mx-8">
          <Form
            {...form.props}
            method="post"
            className="flex flex-col items-center gap-y-8"
          >
            <TextField
              className="text-center"
              aria-label="Code"
              name="code"
              inputMode="numeric"
              autoFocus
              autoComplete="one-time-code"
              maxLength={6}
              defaultValue={code.defaultValue}
              inputClassName="text-3xl w-36 text-center mx-auto"
              isInvalid={!!code.error}
              errorMessage={code.error}
            />
            <Button type="submit" variant="primary">
              Anmelden
            </Button>
          </Form>
        </section>
      </div>
    </div>
  );
}
