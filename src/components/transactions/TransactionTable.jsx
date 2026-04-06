import Card from '../ui/Card';
import { Fragment } from 'react';
import TransactionRow from './TransactionRow';
import { useTheme } from '../../hooks/useTheme';

const monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' });

const getGroupLabel = (transaction, groupBy) => {
  if (groupBy === 'type') {
    return transaction.type === 'income' ? 'Income' : 'Expense';
  }

  if (groupBy === 'category') {
    return transaction.category;
  }

  if (groupBy === 'month') {
    return monthFormatter.format(new Date(transaction.date));
  }

  return '';
};

export default function TransactionTable({ transactions, role, onDelete, onEdit, groupBy = 'none' }) {
  const { isLight } = useTheme();
  const groups = groupBy === 'none'
    ? [{ key: 'all', label: null, transactions }]
    : Object.entries(
      transactions.reduce((accumulator, transaction) => {
        const label = getGroupLabel(transaction, groupBy);

        if (!accumulator[label]) {
          accumulator[label] = [];
        }

        accumulator[label].push(transaction);

        return accumulator;
      }, {}),
    ).map(([label, groupedTransactions]) => ({ key: label, label, transactions: groupedTransactions }));

  return (
    <Card className="overflow-hidden p-0">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/8">
          <thead className={`text-left text-xs uppercase tracking-[0.18em] ${isLight ? 'bg-zinc-100 text-zinc-500' : 'bg-white/5 text-slate-400'}`}>
            <tr>
              <th className="px-4 py-4 font-semibold">Transaction</th>
              <th className="px-4 py-4 font-semibold">Date</th>
              <th className="px-4 py-4 font-semibold">Type</th>
              <th className="px-4 py-4 text-right font-semibold">Amount</th>
              {role === 'admin' && <th className="px-4 py-4 text-right font-semibold">Action</th>}
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              groups.map((group) => (
                <Fragment key={group.key}>
                  {group.label && (
                    <tr className={isLight ? 'bg-zinc-100/90' : 'bg-zinc-900/70'}>
                      <td className={`px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] ${isLight ? 'text-zinc-600' : 'text-zinc-300'}`} colSpan={role === 'admin' ? 5 : 4}>
                        {group.label}
                      </td>
                    </tr>
                  )}
                  {group.transactions.map((transaction) => (
                    <TransactionRow key={transaction.id} transaction={transaction} role={role} onDelete={onDelete} onEdit={onEdit} />
                  ))}
                </Fragment>
              ))
            ) : (
              <tr>
                <td className={`px-4 py-12 text-center ${isLight ? 'text-zinc-500' : 'text-slate-400'}`} colSpan={role === 'admin' ? 5 : 4}>
                  No transactions match the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}