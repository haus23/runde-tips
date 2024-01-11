import { getHintUtils } from '@epic-web/client-hints';
import {
  clientHint as colorSchemeHint,
  subscribeToSchemeChange,
} from '@epic-web/client-hints/color-scheme';
import { useRevalidator } from '@remix-run/react';
import { useEffect } from 'react';

const { getClientHintCheckScript } = getHintUtils({
  colorScheme: colorSchemeHint,
});

export function ClientHintCheck() {
  const { revalidate } = useRevalidator();
  useEffect(
    () =>
      subscribeToSchemeChange((v) => {
        revalidate();
      }),
    [revalidate],
  );

  return (
    <script
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Allowed here only for this script
      dangerouslySetInnerHTML={{
        __html: getClientHintCheckScript(),
      }}
    />
  );
}
