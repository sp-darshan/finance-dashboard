import Card from '../ui/Card';
import { formatCurrency } from '../../utils/formatters';
import { useTheme } from '../../hooks/useTheme';

export default function CategoryChart({ data }) {
  const { isLight } = useTheme();
  const topCategories = data.slice(0, 6);
  const total = topCategories.reduce((sum, item) => sum + item.amount, 0) || 1;

  return (
    <Card>
      <div className="mb-5">
        <h2 className={`text-lg font-semibold ${isLight ? 'text-zinc-900' : 'text-white'}`}>Category mix</h2>
        <p className={`text-sm ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>Where expenses are concentrated.</p>
      </div>

      <div className="space-y-4">
        {topCategories.map((item) => {
          const percent = (item.amount / total) * 100;

          return (
            <div key={item.category}>
              <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                <span className={isLight ? 'text-zinc-800' : 'text-zinc-200'}>{item.category}</span>
                <span className={isLight ? 'text-zinc-600' : 'text-zinc-400'}>
                  {formatCurrency(item.amount)} · {percent.toFixed(0)}%
                </span>
              </div>
              <div className={`h-3 overflow-hidden rounded-full ${isLight ? 'bg-zinc-300/90' : 'bg-zinc-800'}`}>
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${percent}%`,
                    background: `linear-gradient(90deg, ${getBarColor(item.category, isLight ? 0.95 : 0.85, isLight)}, ${getBarColor(item.category, 1, isLight)})`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function getBarColor(category, alpha = 1, isLight = false) {
  const palette = {
    Salary: `rgba(${isLight ? '21, 128, 61' : '34, 197, 94'}, ${alpha})`,
    Freelance: `rgba(${isLight ? '13, 148, 136' : '20, 184, 166'}, ${alpha})`,
    Food: `rgba(${isLight ? '194, 65, 12' : '249, 115, 22'}, ${alpha})`,
    Transport: `rgba(${isLight ? '3, 105, 161' : '56, 189, 248'}, ${alpha})`,
    Shopping: `rgba(${isLight ? '190, 24, 93' : '236, 72, 153'}, ${alpha})`,
    Bills: `rgba(${isLight ? '180, 83, 9' : '245, 158, 11'}, ${alpha})`,
    Health: `rgba(${isLight ? '185, 28, 28' : '239, 68, 68'}, ${alpha})`,
    Travel: `rgba(${isLight ? '109, 40, 217' : '139, 92, 246'}, ${alpha})`,
    Entertainment: `rgba(${isLight ? '14, 116, 144' : '6, 182, 212'}, ${alpha})`,
    Education: `rgba(${isLight ? '67, 56, 202' : '99, 102, 241'}, ${alpha})`,
    Cash: `rgba(${isLight ? '147, 51, 234' : '168, 85, 247'}, ${alpha})`,
  };

  return palette[category] ?? `rgba(${isLight ? '82, 82, 91' : '161, 161, 170'}, ${alpha})`;
}