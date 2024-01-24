import { useForm } from '@conform-to/react';
import { parse } from '@conform-to/zod';
import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  json,
  redirect,
} from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';
import { z } from 'zod';
import { Button } from '#app/components/(ui)/button';
import { Input } from '#app/components/(ui)/input';
import { Label } from '#app/components/(ui)/label';
import { TextField } from '#app/components/(ui)/textfield';
import { requireAnonymous } from '#app/modules/auth/auth.server';

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAnonymous(request);

  return json(null);
}

export default function OnboardingRoute() {
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
            {false && <span className="text-error">Falscher Code</span>}
            <Button type="submit" variant="primary">
              Anmelden
            </Button>
          </Form>
        </section>
      </div>
    </div>
  );
}
