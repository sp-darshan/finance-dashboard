export default function Input({ label, className = '', ...props }) {
  return (
    <label className={`grid gap-2 text-sm font-medium text-zinc-200 ${className}`}>
      {label && <span>{label}</span>}
      <input
        className="rounded-2xl border border-zinc-800 bg-zinc-950/70 px-4 py-3 text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-500/20"
        {...props}
      />
    </label>
  );
}