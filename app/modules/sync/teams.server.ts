import { db } from '#app/utils/db.server';
import { legacyBaseUrl } from './base.server';

export async function syncTeams() {
  const resourceUrl = `${legacyBaseUrl}/teams`;

  const response = await fetch(resourceUrl);
  const data = await response.json();

  for (const team of data) {
    await db.team.upsert({
      where: { slug: team.id },
      create: {
        slug: team.id,
        name: team.name,
        shortname: team.shortname,
      },
      update: {
        name: team.name,
        shortname: team.shortname,
      },
    });
  }
}
