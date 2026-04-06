import { useTheme } from '../../hooks/useTheme';

export default function Button({ children, className = '', variant = 'primary', ...props }) {
  const { isLight } = useTheme();

  const variants = {
    primary: isLight ? 'bg-zinc-900 text-zinc-50 hover:bg-zinc-700' : 'bg-zinc-100 text-zinc-950 hover:bg-white',
    secondary: isLight ? 'bg-white text-zinc-900 border border-zinc-300 hover:bg-zinc-100' : 'bg-zinc-900 text-zinc-100 border border-zinc-700 hover:bg-zinc-800',
    ghost: isLight ? 'bg-transparent text-zinc-700 hover:bg-zinc-100' : 'bg-transparent text-zinc-200 hover:bg-white/5',
    danger: isLight ? 'bg-rose-100 text-rose-700 border border-rose-200 hover:bg-rose-200' : 'bg-zinc-800 text-zinc-100 border border-zinc-700 hover:bg-zinc-700',
  };

  return (
    <button
      className={`inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold transition ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}