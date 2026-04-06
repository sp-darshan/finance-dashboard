import Card from '../ui/Card';
import { useTheme } from '../../hooks/useTheme';

export default function SummaryCard({ label, value, meta, accent = 'from-zinc-100 to-zinc-500' }) {
  const { isLight } = useTheme();

  return (
    <Card className="relative overflow-hidden">
      <div className={`absolute inset-x-0 top-0 h-1 bg-linear-to-r ${accent}`} />
      <p className={`text-sm ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>{label}</p>
      <div className={`mt-3 text-3xl font-semibold ${isLight ? 'text-zinc-900' : 'text-white'}`}>{value}</div>
      {meta && <p className={`mt-2 text-sm ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>{meta}</p>}
    </Card>
  );
}