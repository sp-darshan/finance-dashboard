import Card from '../ui/Card';
import { useTheme } from '../../hooks/useTheme';

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const formatPercent = (value) => `${(value * 100).toFixed(0)}%`;

export default function SavingsTrendChart({ data }) {
  const { isLight } = useTheme();
  const width = 760;
  const height = 220;
  const padding = 28;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const values = data.map((month) => month.savingsRate);
  const rawMin = Math.min(...values, 0);
  const rawMax = Math.max(...values, 1);
  const range = Math.max(rawMax - rawMin, 0.001);

  const points = data.map((month, index) => {
    const x = padding + (index / Math.max(data.length - 1, 1)) * chartWidth;
    const normalized = (month.savingsRate - rawMin) / range;
    const y = padding + chartHeight * (1 - normalized);

    return { ...month, x, y };
  });

  const linePath = points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ');
  const areaPath = `${linePath} L ${width - padding} ${height - padding} L ${padding} ${height - padding} Z`;
  const latestRate = data[data.length - 1]?.savingsRate ?? 0;

  return (
    <Card className="relative flex h-full flex-col overflow-hidden">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className={`text-lg font-semibold ${isLight ? 'text-zinc-900' : 'text-white'}`}>Savings Rate Trend</h2>
          <p className={`text-sm ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>Monthly savings efficiency from income and expense flow.</p>
        </div>
        <div className={`text-sm ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
          Latest: <span className={`font-semibold ${isLight ? 'text-zinc-900' : 'text-white'}`}>{formatPercent(latestRate)}</span>
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
            <linearGradient id="savings-trend-fill" x1="0%" x2="0%" y1="0%" y2="100%">
              <stop offset="0%" stopColor={isLight ? 'rgba(5, 150, 105, 0.28)' : 'rgba(52, 211, 153, 0.30)'} />
              <stop offset="100%" stopColor={isLight ? 'rgba(5, 150, 105, 0.06)' : 'rgba(16, 185, 129, 0.03)'} />
            </linearGradient>
            <linearGradient id="savings-trend-line" x1="0%" x2="100%" y1="0%" y2="0%">
              <stop offset="0%" stopColor={isLight ? '#047857' : '#34d399'} />
              <stop offset="100%" stopColor={isLight ? '#0e7490' : '#22d3ee'} />
            </linearGradient>
          </defs>

          <path d={areaPath} fill="url(#savings-trend-fill)" />
          <path d={linePath} fill="none" stroke="url(#savings-trend-line)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

          {points.map((point) => {
            const safeRate = clamp(point.savingsRate, -10, 10);

            return (
              <g key={point.key}>
                <circle cx={point.x} cy={point.y} r="5" fill={isLight ? '#ffffff' : '#ecfeff'} stroke={isLight ? '#047857' : '#34d399'} strokeWidth="1.5" />
                <text x={point.x} y={height - 4} textAnchor="middle" className={isLight ? 'fill-zinc-600 text-[12px] font-medium' : 'fill-zinc-400 text-[12px] font-medium'}>
                  {point.label}
                </text>
                <text x={point.x} y={point.y - 12} textAnchor="middle" className={isLight ? 'fill-zinc-800 text-[12px] font-semibold' : 'fill-zinc-100 text-[12px] font-semibold'}>
                  {formatPercent(safeRate)}
                </text>
                <title>{`${point.label}: ${formatPercent(safeRate)}`}</title>
              </g>
            );
          })}
        </svg>
      </div>
    </Card>
  );
}
