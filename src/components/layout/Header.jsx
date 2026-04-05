import Button from '../ui/Button';
import { FaBars } from 'react-icons/fa';

const ROLE_LABELS = {
  viewer: 'Viewer',
  admin: 'Admin',
};

export default function Header({ title, onMenuOpen, role, onRoleChange }) {
  return (
    <header className="sticky top-0 z-30 border-b border-zinc-800 bg-zinc-900/90 backdrop-blur-xl font-mono">
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
        <div className="flex flex-col items-center text-center gap-1">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <h1 className="text-xl font-semibold text-white sm:text-2xl">{title}</h1>
            <div className="inline-flex rounded-full border border-zinc-700 bg-zinc-950/70 p-1 text-xs uppercase tracking-[0.2em] text-zinc-300">
              <button
                type="button"
                onClick={() => onRoleChange('viewer')}
                className={`rounded-full px-3 py-1 transition ${role === 'viewer' ? 'bg-zinc-100 text-zinc-950' : 'text-zinc-400 hover:text-white'}`}
              >
                {ROLE_LABELS.viewer}
              </button>
              <button
                type="button"
                aria-pressed={role === 'admin'}
                onClick={() => onRoleChange('admin')}
                className={`rounded-full px-3 py-1 transition ${role === 'admin' ? 'bg-zinc-100 text-zinc-950' : 'text-zinc-400 hover:text-white'}`}
              >
                {ROLE_LABELS.admin}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}