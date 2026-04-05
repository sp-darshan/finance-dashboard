import { useMemo, useState } from 'react';
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
  const { role, setRole } = useTransactions();

  const currentPage = useMemo(() => {
    if (location.pathname.startsWith('/transactions')) {
      return pageMeta['/transactions'];
    }

    if (location.pathname.startsWith('/insights')) {
      return pageMeta['/insights'];
    }

    return pageMeta['/dashboard'];
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.08),_transparent_24%),radial-gradient(circle_at_top_right,_rgba(255,255,255,0.05),_transparent_22%),linear-gradient(180deg,#000000_0%,#111111_55%,#171717_100%)] text-slate-100">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      <div className="lg:pl-72">
        <Header
          title={currentPage.title}
          onMenuOpen={() => setMenuOpen(true)}
          role={role}
          onRoleChange={setRole}
        />
        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}