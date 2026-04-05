import { useMemo } from 'react';
import { useFinanceStore } from '../store/useFinanceStore';
import { applyTransactionFilters, getCategoryTotals, getMonthlyBalances, getSummary } from '../utils/calculations';

export const useTransactions = () => {
  const transactions = useFinanceStore((state) => state.transactions);
  const filters = useFinanceStore((state) => state.filters);
  const role = useFinanceStore((state) => state.role);
  const categories = useFinanceStore((state) => state.categories);
  const addTransaction = useFinanceStore((state) => state.addTransaction);
  const updateTransaction = useFinanceStore((state) => state.updateTransaction);
  const deleteTransaction = useFinanceStore((state) => state.deleteTransaction);
  const addCategory = useFinanceStore((state) => state.addCategory);
  const removeCategory = useFinanceStore((state) => state.removeCategory);
  const setRole = useFinanceStore((state) => state.setRole);
  const setFilters = useFinanceStore((state) => state.setFilters);
  const resetFilters = useFinanceStore((state) => state.resetFilters);
  const resetDemoData = useFinanceStore((state) => state.resetDemoData);

  const filteredTransactions = useMemo(
    () => applyTransactionFilters(transactions, filters),
    [filters, transactions],
  );

  const summary = useMemo(() => getSummary(transactions), [transactions]);
  const monthlyBalances = useMemo(() => getMonthlyBalances(transactions), [transactions]);
  const categoryTotals = useMemo(() => getCategoryTotals(transactions, categories), [categories, transactions]);

  return {
    transactions,
    filteredTransactions,
    filters,
    role,
    categories,
    summary,
    monthlyBalances,
    categoryTotals,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    addCategory,
    removeCategory,
    setRole,
    setFilters,
    resetFilters,
    resetDemoData,
  };
};