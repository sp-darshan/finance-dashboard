import Card from '../ui/Card';
import { formatCurrency } from '../../utils/formatters';
import { useTheme } from '../../hooks/useTheme';

export default function SpendingTrendChart({ data }) {
  const { isLight } = useTheme();
  const values = data.map((month) => month.expenses);
  const maxValue = Math.max(...values, 1);
  const width = 760;
  const height = 220;
  const padding = 28;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const points = data.map((month, index) => {
    const x = padding + (index / Math.max(data.length - 1, 1)) * chartWidth;
    const y = padding + chartHeight * (1 - month.expenses / maxValue);

    return { ...month, x, y };
  });

  const linePath = points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ');
  const areaPath = `${linePath} L ${width - padding} ${height - padding} L ${padding} ${height - padding} Z`;

  return (
    <Card className="relative flex h-full flex-col overflow-hidden">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className={`text-lg font-semibold ${isLight ? 'text-zinc-900' : 'text-white'}`}>Spending Trend</h2>
          <p className={`text-sm ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>Expenses over time shown as a monthly trend line.</p>
        </div>
        <div className={`text-sm ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
          Peak: <span className={`font-semibold ${isLight ? 'text-zinc-900' : 'text-white'}`}>{formatCurrency(maxValue)}</span>
        </div>
      </div>

      <div className="mt-5 flex flex-1 items-center justify-center overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full max-w-190" preserveAspectRatio="xMidYMid meet">
          {[0, 1, 2, 3, 4].map((line) => (
            <line
              key={line}
              x1={padding}
              x2={width - padding}
              y1={padding + (chartHeight / 4) * line}
              y2={padding + (chartHeight / 4) * line}
              stroke={isLight ? 'rgba(82, 82, 91, 0.20)' : 'rgba(113,113,122,0.16)'}
            />
          ))}
          <defs>
            <linearGradient id="spending-trend-fill" x1="0%" x2="0%" y1="0%" y2="100%">
              <stop offset="0%" stopColor={isLight ? 'rgba(225, 29, 72, 0.30)' : 'rgba(251, 113, 133, 0.45)'} />
              <stop offset="100%" stopColor={isLight ? 'rgba(225, 29, 72, 0.06)' : 'rgba(251, 113, 133, 0.02)'} />
            </linearGradient>
            <linearGradient id="spending-trend-line" x1="0%" x2="100%" y1="0%" y2="0%">
              <stop offset="0%" stopColor={isLight ? '#be123c' : '#fb7185'} />
              <stop offset="100%" stopColor={isLight ? '#b45309' : '#f59e0b'} />
            </linearGradient>
          </defs>
          <path d={areaPath} fill="url(#spending-trend-fill)" />
          <path d={linePath} fill="none" stroke="url(#spending-trend-line)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          {points.map((point) => (
            <g key={point.key}>
              <circle cx={point.x} cy={point.y} r="5" fill={isLight ? '#ffffff' : '#fafafa'} stroke={isLight ? '#be123c' : '#fb7185'} strokeWidth="1.5" />
              <text x={point.x} y={height - 4} textAnchor="middle" className={isLight ? 'fill-zinc-600 text-[12px] font-medium' : 'fill-zinc-400 text-[12px] font-medium'}>
                {point.label}
              </text>
              <text x={point.x} y={point.y - 12} textAnchor="middle" className={isLight ? 'fill-zinc-800 text-[12px] font-semibold' : 'fill-zinc-100 text-[12px] font-semibold'}>
                {formatCurrency(point.expenses)}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </Card>
  );
}