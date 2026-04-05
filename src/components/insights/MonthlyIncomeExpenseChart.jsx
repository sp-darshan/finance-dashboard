import Card from '../ui/Card';
import { formatCurrency } from '../../utils/formatters';

export default function MonthlyIncomeExpenseChart({ data }) {
  const values = data.flatMap((month) => [month.income, month.expenses]);
  const maxValue = Math.max(...values, 1);
  const chartHeight = 180;

  return (
    <Card className="relative overflow-hidden">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-white">Monthly Income vs Expense Comparison</h2>
          <p className="text-sm text-zinc-400">Compare inflows and outflows month by month.</p>
        </div>
        <div className="flex flex-col gap-2 text-xs text-zinc-400 sm:flex-row sm:items-center">
          <LegendDot color="bg-emerald-400" label="Income" />
          <LegendDot color="bg-rose-400" label="Expenses" />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-6">
        {data.map((month) => (
          <div key={month.key} className="flex flex-col items-center gap-3">
            <div className="flex h-[180px] w-full items-end justify-center gap-2 rounded-3xl border border-zinc-800/80 bg-white/[0.02] px-3 py-4">
              <Bar value={month.income} maxValue={maxValue} height={chartHeight} gradient="from-emerald-500 to-teal-400" />
              <Bar value={month.expenses} maxValue={maxValue} height={chartHeight} gradient="from-rose-500 to-orange-400" />
            </div>
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-300">{month.label}</p>
              <p className="mt-1 text-[11px] text-zinc-500">
                {formatCurrency(month.income)} / {formatCurrency(month.expenses)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function Bar({ value, maxValue, height, gradient }) {
  const barHeight = Math.max((value / maxValue) * height, value > 0 ? 10 : 4);

  return (
    <div className="flex h-full w-full flex-col justify-end">
      <div
        className={`w-full rounded-full bg-gradient-to-t ${gradient} shadow-[0_0_18px_rgba(255,255,255,0.08)]`}
        style={{ height: `${barHeight}px` }}
        title={formatCurrency(value)}
      />
    </div>
  );
}

function LegendDot({ color, label }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
      <span>{label}</span>
    </div>
  );
}