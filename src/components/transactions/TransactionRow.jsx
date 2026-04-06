import { createElement } from 'react';
import Button from '../ui/Button';
import {
  FaPen,
  FaTrashAlt,
} from 'react-icons/fa';
import { formatCurrency, formatDate, getCategoryColor, getCategoryIcon, getFallbackIcon } from '../../utils/formatters';
import { useTheme } from '../../hooks/useTheme';

export default function TransactionRow({ transaction, role, onDelete, onEdit }) {
  const { isLight } = useTheme();
  const isIncome = transaction.type === 'income';

  return (
    <tr className={`border-b last:border-0 ${isLight ? 'border-zinc-200' : 'border-white/8'}`}>
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <CategoryBadge category={transaction.category} isLight={isLight} />
          <div>
            <div className={`font-medium ${isLight ? 'text-zinc-900' : 'text-white'}`}>{transaction.description}</div>
            <div className={`text-sm ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>{transaction.category}</div>
          </div>
        </div>
      </td>
      <td className={`px-4 py-4 text-sm ${isLight ? 'text-zinc-600' : 'text-zinc-300'}`}>{formatDate(transaction.date)}</td>
      <td className={`px-4 py-4 text-sm capitalize ${isLight ? 'text-zinc-600' : 'text-zinc-300'}`}>{transaction.type}</td>
      <td className={`px-4 py-4 text-right text-sm font-semibold ${isIncome ? (isLight ? 'text-emerald-700' : 'text-emerald-400') : (isLight ? 'text-rose-700' : 'text-rose-400')}`}>
        {isIncome ? '+' : '-'}{formatCurrency(transaction.amount)}
      </td>
      {role === 'admin' && (
        <td className="px-4 py-4 text-right">
          <div className="flex items-center justify-end gap-2">
            <button
              aria-label="Edit transaction"
              className={`inline-flex items-center justify-center rounded-2xl border p-2 transition ${isLight ? 'border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900' : 'border-zinc-700 bg-zinc-900 text-zinc-200 hover:bg-zinc-800 hover:text-white'}`}
              onClick={() => onEdit(transaction)}
              type="button"
            >
              <FaPen />
            </button>
            <button
              aria-label="Delete transaction"
              className="inline-flex items-center justify-center rounded-2xl border border-rose-500/30 bg-rose-500/10 p-2 text-rose-500 transition hover:bg-rose-500/20 hover:text-rose-400"
              onClick={() => onDelete(transaction.id)}
              type="button"
            >
              <FaTrashAlt />
            </button>
          </div>
        </td>
      )}
    </tr>
  );
}

function CategoryBadge({ category, isLight }) {
  const CategoryIcon = getCategoryIcon(category) ?? getFallbackIcon();
  const color = getCategoryColor(category);

  return (
    <div className={`grid h-10 w-10 place-items-center rounded-2xl border text-lg ${isLight ? 'border-zinc-300 bg-zinc-100' : 'border-zinc-800 bg-zinc-900'}`} style={{ color }}>
      {createElement(CategoryIcon)}
    </div>
  );
}