import { Link, NavLink } from '@remix-run/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { useIsAuthenticated } from '#app/utils/auth';
import { Logo } from './logo/logo';
import { ThemeMenu } from './theme-menu';

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
      <Link to="/">
        <Logo />
      </Link>
      <div className="flex items-center h-12 gap-x-2">
        <div>
          <ThemeMenu />
        </div>
        <div className="flex items-center gap-x-2">
          <span className="border border-cn h-10 mx-2" />
          {isAuthenticated ? (
            <NavLink
              className={({ isActive }) =>
                twMerge(
                  'transition-colors hover:text-subtle-accent',
                  isActive && 'text-subtle-accent',
                )
              }
              to="/logout"
            >
              Log Out
            </NavLink>
          ) : (
            <NavLink
              className={({ isActive }) =>
                twMerge(
                  'transition-colors hover:text-subtle-accent',
                  isActive && 'text-subtle-accent',
                )
              }
              to="/login"
            >
              Log In
            </NavLink>
          )}
        </div>
      </div>
    </motion.header>
  );
}
