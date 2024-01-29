import { motion, useScroll, useTransform } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { useIsAuthenticated } from '#app/utils/auth';
import { Link, NavLink } from '../(ui)/link';
import { ChatButton } from '../chat/chat-button';
import { ChampionshipSelect } from './championship-select';
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
      <div className="flex items-center gap-x-2 h-14">
        <Link to="/" className="pl-1 pr-2" variant="primary">
          <Logo />
        </Link>
        <nav className="flex items-center gap-x-2 pt-[0.1rem]">
          <NavLink to="/">Tabelle</NavLink>
          <NavLink to="/tipps/spieler">Spieler</NavLink>
          <NavLink to="/tipps/spiel">Spiele</NavLink>
        </nav>
      </div>
      <div className="flex items-center h-12 gap-x-2">
        <ChampionshipSelect />
        <ThemeMenu />
        {isAuthenticated && <UserMenu />}
        <ChatButton />
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
