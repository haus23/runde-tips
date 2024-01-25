import type { ActionFunctionArgs } from '@remix-run/node';
import { Form, json } from '@remix-run/react';
import { namedAction } from 'remix-utils/named-action';
import { Button } from '#app/components/(ui)/button';
import { syncAccounts } from '#app/modules/sync/accounts.server';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  return namedAction(formData, {
    async accounts() {
      console.log('Accounts syncing');
      await syncAccounts();
      return json(null);
    },
  });
}

export default function SyncRoute() {
  return (
    <div>
      <h2 className="text-2xl font-semibold">Datenabgleich</h2>
      <div className="mt-4 flex flex-wrap">
        <Form method="post">
          <Button
            type="submit"
            variant="secondary"
            name="intent"
            value="accounts"
          >
            Accounts
          </Button>
        </Form>
      </div>
    </div>
  );
}
