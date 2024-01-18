import { Button } from '#app/components/(ui)/button';
import { Input } from '#app/components/(ui)/input';
import { Label } from '#app/components/(ui)/label';
import { TextField } from '#app/components/(ui)/textfield';
import { sendEmail } from '#app/utils/email.server';
import { ActionFunctionArgs, json, redirect } from '@remix-run/node';

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();
  const email = body.get('email') as string;

  const result = await sendEmail({
    to: email,
    subject: 'Tipprunde Login Code',
    text: 'Willkommen',
    html: '<h1>Willkommen</h1>',
  });

  if (result.status === 'error') {
    return json(null);
  }

  return redirect('/onboarding', {
    headers: {},
  });
}

export default function LoginRoute() {
  return (
    <div className="pt-24 sm:pt-6 md:pt-16">
      <div className="sm:bg-panel max-w-2xl sm:mx-auto sm:rounded-xl sm:px-12 py-4">
        <header className="sm:border-b border-cn pb-4">
          <h2 className="text-xl text-center text-subtle font-semibold ">
            Anmeldung
          </h2>
        </header>
        <section className="px-4 mt-4 mx-2 sm:mx-8">
          <form method="post" className="flex flex-col items-center gap-y-8">
            <TextField>
              <Label>Email</Label>
              <Input placeholder="Deine bekannte Email-Adresse" name="email" />
            </TextField>
            <Button type="submit" variant="primary">
              Code anfordern
            </Button>
          </form>
        </section>
      </div>
    </div>
  );
}
