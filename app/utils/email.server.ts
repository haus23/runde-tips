export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string;
  subject: string;
  html: string;
  text: string;
}) {
  const email = {
    Messages: [
      {
        From: {
          Email: 'hallo@runde.tips',
          Name: 'Tipprunde Haus23',
        },
        To: [
          {
            EMail: to,
          },
        ],
        Subject: subject,
        TextPart: text,
        HTMLPart: html,
      },
    ],
  };

  const response = await fetch('https://api.mailjet.com/v3.1/send', {
    method: 'POST',
    body: JSON.stringify(email),
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${process.env.MAILJET_API_KEY}:${process.env.MAILJET_SECRET}`,
        'binary',
      ).toString('base64')}`,
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    return {
      status: 'success' as const,
    };
  }
  return {
    status: 'error' as const,
  };
}
