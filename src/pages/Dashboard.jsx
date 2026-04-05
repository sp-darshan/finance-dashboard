import { useMemo } from 'react';
import { useTransactions } from '../hooks/useTransactions';
import { getSummary } from '../utils/calculations';
import { formatCurrency } from '../utils/formatters';
import SummaryCard from '../components/dashboard/SummaryCard';
import BalanceChart from '../components/dashboard/BalanceChart';
import CategoryChart from '../components/dashboard/CategoryChart';
import TransactionTable from '../components/transactions/TransactionTable';

export default function Dashboard() {
  const { transactions, monthlyBalances, categoryTotals, deleteTransaction } = useTransactions();

  const summary = useMemo(() => getSummary(transactions), [transactions]);
  const recentTransactions = transactions.slice(0, 6);

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard label="Balance" value={formatCurrency(summary.balance)} meta="Income minus expenses" accent="from-cyan-400 to-blue-500" />
        <SummaryCard label="Income" value={formatCurrency(summary.income)} meta="All incoming money" accent="from-emerald-400 to-teal-500" />
        <SummaryCard label="Expenses" value={formatCurrency(summary.expenses)} meta="All outgoing money" accent="from-rose-400 to-orange-500" />
        <SummaryCard label="Savings rate" value={`${summary.savingsRate.toFixed(1)}%`} meta="Balance divided by income" accent="from-violet-400 to-fuchsia-500" />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <BalanceChart data={monthlyBalances} />
        <CategoryChart data={categoryTotals} />
      </section>

      <section className="space-y-4">
        <div>
          <p className="text-sm font-bold text-white">The latest activity from your ledger.</p>
        </div>
        <TransactionTable transactions={recentTransactions} onDelete={deleteTransaction} />
      </section>
    </div>
  );
}