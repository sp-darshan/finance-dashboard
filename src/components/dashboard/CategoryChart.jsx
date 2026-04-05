import Card from '../ui/Card';
import { formatCurrency } from '../../utils/formatters';

export default function CategoryChart({ data }) {
  const topCategories = data.slice(0, 6);
  const total = topCategories.reduce((sum, item) => sum + item.amount, 0) || 1;

  return (
    <Card>
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-white">Category mix</h2>
        <p className="text-sm text-zinc-400">Where expenses are concentrated.</p>
      </div>

      <div className="space-y-4">
        {topCategories.map((item) => {
          const percent = (item.amount / total) * 100;

          return (
            <div key={item.category}>
              <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                <span className="text-zinc-200">{item.category}</span>
                <span className="text-zinc-400">
                  {formatCurrency(item.amount)} · {percent.toFixed(0)}%
                </span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-zinc-800">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${percent}%`,
                    background: `linear-gradient(90deg, ${getBarColor(item.category, 0.85)}, ${getBarColor(item.category, 1)})`,
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

function getBarColor(category, alpha = 1) {
  const palette = {
    Salary: `rgba(34, 197, 94, ${alpha})`,
    Freelance: `rgba(20, 184, 166, ${alpha})`,
    Food: `rgba(249, 115, 22, ${alpha})`,
    Transport: `rgba(56, 189, 248, ${alpha})`,
    Shopping: `rgba(236, 72, 153, ${alpha})`,
    Bills: `rgba(245, 158, 11, ${alpha})`,
    Health: `rgba(239, 68, 68, ${alpha})`,
    Travel: `rgba(139, 92, 246, ${alpha})`,
    Entertainment: `rgba(6, 182, 212, ${alpha})`,
    Education: `rgba(99, 102, 241, ${alpha})`,
    Cash: `rgba(168, 85, 247, ${alpha})`,
  };

  return palette[category] ?? `rgba(161, 161, 170, ${alpha})`;
}