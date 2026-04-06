import Card from '../ui/Card';
import { formatCurrency } from '../../utils/formatters';
import { useTheme } from '../../hooks/useTheme';

export default function BalanceChart({ data }) {
  const { isLight } = useTheme();
  const width = 760;
  const height = 300;
  const padding = 24;
  const innerWidth = width - padding * 2;
  const innerHeight = height - padding * 2;
  const midX = padding + innerWidth / 2;
  const midY = padding + innerHeight / 2;
  const values = data.map((item) => item.balance);
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const range = max - min || 1;
  const startBalance = data.find((item) => item.balance !== 0)?.balance ?? 0;
  const endBalance = data.at(-1)?.balance ?? 0;

  const points = data.map((item, index) => {
    const x = padding + (index / Math.max(data.length - 1, 1)) * innerWidth;
    const y = padding + innerHeight * (1 - (item.balance - min) / range);

    return { ...item, x, y };
  });

  const path = points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ');

  return (
    <Card>
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <h2 className={`text-lg font-semibold ${isLight ? 'text-zinc-900' : 'text-white'}`}>Balance trend</h2>
          <p className={`text-sm ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
            Monthly running balance from {formatCurrency(startBalance)} to {formatCurrency(endBalance)}.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto pt-4">
        <svg viewBox={`0 0 ${width} ${height}`} className="min-w-full">
          <line x1={padding} y1={midY} x2={width - padding} y2={midY} stroke={isLight ? 'rgba(63, 63, 70, 0.28)' : 'rgba(113,113,122,0.28)'} />
          <line x1={midX} y1={padding} x2={midX} y2={height - padding} stroke={isLight ? 'rgba(63, 63, 70, 0.28)' : 'rgba(113,113,122,0.28)'} />
          {[0, 1, 2, 3, 4].map((line) => (
            <line
              key={line}
              x1={padding}
              x2={width - padding}
              y1={padding + (innerHeight / 4) * line}
              y2={padding + (innerHeight / 4) * line}
              stroke={isLight ? 'rgba(82, 82, 91, 0.2)' : 'rgba(113,113,122,0.16)'}
            />
          ))}
          <path d={path} fill="none" stroke="url(#balance-line)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <defs>
            <linearGradient id="balance-line" x1="0%" x2="100%" y1="0%" y2="0%">
              <stop offset="0%" stopColor={isLight ? '#d97706' : '#f59e0b'} />
              <stop offset="50%" stopColor={isLight ? '#6d28d9' : '#8b5cf6'} />
              <stop offset="100%" stopColor={isLight ? '#0891b2' : '#06b6d4'} />
            </linearGradient>
          </defs>
          {points.map((point) => (
            <g key={point.key}>
              {renderValueLabel(point, midX, midY, isLight)}
              <circle cx={point.x} cy={point.y} r="5" fill={isLight ? '#ffffff' : '#fafafa'} stroke={isLight ? '#d97706' : '#f59e0b'} strokeWidth="1.5" />
              <text x={point.x} y={height - 4} textAnchor="middle" className={isLight ? 'fill-zinc-600 text-[12px] font-medium' : 'fill-zinc-400 text-[12px] font-medium'}>
                {point.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </Card>
  );
}

function renderValueLabel(point, midX, midY, isLight) {
  const isTopHalf = point.y <= midY;
  const isRightHalf = point.x > midX;
  const value = formatCurrency(point.balance);
  const labelWidth = Math.max(88, value.length * 8.5 + 18);
  const labelHeight = 24;

  if (isTopHalf && isRightHalf) {
    return (
      <g>
        <rect
          x={point.x - labelWidth + 6}
          y={point.y + 10}
          width={labelWidth}
          height={labelHeight}
          rx="12"
          fill={isLight ? 'rgba(244, 244, 245, 0.98)' : 'rgba(17, 17, 17, 0.9)'}
          stroke={isLight ? 'rgba(63, 63, 70, 0.2)' : 'rgba(255, 255, 255, 0.12)'}
        />
        <text x={point.x - 8} y={point.y + 27} textAnchor="end" className={isLight ? 'fill-zinc-800 text-[13px] font-semibold' : 'fill-zinc-100 text-[13px] font-semibold'}>
          {value}
        </text>
      </g>
    );
  }

  if (!isTopHalf) {
    return (
      <g>
        <rect
          x={point.x - labelWidth / 2}
          y={point.y - 36}
          width={labelWidth}
          height={labelHeight}
          rx="12"
          fill={isLight ? 'rgba(244, 244, 245, 0.98)' : 'rgba(17, 17, 17, 0.9)'}
          stroke={isLight ? 'rgba(63, 63, 70, 0.2)' : 'rgba(255, 255, 255, 0.12)'}
        />
        <text x={point.x} y={point.y - 19} textAnchor="middle" className={isLight ? 'fill-zinc-800 text-[13px] font-semibold' : 'fill-zinc-100 text-[13px] font-semibold'}>
          {value}
        </text>
      </g>
    );
  }

  return (
    <g>
      <rect
        x={point.x + 6}
        y={point.y + 10}
        width={labelWidth}
        height={labelHeight}
        rx="12"
        fill={isLight ? 'rgba(244, 244, 245, 0.98)' : 'rgba(17, 17, 17, 0.9)'}
        stroke={isLight ? 'rgba(63, 63, 70, 0.2)' : 'rgba(255, 255, 255, 0.12)'}
      />
      <text x={point.x + 14} y={point.y + 27} textAnchor="start" className={isLight ? 'fill-zinc-800 text-[13px] font-semibold' : 'fill-zinc-100 text-[13px] font-semibold'}>
        {value}
      </text>
    </g>
  );
}