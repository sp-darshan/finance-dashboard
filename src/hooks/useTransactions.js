import { useMemo } from 'react';
import { useFinanceStore } from '../store/useFinanceStore';
import { applyTransactionFilters, getCategoryTotals, getMonthlyBalances, getSummary } from '../utils/calculations';

export const useTransactions = () => {
  const transactions = useFinanceStore((state) => state.transactions);
  const filters = useFinanceStore((state) => state.filters);
  const role = useFinanceStore((state) => state.role);
  const theme = useFinanceStore((state) => state.theme);
  const categories = useFinanceStore((state) => state.categories);
  const isSyncingMock = useFinanceStore((state) => state.isSyncingMock);
  const hasLoadedInitialMock = useFinanceStore((state) => state.hasLoadedInitialMock);
  const addTransaction = useFinanceStore((state) => state.addTransaction);
  const updateTransaction = useFinanceStore((state) => state.updateTransaction);
  const deleteTransaction = useFinanceStore((state) => state.deleteTransaction);
  const initializeTransactionsFromMock = useFinanceStore((state) => state.initializeTransactionsFromMock);
  const resetToInitialLoadedData = useFinanceStore((state) => state.resetToInitialLoadedData);
  const addCategory = useFinanceStore((state) => state.addCategory);
  const removeCategory = useFinanceStore((state) => state.removeCategory);
  const setRole = useFinanceStore((state) => state.setRole);
  const setTheme = useFinanceStore((state) => state.setTheme);
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
    theme,
    categories,
    isSyncingMock,
    hasLoadedInitialMock,
    summary,
    monthlyBalances,
    categoryTotals,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    initializeTransactionsFromMock,
    resetToInitialLoadedData,
    addCategory,
    removeCategory,
    setRole,
    setTheme,
    setFilters,
    resetFilters,
    resetDemoData,
  };
};