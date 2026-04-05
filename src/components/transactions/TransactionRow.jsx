import Button from '../ui/Button';
import {
  FaBriefcase,
  FaCar,
  FaFileInvoiceDollar,
  FaFilm,
  FaGraduationCap,
  FaHeartbeat,
  FaMoneyBillWave,
  FaPlane,
  FaShoppingBag,
  FaPen,
  FaTrashAlt,
  FaUtensils,
  FaWallet,
} from 'react-icons/fa';
import { formatCurrency, formatDate, getCategoryColor } from '../../utils/formatters';

const CATEGORY_ICONS = {
  Salary: <FaWallet />,
  Freelance: <FaBriefcase />,
  Food: <FaUtensils />,
  Transport: <FaCar />,
  Shopping: <FaShoppingBag />,
  Bills: <FaFileInvoiceDollar />,
  Health: <FaHeartbeat />,
  Travel: <FaPlane />,
  Entertainment: <FaFilm />,
  Education: <FaGraduationCap />,
  Cash: <FaMoneyBillWave />,
  default: <FaWallet />,
};

export default function TransactionRow({ transaction, role, onDelete, onEdit }) {
  const isIncome = transaction.type === 'income';

  return (
    <tr className="border-b border-white/8 last:border-0">
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <CategoryBadge category={transaction.category} />
          <div>
            <div className="font-medium text-white">{transaction.description}</div>
            <div className="text-sm text-zinc-400">{transaction.category}</div>
          </div>
        </div>
      </td>
      <td className="px-4 py-4 text-sm text-zinc-300">{formatDate(transaction.date)}</td>
      <td className="px-4 py-4 text-sm text-zinc-300 capitalize">{transaction.type}</td>
      <td className={`px-4 py-4 text-right text-sm font-semibold ${isIncome ? 'text-zinc-100' : 'text-zinc-300'}`}>
        {isIncome ? '+' : '-'}{formatCurrency(transaction.amount)}
      </td>
      {role === 'admin' && (
        <td className="px-4 py-4 text-right">
          <div className="flex items-center justify-end gap-2">
            <button
              aria-label="Edit transaction"
              className="inline-flex items-center justify-center rounded-2xl border border-zinc-700 bg-zinc-900 p-2 text-zinc-200 transition hover:bg-zinc-800 hover:text-white"
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

function CategoryBadge({ category }) {
  const icon = CATEGORY_ICONS[category] ?? CATEGORY_ICONS.default;
  const color = getCategoryColor(category);

  return (
    <div className="grid h-10 w-10 place-items-center rounded-2xl border border-zinc-800 bg-zinc-900 text-lg" style={{ color }}>
      {icon}
    </div>
  );
}