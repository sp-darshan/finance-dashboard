import Card from '../ui/Card';
import TransactionRow from './TransactionRow';

export default function TransactionTable({ transactions, role, onDelete, onEdit }) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/8">
          <thead className="bg-white/5 text-left text-xs uppercase tracking-[0.18em] text-slate-400">
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
              transactions.map((transaction) => (
                <TransactionRow key={transaction.id} transaction={transaction} role={role} onDelete={onDelete} onEdit={onEdit} />
              ))
            ) : (
              <tr>
                <td className="px-4 py-12 text-center text-slate-400" colSpan={role === 'admin' ? 5 : 4}>
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