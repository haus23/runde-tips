import { db } from '#app/utils/db.server';
import { legacyBaseUrl } from './base.server';

export async function syncAccounts() {
  const resourceUrl = `${legacyBaseUrl}accounts`;

  const response = await fetch(resourceUrl);
  const data = await response.json();

  for (const acc of data) {
    await db.user.create({
      data: {
        name: acc.name,
        slug: acc.id,
        email: acc.email || null,
        role: acc.role || 'PLAYER',
      },
    });
  }
}
