import Card from '../ui/Card';
import InsightCard from './InsightCard';
import { formatCurrency } from '../../utils/formatters';

export default function InsightsPanel({ insights }) {
  const savingsColor = insights.summary.balance >= 0 ? 'from-emerald-400 to-teal-500' : 'from-rose-400 to-orange-500';

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <div className="grid gap-4 md:grid-cols-2">
        <InsightCard title="Total income" value={formatCurrency(insights.summary.income)} subtitle="All inflows tracked" accent="from-emerald-400 to-teal-500" />
        <InsightCard title="Total expenses" value={formatCurrency(insights.summary.expenses)} subtitle="All outflows tracked" accent="from-rose-400 to-orange-500" />
        <InsightCard title="Net balance" value={formatCurrency(insights.summary.balance)} subtitle={`Savings rate ${insights.summary.savingsRate.toFixed(1)}%`} accent={savingsColor} />
        <InsightCard title="Average transaction" value={formatCurrency(insights.averageTransaction)} subtitle="Blended amount per transaction" accent="from-blue-400 to-cyan-500" />
      </div>

      <Card>
        <h2 className="text-lg font-semibold text-white">Notes</h2>
        <div className="mt-4 space-y-4 text-sm text-zinc-300">
          {insights.topCategory && <p>Your largest expense category is <span className="font-semibold text-white">{insights.topCategory.category}</span> at {formatCurrency(insights.topCategory.amount)}.</p>}
          {insights.largestTransaction && <p>The biggest single transaction is <span className="font-semibold text-white">{formatCurrency(insights.largestTransaction.amount)}</span> for {insights.largestTransaction.description}.</p>}
          <p>Month-over-month balance changed by <span className="font-semibold text-white">{formatCurrency(insights.monthlyDelta)}</span>.</p>
        </div>
      </Card>
    </div>
  );
}