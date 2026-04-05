import Card from '../ui/Card';

export default function InsightCard({ title, value, subtitle, accent = 'from-zinc-100 to-zinc-500' }) {
  return (
    <Card className="relative overflow-hidden">
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accent}`} />
      <p className="text-sm text-zinc-400">{title}</p>
      <div className="mt-3 text-3xl font-semibold text-white">{value}</div>
      {subtitle && <p className="mt-2 text-sm text-zinc-400">{subtitle}</p>}
    </Card>
  );
}