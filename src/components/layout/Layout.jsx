import { useEffect, useMemo, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { useTransactions } from '../../hooks/useTransactions';

const pageMeta = {
  '/dashboard': {
    title: 'Dashboard',
    subtitle: 'A compact view of balance, trends, and recent activity.',
  },
  '/transactions': {
    title: 'Transactions',
    subtitle: 'Add, filter, and review your cash flow history.',
  },
  '/insights': {
    title: 'Insights',
    subtitle: 'Find the categories and patterns driving the numbers.',
  },
};

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { role, setRole, theme, setTheme, initializeTransactionsFromMock } = useTransactions();
  const isLight = theme === 'light';

  const currentPage = useMemo(() => {
    if (location.pathname.startsWith('/transactions')) {
      return pageMeta['/transactions'];
    }

    if (location.pathname.startsWith('/insights')) {
      return pageMeta['/insights'];
    }

    return pageMeta['/dashboard'];
  }, [location.pathname]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    initializeTransactionsFromMock();
  }, [initializeTransactionsFromMock]);

  const handleThemeToggle = () => {
    setTheme(isLight ? 'dark' : 'light');
  };

  return (
    <div
      className={`min-h-screen ${
        isLight
          ? 'bg-[radial-gradient(circle_at_top_left,_rgba(9,9,11,0.08),_transparent_24%),radial-gradient(circle_at_top_right,_rgba(63,63,70,0.05),_transparent_22%),linear-gradient(180deg,#f8fafc_0%,#eef2ff_55%,#e2e8f0_100%)] text-zinc-900'
          : 'bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.08),_transparent_24%),radial-gradient(circle_at_top_right,_rgba(255,255,255,0.05),_transparent_22%),linear-gradient(180deg,#000000_0%,#111111_55%,#171717_100%)] text-slate-100'
      }`}
    >
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} theme={theme} />
      <div className="lg:pl-72">
        <Header
          title={currentPage.title}
          onMenuOpen={() => setMenuOpen(true)}
          role={role}
          onRoleChange={setRole}
          theme={theme}
          onThemeToggle={handleThemeToggle}
        />
        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}