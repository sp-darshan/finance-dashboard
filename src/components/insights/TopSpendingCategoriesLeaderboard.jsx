import { useState } from 'react';
import Card from '../ui/Card';
import { formatCurrency } from '../../utils/formatters';
import { useTheme } from '../../hooks/useTheme';

export default function TopSpendingCategoriesLeaderboard({ data }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const { isLight } = useTheme();
  const topCategories = data.slice(0, 6);
  const maxValue = Math.max(...topCategories.map((item) => item.amount), 1);
  const pointColors = ['#fb7185', '#f59e0b', '#22d3ee', '#818cf8', '#34d399', '#f472b6'];
  const chartSize = 360;
  const center = chartSize / 2;
  const outerRadius = 118;
  const gridLevels = 5;

  const points = topCategories.map((item, index) => {
    const angle = (-Math.PI / 2) + (index / Math.max(topCategories.length, 1)) * Math.PI * 2;
    const normalizedRadius = maxValue > 0 ? (item.amount / maxValue) * outerRadius : 0;
    const x = center + Math.cos(angle) * normalizedRadius;
    const y = center + Math.sin(angle) * normalizedRadius;

    return { ...item, angle, x, y };
  });

  const polygonPath = points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ');

  return (
    <Card className="relative overflow-hidden">
      <div>
        <h2 className={`text-lg font-semibold ${isLight ? 'text-zinc-900' : 'text-white'}`}>Top Spending Categories</h2>
        <p className={`text-sm ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>Spider chart view of your biggest expense buckets.</p>
      </div>

      <div className="mt-6">
        {topCategories.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <svg viewBox={`0 0 ${chartSize} ${chartSize}`} className="mx-auto min-w-[320px] max-w-105">
                {[...Array(gridLevels)].map((_, level) => {
                  const radius = ((level + 1) / gridLevels) * outerRadius;

                  return (
                    <circle
                      key={level}
                      cx={center}
                      cy={center}
                      r={radius}
                      fill="none"
                      stroke={isLight ? 'rgba(82, 82, 91, 0.20)' : 'rgba(161, 161, 170, 0.16)'}
                      strokeWidth="1"
                    />
                  );
                })}

                {topCategories.map((item, index) => {
                  const angle = (-Math.PI / 2) + (index / Math.max(topCategories.length, 1)) * Math.PI * 2;
                  const axisX = center + Math.cos(angle) * outerRadius;
                  const axisY = center + Math.sin(angle) * outerRadius;

                  return (
                    <line
                      key={item.category}
                      x1={center}
                      y1={center}
                      x2={axisX}
                      y2={axisY}
                      stroke={isLight ? 'rgba(63, 63, 70, 0.24)' : 'rgba(161, 161, 170, 0.2)'}
                      strokeWidth="1"
                    />
                  );
                })}

                <defs>
                  <linearGradient id="spider-fill" x1="0%" x2="100%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor={isLight ? 'rgba(113, 113, 122, 0.30)' : 'rgba(212, 212, 216, 0.36)'} />
                    <stop offset="100%" stopColor={isLight ? 'rgba(82, 82, 91, 0.10)' : 'rgba(82, 82, 91, 0.14)'} />
                  </linearGradient>
                </defs>

                <path d={`${polygonPath} Z`} fill="url(#spider-fill)" stroke={isLight ? '#52525b' : '#a1a1aa'} strokeWidth="2.5" strokeLinejoin="round" />

                {points.map((point, index) => (
                  <circle
                    key={point.category}
                    cx={point.x}
                    cy={point.y}
                    r={hoveredIndex === index ? '6.25' : '4.5'}
                    fill={pointColors[index % pointColors.length]}
                    stroke={isLight ? '#ffffff' : '#fdf2f8'}
                    strokeWidth="1.2"
                    className="cursor-pointer transition-all duration-150"
                    opacity={hoveredIndex === null || hoveredIndex === index ? 1 : 0.45}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  />
                ))}
              </svg>
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {topCategories.map((item, index) => {
                const ratio = maxValue > 0 ? (item.amount / maxValue) * 100 : 0;

                return (
                  <div
                    key={item.category}
                    className={`flex items-center justify-between gap-3 rounded-xl border px-3 py-2 text-sm transition-all duration-150 ${
                      hoveredIndex === null || hoveredIndex === index
                        ? isLight ? 'border-zinc-300 bg-zinc-100/90' : 'border-zinc-700/80 bg-zinc-100/6'
                        : isLight ? 'border-zinc-300/80 bg-zinc-200/80 opacity-60' : 'border-zinc-800/70 bg-white/2 opacity-60'
                    }`}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div className={`flex items-center gap-2 ${isLight ? 'text-zinc-700' : 'text-zinc-200'}`}>
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: pointColors[index % pointColors.length] }}
                      />
                      <span className={hoveredIndex === index ? isLight ? 'font-semibold text-zinc-900' : 'font-semibold text-white' : ''}>{index + 1}. {item.category}</span>
                    </div>
                    <span className={hoveredIndex === index ? isLight ? 'text-base font-semibold text-zinc-900' : 'text-base font-semibold text-zinc-100' : isLight ? 'text-base font-semibold text-zinc-700' : 'text-base font-semibold text-zinc-300'}>
                      {formatCurrency(item.amount)} ({ratio.toFixed(0)}%)
                    </span>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <p className={`rounded-2xl border border-dashed px-4 py-6 text-sm ${isLight ? 'border-zinc-300 bg-zinc-100 text-zinc-600' : 'border-zinc-800 bg-white/2 text-zinc-400'}`}>
            No spending categories available yet.
          </p>
        )}
      </div>
    </Card>
  );
}