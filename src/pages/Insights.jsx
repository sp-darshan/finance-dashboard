import { useMemo } from 'react';
import { useTransactions } from '../hooks/useTransactions';
import { getMonthlyComparison, getMonthlyExpenseTrend } from '../utils/calculations';
import BalanceChart from '../components/dashboard/BalanceChart';
import MonthlyIncomeExpenseChart from '../components/insights/MonthlyIncomeExpenseChart';
import TopSpendingCategoriesLeaderboard from '../components/insights/TopSpendingCategoriesLeaderboard';
import SpendingTrendChart from '../components/insights/SpendingTrendChart';

export default function Insights() {
  const { transactions, monthlyBalances, categoryTotals } = useTransactions();

  const monthlyComparison = useMemo(() => getMonthlyComparison(transactions), [transactions]);
  const spendingTrend = useMemo(() => getMonthlyExpenseTrend(transactions), [transactions]);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-bold text-white">High-signal metrics from the same data used everywhere else.</p>
      </div>

      <section className="grid gap-6 xl:grid-cols-2">
        <BalanceChart data={monthlyBalances} />
        <MonthlyIncomeExpenseChart data={monthlyComparison} />
        <TopSpendingCategoriesLeaderboard data={categoryTotals} />
        <SpendingTrendChart data={spendingTrend} />
      </section>
    </div>
  );
}