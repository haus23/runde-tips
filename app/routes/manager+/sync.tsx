import type { ActionFunctionArgs } from '@remix-run/node';
import { Form, json } from '@remix-run/react';
import { namedAction } from 'remix-utils/named-action';
import { Button } from '#app/components/(ui)/button';
import { syncAccounts } from '#app/modules/sync/accounts.server';
import { syncChampionships } from '#app/modules/sync/championships';
import { syncLeagues } from '#app/modules/sync/leagues.server';
import { syncRulesets } from '#app/modules/sync/rulesets.server';
import { syncTeams } from '#app/modules/sync/teams.server';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  return namedAction(formData, {
    async accounts() {
      await syncAccounts();
      return json(null);
    },
    async leagues() {
      await syncLeagues();
      return json(null);
    },
    async teams() {
      await syncTeams();
      return json(null);
    },
    async rulesets() {
      await syncRulesets();
      return json(null);
    },
    async championships() {
      await syncChampionships();
      return json(null);
    },
  });
}

export default function SyncRoute() {
  return (
    <div>
      <h2 className="text-2xl font-semibold">Datenabgleich</h2>
      <div className="mt-4">
        <Form method="post" className="flex flex-wrap gap-4">
          <Button
            type="submit"
            variant="primary"
            name="intent"
            value="championships"
          >
            Turniere
          </Button>
          <Button
            type="submit"
            variant="secondary"
            name="intent"
            value="accounts"
          >
            User
          </Button>
          <Button
            type="submit"
            variant="secondary"
            name="intent"
            value="leagues"
          >
            Ligen
          </Button>
          <Button type="submit" variant="secondary" name="intent" value="teams">
            Teams
          </Button>
          <Button
            type="submit"
            variant="secondary"
            name="intent"
            value="rulesets"
          >
            Regelwerke
          </Button>
        </Form>
      </div>
    </div>
  );
}
