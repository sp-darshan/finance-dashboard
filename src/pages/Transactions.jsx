import { useMemo, useState } from 'react';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Filters from '../components/transactions/Filters';
import TransactionForm from '../components/transactions/TransactionForm';
import TransactionTable from '../components/transactions/TransactionTable';
import SummaryCard from '../components/dashboard/SummaryCard';
import { useTransactions } from '../hooks/useTransactions';
import { applyTransactionFilters, getSummary } from '../utils/calculations';
import { formatCurrency } from '../utils/formatters';

export default function Transactions() {
  const {
    transactions,
    filters,
    setFilters,
    resetFilters,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    role,
    categories,
    addCategory,
    removeCategory,
  } = useTransactions();
  const [showModal, setShowModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const visibleTransactions = useMemo(
    () => applyTransactionFilters(transactions, filters),
    [filters, transactions],
  );

  const filteredSummary = useMemo(
    () => getSummary(visibleTransactions),
    [visibleTransactions],
  );

  const handleAddTransaction = (transaction) => {
    if (editingTransaction) {
      updateTransaction(editingTransaction.id, transaction);
      setEditingTransaction(null);
    } else {
      addTransaction(transaction);
    }
    setShowModal(false);
  };

  const handleOpenAdd = () => {
    setEditingTransaction(null);
    setShowModal(true);
  };

  const handleOpenEdit = (transaction) => {
    setEditingTransaction(transaction);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTransaction(null);
  };

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          label="Filtered expenses"
          value={formatCurrency(filteredSummary.expenses)}
          meta="Based on the active filters"
          accent="from-rose-400 to-orange-500"
        />
        <SummaryCard
          label="Filtered income"
          value={formatCurrency(filteredSummary.income)}
          meta="Based on the active filters"
          accent="from-emerald-400 to-teal-500"
        />
      </section>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-white">Manage your ledger and keep the source data clean.</p>
        </div>
        {role === 'admin' ? (
          <Button onClick={handleOpenAdd} type="button">Add transaction</Button>
        ) : (
          <span className="rounded-full border border-zinc-700 bg-zinc-950/70 px-3 py-2 text-xs uppercase tracking-[0.22em] text-zinc-400">
            Viewer mode: read only
          </span>
        )}
      </div>

      <Filters filters={filters} categories={categories} onChange={setFilters} onReset={resetFilters} />
      <TransactionTable
        transactions={visibleTransactions}
        role={role}
        onDelete={deleteTransaction}
        onEdit={handleOpenEdit}
      />

      <Modal open={showModal} title={editingTransaction ? 'Edit transaction' : 'New transaction'} onClose={handleCloseModal}>
        <TransactionForm
          key={editingTransaction?.id ?? 'new-transaction'}
          onSubmit={handleAddTransaction}
          onCancel={handleCloseModal}
          initialData={editingTransaction}
          submitLabel={editingTransaction ? 'Update transaction' : 'Save transaction'}
          categories={categories}
          onAddCategory={addCategory}
          onRemoveCategory={removeCategory}
        />
      </Modal>
    </div>
  );
}