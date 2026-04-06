import Button from '../ui/Button';
import { FaBars, FaMoon, FaSun } from 'react-icons/fa';

const ROLE_LABELS = {
  viewer: 'Viewer',
  admin: 'Admin',
};

export default function Header({ title, onMenuOpen, role, onRoleChange, theme, onThemeToggle }) {
  const isLight = theme === 'light';

  return (
    <header className={`sticky top-0 z-30 border-b backdrop-blur-xl font-mono ${isLight ? 'border-zinc-300 bg-white/90' : 'border-zinc-800 bg-zinc-900/90'}`}>
      <div className="relative px-4 py-4 sm:px-6 lg:px-8">
        <Button
          className="absolute left-4 top-1/2 -translate-y-1/2 lg:hidden"
          variant="secondary"
          onClick={onMenuOpen}
          type="button"
          aria-label="Open menu"
        >
          <FaBars />
        </Button>
        <div className="flex flex-col items-center gap-1 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <h1 className={`text-xl font-semibold sm:text-2xl ${isLight ? 'text-zinc-900' : 'text-white'}`}>{title}</h1>
            <div className={`inline-flex rounded-full border p-1 text-xs uppercase tracking-[0.2em] ${isLight ? 'border-zinc-300 bg-zinc-100 text-zinc-600' : 'border-zinc-700 bg-zinc-950/70 text-zinc-300'}`}>
              <button
                type="button"
                onClick={() => onRoleChange('viewer')}
                className={`rounded-full px-3 py-1 transition ${role === 'viewer' ? isLight ? 'bg-zinc-950 text-white' : 'bg-zinc-100 text-zinc-950' : isLight ? 'text-zinc-600 hover:text-zinc-900' : 'text-zinc-400 hover:text-white'}`}
              >
                {ROLE_LABELS.viewer}
              </button>
              <button
                type="button"
                aria-pressed={role === 'admin'}
                onClick={() => onRoleChange('admin')}
                className={`rounded-full px-3 py-1 transition ${role === 'admin' ? isLight ? 'bg-zinc-950 text-white' : 'bg-zinc-100 text-zinc-950' : isLight ? 'text-zinc-600 hover:text-zinc-900' : 'text-zinc-400 hover:text-white'}`}
              >
                {ROLE_LABELS.admin}
              </button>
            </div>
            <Button
              type="button"
              variant="secondary"
              onClick={onThemeToggle}
              className="rounded-full px-3"
              aria-label={`Switch to ${isLight ? 'dark' : 'light'} mode`}
            >
              {isLight ? <FaMoon /> : <FaSun />}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}