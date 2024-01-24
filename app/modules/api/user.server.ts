import { invariant } from '@epic-web/invariant';
import { db } from '#app/utils/db.server';

export async function getUserById(id: number) {
  const user = await db.user.findUnique({ where: { id } });
  invariant(user !== null, `Unknown user id: ${id}`);
  return user;
}

export async function getUserByEmail(email: string) {
  const user = await db.user.findUnique({ where: { email } });
  invariant(user !== null, `Unknown email: ${email}`);
  return user;
}

export async function isKnownEmail(email: string) {
  const user = await db.user.findUnique({ where: { email } });
  return user !== null;
}
