import Card from '../ui/Card';

export default function SummaryCard({ label, value, meta, accent = 'from-zinc-100 to-zinc-500' }) {
  return (
    <Card className="relative overflow-hidden">
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accent}`} />
      <p className="text-sm text-zinc-400">{label}</p>
      <div className="mt-3 text-3xl font-semibold text-white">{value}</div>
      {meta && <p className="mt-2 text-sm text-zinc-400">{meta}</p>}
    </Card>
  );
}