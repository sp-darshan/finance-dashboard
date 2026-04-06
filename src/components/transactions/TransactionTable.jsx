import Card from '../ui/Card';
import { Fragment, useMemo, useState } from 'react';
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

export default function TransactionTable({ transactions, role, onDelete, onEdit, groupBy = 'none', pageSize = 10 }) {
  const { isLight } = useTheme();
  const [selectedPage, setSelectedPage] = useState(1);

  const totalPages = Math.max(Math.ceil(transactions.length / pageSize), 1);
  const currentPage = Math.min(selectedPage, totalPages);

  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    return transactions.slice(startIndex, endIndex);
  }, [currentPage, pageSize, transactions]);

  const groups = groupBy === 'none'
    ? [{ key: 'all', label: null, transactions: paginatedTransactions }]
    : Object.entries(
      paginatedTransactions.reduce((accumulator, transaction) => {
        const label = getGroupLabel(transaction, groupBy);

        if (!accumulator[label]) {
          accumulator[label] = [];
        }

        accumulator[label].push(transaction);

        return accumulator;
      }, {}),
    ).map(([label, groupedTransactions]) => ({ key: label, label, transactions: groupedTransactions }));

  const pageStart = transactions.length > 0 ? (currentPage - 1) * pageSize + 1 : 0;
  const pageEnd = Math.min(currentPage * pageSize, transactions.length);
  const showPagination = transactions.length > pageSize;
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1).filter((page) => Math.abs(page - currentPage) <= 2 || page === 1 || page === totalPages);

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

      {showPagination && (
        <div className={`flex flex-wrap items-center justify-between gap-3 border-t px-4 py-3 ${isLight ? 'border-zinc-200 bg-zinc-50/70' : 'border-white/10 bg-white/2'}`}>
          <p className={`text-sm ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
            Showing {pageStart}-{pageEnd} of {transactions.length}
          </p>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setSelectedPage((page) => Math.max(page - 1, 1))}
              disabled={currentPage === 1}
              className={`rounded-xl border px-3 py-1.5 text-sm transition disabled:cursor-not-allowed disabled:opacity-50 ${isLight ? 'border-zinc-300 text-zinc-700 hover:bg-zinc-100' : 'border-zinc-700 text-zinc-200 hover:bg-zinc-800'}`}
            >
              Prev
            </button>

            {pageNumbers.map((page, index) => {
              const previous = pageNumbers[index - 1];
              const showGap = previous && page - previous > 1;

              return (
                <Fragment key={page}>
                  {showGap && <span className={`px-1 text-sm ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>...</span>}
                  <button
                    type="button"
                    onClick={() => setSelectedPage(page)}
                    className={`rounded-xl border px-3 py-1.5 text-sm transition ${
                      page === currentPage
                        ? isLight
                          ? 'border-zinc-900 bg-zinc-900 text-white'
                          : 'border-zinc-100 bg-zinc-100 text-zinc-950'
                        : isLight
                          ? 'border-zinc-300 text-zinc-700 hover:bg-zinc-100'
                          : 'border-zinc-700 text-zinc-200 hover:bg-zinc-800'
                    }`}
                  >
                    {page}
                  </button>
                </Fragment>
              );
            })}

            <button
              type="button"
              onClick={() => setSelectedPage((page) => Math.min(page + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`rounded-xl border px-3 py-1.5 text-sm transition disabled:cursor-not-allowed disabled:opacity-50 ${isLight ? 'border-zinc-300 text-zinc-700 hover:bg-zinc-100' : 'border-zinc-700 text-zinc-200 hover:bg-zinc-800'}`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </Card>
  );
}