import logoUrl from './logo.svg';

export function Logo() {
  return (
    <div className="flex items-center gap-x-1">
      <svg
        className="h-10 w-10 fill-current"
        role="img"
        aria-label="Haus23 Logo"
      >
        <use href={`${logoUrl}#logo`} />
      </svg>
      <span id="logo-title" className="text-xl font-medium">
        runde.tips
      </span>
    </div>
  );
}
