import { motion, useScroll, useTransform } from 'framer-motion';
import { MoonIcon } from 'lucide-react';
import { Button } from '../(ui)/button/button';
import { Logo } from './logo/logo';

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
        <Button variant="toolbar" size="toolbar">
          <MoonIcon className="h-5" />
        </Button>
      </div>
    </motion.header>
  );
}
