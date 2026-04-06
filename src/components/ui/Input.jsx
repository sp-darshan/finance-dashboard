import { useTheme } from '../../hooks/useTheme';

export default function Input({ label, className = '', ...props }) {
  const { isLight } = useTheme();

  return (
    <label className={`grid gap-2 text-sm font-medium ${isLight ? 'text-zinc-700' : 'text-zinc-200'} ${className}`}>
      {label && <span>{label}</span>}
      <input
        className={`rounded-2xl border px-4 py-3 outline-none transition placeholder:text-zinc-500 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-500/20 ${isLight ? 'border-zinc-300 bg-white text-zinc-900' : 'border-zinc-800 bg-zinc-950/70 text-zinc-100'}`}
        {...props}
      />
    </label>
  );
}