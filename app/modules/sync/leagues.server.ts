import { db } from '#app/utils/db.server';
import { legacyBaseUrl } from './base.server';

export async function syncLeagues() {
  const resourceUrl = `${legacyBaseUrl}/leagues`;

  const response = await fetch(resourceUrl);
  const data = await response.json();

  for (const league of data) {
    await db.league.upsert({
      where: { slug: league.id },
      create: {
        slug: league.id,
        name: league.name,
        shortname: league.shortname,
      },
      update: {
        name: league.name,
        shortname: league.shortname,
      },
    });
  }
}
