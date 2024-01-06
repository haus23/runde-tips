import logoUrl from './logo.svg';

export function Logo() {
  return (
    <div className="flex items-center gap-x-1">
      <svg className="h-10 w-10 fill-current">
        <title>Logo</title>
        <use href={`${logoUrl}#logo`} />
      </svg>
      <span className="text-xl font-medium">runde.tips</span>
    </div>
  );
}
