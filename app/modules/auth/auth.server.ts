import { Authenticator } from 'remix-auth';
import { TOTPStrategy } from 'remix-auth-totp-dev';
import { db } from '#app/utils/db.server';
import { sendEmail } from '#app/utils/email.server';
import { renderSentTotpEmail } from '#emails/send-totp';
import { authSessionStorage } from './session.server';

type UserInfo = {
  id: number;
};

export const authenticator = new Authenticator<UserInfo>(authSessionStorage);

authenticator.use(
  new TOTPStrategy(
    {
      secret: process.env.ENCRYPTION_SECRET,
      sendTOTP: async ({ email, code, magicLink }) => {
        const body = await renderSentTotpEmail({ code, magicLink });
        await sendEmail({
          to: email,
          subject: 'Tipprunde Login Code',
          body,
        });
      },
      validateEmail,
    },
    async ({ email }) => {
      console.log('Verifying ', email);
      return { id: 1 };
    },
  ),
);

async function validateEmail(email: string) {
  const user = await db.user.findUnique({ where: { email } });
  return user !== null;
}
