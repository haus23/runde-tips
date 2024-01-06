import { useWindowScroll } from '@uidotdev/usehooks';
import { Logo } from './logo/logo';

export function AppHeader() {
  const [{ y: scrolled }] = useWindowScroll();

  return (
    <div
      {...(!scrolled && { 'data-top': true })}
      className="fixed inset-x-0 top-0 h-14 flex items-center px-2 sm:px-4 border-b data-[top]:border-b-0 bg-gray-50"
    >
      <Logo />
    </div>
  );
}
