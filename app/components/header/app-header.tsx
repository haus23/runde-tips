import { motion, useScroll, useTransform } from 'framer-motion';
import { Logo } from './logo/logo';
import { ThemeMenu } from './theme-menu';

export function AppHeader() {
  const { scrollY } = useScroll();

  return (
    <motion.header
      style={{
        borderBottomColor: useTransform(scrollY, (v) =>
          Number(!v) ? 'var(--app-bg)' : 'var(--layout-divider)',
        ),
      }}
      className="bg-app fixed inset-x-0 top-0 h-14 flex items-center justify-between px-2 sm:px-4 border-b"
    >
      <Logo />
      <div>
        <ThemeMenu />
      </div>
    </motion.header>
  );
}
