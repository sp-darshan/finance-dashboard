import { useMemo } from 'react';
import { useTransactions } from '../hooks/useTransactions';
import { getMonthlyComparison, getMonthlyExpenseTrend, getMonthlySavingsRateTrend } from '../utils/calculations';
import BalanceChart from '../components/dashboard/BalanceChart';
import MonthlyIncomeExpenseChart from '../components/insights/MonthlyIncomeExpenseChart';
import TopSpendingCategoriesLeaderboard from '../components/insights/TopSpendingCategoriesLeaderboard';
import SpendingTrendChart from '../components/insights/SpendingTrendChart';
import SavingsTrendChart from '../components/insights/SavingsTrendChart';

export default function Insights() {
  const { transactions, monthlyBalances, categoryTotals, theme } = useTransactions();
  const isLight = theme === 'light';

  const monthlyComparison = useMemo(() => getMonthlyComparison(transactions), [transactions]);
  const spendingTrend = useMemo(() => getMonthlyExpenseTrend(transactions), [transactions]);
  const savingsTrend = useMemo(() => getMonthlySavingsRateTrend(transactions), [transactions]);

  return (
    <div className="space-y-6">
      <div>
        <p className={`text-sm font-bold ${isLight ? 'text-zinc-900' : 'text-white'}`}>Get more insights on your money here</p>
      </div>

      <section className="grid gap-6 xl:grid-cols-2">
        <BalanceChart data={monthlyBalances} />
        <MonthlyIncomeExpenseChart data={monthlyComparison} />
        <TopSpendingCategoriesLeaderboard data={categoryTotals} />
        <div className="grid gap-6 xl:h-full xl:grid-rows-2">
          <SpendingTrendChart data={spendingTrend} />
          <SavingsTrendChart data={savingsTrend} />
        </div>
      </section>
    </div>
  );
}