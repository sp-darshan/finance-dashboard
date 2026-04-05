export default function Button({ children, className = '', variant = 'primary', ...props }) {
  const variants = {
    primary: 'bg-zinc-100 text-zinc-950 hover:bg-white',
    secondary: 'bg-zinc-900 text-zinc-100 border border-zinc-700 hover:bg-zinc-800',
    ghost: 'bg-transparent text-zinc-200 hover:bg-white/5',
    danger: 'bg-zinc-800 text-zinc-100 border border-zinc-700 hover:bg-zinc-700',
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