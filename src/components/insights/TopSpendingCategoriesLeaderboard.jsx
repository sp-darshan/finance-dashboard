import Card from '../ui/Card';
import { formatCurrency } from '../../utils/formatters';

export default function TopSpendingCategoriesLeaderboard({ data }) {
  const topCategories = data.slice(0, 6);
  const maxValue = Math.max(...topCategories.map((item) => item.amount), 1);

  return (
    <Card className="relative overflow-hidden">
      <div>
        <h2 className="text-lg font-semibold text-white">Top Spending Categories</h2>
        <p className="text-sm text-zinc-400">Leaderboard style breakdown of the biggest expense buckets.</p>
      </div>

      <div className="mt-6 space-y-4">
        {topCategories.length > 0 ? (
          topCategories.map((item, index) => {
            const barWidth = `${Math.max((item.amount / maxValue) * 100, 12)}%`;

            return (
              <div key={item.category} className="grid gap-2">
                <div className="flex items-center justify-between gap-4 text-sm">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs font-semibold text-white">
                      {index + 1}
                    </span>
                    <span className="font-medium text-white">{item.category}</span>
                  </div>
                  <span className="font-semibold text-zinc-200">{formatCurrency(item.amount)}</span>
                </div>

                <div className="h-3 rounded-full border border-zinc-800 bg-white/[0.03] p-0.5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-rose-400 via-orange-400 to-amber-300 shadow-[0_0_16px_rgba(255,255,255,0.08)]"
                    style={{ width: barWidth }}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <p className="rounded-2xl border border-dashed border-zinc-800 bg-white/[0.02] px-4 py-6 text-sm text-zinc-400">
            No spending categories available yet.
          </p>
        )}
      </div>
    </Card>
  );
}