export async function sendEmail(props: {
  to: string;
  subject: string;
  body: string;
}) {
  const response = await fetch('https://api.useplunk.com/v1/send', {
    method: 'POST',
    body: JSON.stringify(props),
    headers: {
      Authorization: `Bearer ${process.env.PLUNK_API_KEY}`,
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
