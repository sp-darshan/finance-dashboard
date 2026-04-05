import { NavLink } from 'react-router-dom';
import { FaChartLine, FaExchangeAlt, FaHome, FaWallet } from 'react-icons/fa';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: FaHome },
  { to: '/transactions', label: 'Transactions', icon: FaExchangeAlt },
  { to: '/insights', label: 'Insights', icon: FaChartLine },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:flex lg:w-72 lg:flex-col lg:border-r lg:border-zinc-800 lg:bg-zinc-900/90 lg:px-5 lg:py-6 lg:backdrop-blur-xl font-mono">
        <Brand />
        <nav className="mt-10 space-y-2">
          {navItems.map((item) => (
            <SidebarLink key={item.to} item={item} />
          ))}
        </nav>
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button aria-label="Close navigation" className="absolute inset-0 bg-slate-950/70" onClick={onClose} type="button" />
          <aside className="absolute inset-y-0 left-0 z-10 w-72 border-r border-zinc-800 bg-zinc-950/95 px-5 py-6 backdrop-blur-xl">
            <Brand />
            <nav className="mt-10 space-y-2">
              {navItems.map((item) => (
                <SidebarLink key={item.to} item={item} onNavigate={onClose} />
              ))}
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}

function Brand() {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-12 w-12 place-items-center rounded-2xl border border-zinc-700 bg-zinc-900 text-lg font-black text-zinc-100">
        <FaWallet />
      </div>
      <div>
        <div className="text-lg font-semibold text-white">Finance Dashboard</div>
        <div className="text-xs uppercase tracking-[0.28em] text-zinc-400">cash flow control</div>
      </div>
    </div>
  );
}

function SidebarLink({ item, onNavigate }) {
  return (
    <NavLink
      to={item.to}
      onClick={onNavigate}
      className={({ isActive }) =>
        [
          'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition font-mono',
          isActive ? 'bg-zinc-100 text-zinc-950 shadow-lg' : 'text-zinc-300 hover:bg-white/5 hover:text-white',
        ].join(' ')
      }
    >
      <span className="text-lg"><item.icon /></span>
      <span>{item.label}</span>
    </NavLink>
  );
}