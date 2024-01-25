import { motion, useScroll, useTransform } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { useIsAuthenticated } from '#app/utils/auth';
import { Link, NavLink } from '../(ui)/link';
import { Logo } from './logo/logo';
import { ThemeMenu } from './theme-menu';
import { UserMenu } from './user-menu';

export function AppHeader() {
  const { scrollY } = useScroll();
  const isAuthenticated = useIsAuthenticated();

  return (
    <motion.header
      style={{
        borderBottomColor: useTransform(scrollY, (v) =>
          Number(!v) ? 'var(--app-bg)' : 'var(--layout-divider)',
        ),
      }}
      className="bg-app fixed inset-x-0 top-0 h-14 flex items-center justify-between px-2 sm:px-4 border-b"
    >
      <Link to="/" className="pl-1 pr-2" variant="primary">
        <Logo />
      </Link>
      <div className="flex items-center h-12 gap-x-2">
        <ThemeMenu />
        {isAuthenticated && <UserMenu />}
        {!isAuthenticated && (
          <div className="flex items-center">
            <span className="border border-cn h-10 mx-2" />
            <NavLink to="/login">Log In</NavLink>
          </div>
        )}
      </div>
    </motion.header>
  );
}
