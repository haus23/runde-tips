import {
  Container,
  Html,
  Tailwind,
  Text,
  renderAsync,
} from '@react-email/components';

export type SendTotpEmailProps = {
  name: string;
  code: string;
};

export function SendTotpEmail({ name, code }: SendTotpEmailProps) {
  return (
    <Html className="font-sans bg-gray-50">
      <Tailwind>
        <Container className="text-center">
          <h1>
            <Text className="text-lg">Hallo {name}!</Text>
          </h1>
          <p>
            <Text className="text-lg">Dein Login-Code lautet:</Text>
          </p>
          <p>
            <Text className="text-3xl tracking-wider">{code}</Text>
          </p>
          <p>
            <Text>
              (Der Code und ist genau fünf Minuten gültig und funktioniert nur
              in dem Browser, in dem du die Anmeldung gestartet hast.)
            </Text>
          </p>
        </Container>
      </Tailwind>
    </Html>
  );
}

SendTotpEmail.PreviewProps = {
  name: 'Micha',
  code: '615243',
} satisfies SendTotpEmailProps;

export async function renderSentTotpEmail(props: SendTotpEmailProps) {
  return renderAsync(<SendTotpEmail {...props} />, {
    pretty: true,
  });
}
