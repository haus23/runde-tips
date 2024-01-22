import {
  Container,
  Html,
  Tailwind,
  Text,
  renderAsync,
} from '@react-email/components';

export type SendTotpEmailProps = {
  code: string;
  magicLink: string;
};

export function SendTotpEmail({ code, magicLink }: SendTotpEmailProps) {
  return (
    <Html className="font-sans bg-gray-50">
      <Tailwind>
        <Container className="text-center">
          <h1>
            <Text className="text-2xl">
              Willkommen bei der Haus23 Tipprunde!
            </Text>
          </h1>
          <p>
            <Text className="text-lg">Dein Login-Code lautet:</Text>
          </p>
          <p>
            <Text className="text-3xl tracking-wider">{code}</Text>
          </p>
          <p>
            <Text className="text-lg">
              Du kannst dich auch mit folgendem Link einloggen:
            </Text>
          </p>
          <p>
            <Text className="text-lg">
              <a href={magicLink}>{magicLink}</a>
            </Text>
          </p>
          <p>
            <Text>
              (Code und Link sind für genau fünf Minuten gültig und
              funktionieren nur in dem Browser, in dem du die Anmeldung
              gestartet hast.)
            </Text>
          </p>
        </Container>
      </Tailwind>
    </Html>
  );
}

SendTotpEmail.PreviewProps = {
  code: '615243',
  magicLink: 'https://runde.tips/magic?code=123456',
} satisfies SendTotpEmailProps;

export async function renderSentTotpEmail(props: SendTotpEmailProps) {
  return renderAsync(<SendTotpEmail {...props} />, {
    pretty: true,
  });
}
