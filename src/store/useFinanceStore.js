import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CATEGORIES } from '../constants/categories';
import { seedTransactions } from '../data/transactions';

const defaultFilters = {
  type: 'all',
  category: 'all',
  search: '',
  startDate: '',
  endDate: '',
};

const defaultRole = 'viewer';
const defaultCategories = CATEGORIES.map((category) => category.name);
const STORE_VERSION = 2;

const createTransactionId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const migrateStore = (persistedState = {}, version) => {
  if (!persistedState || typeof persistedState !== 'object') {
    return {
      transactions: seedTransactions,
      filters: defaultFilters,
      role: defaultRole,
      categories: defaultCategories,
    };
  }

  if (!version || version < STORE_VERSION) {
    return {
      ...persistedState,
      transactions: seedTransactions,
      filters: persistedState.filters ?? defaultFilters,
      role: persistedState.role ?? defaultRole,
      categories: persistedState.categories ?? defaultCategories,
    };
  }

  return {
    ...persistedState,
    filters: persistedState.filters ?? defaultFilters,
    role: persistedState.role ?? defaultRole,
    categories: persistedState.categories ?? defaultCategories,
  };
};

export const useFinanceStore = create(
  persist(
    (set, get) => ({
      transactions: seedTransactions,
      filters: defaultFilters,
      role: defaultRole,
      categories: defaultCategories,
      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [
            {
              id: createTransactionId(),
              date: new Date().toISOString().slice(0, 10),
              ...transaction,
              amount: Number(transaction.amount),
            },
            ...state.transactions,
          ],
        })),
      updateTransaction: (id, updates) =>
        set((state) => ({
          transactions: state.transactions.map((transaction) =>
            transaction.id === id
              ? {
                  ...transaction,
                  ...updates,
                  amount: Number(updates.amount ?? transaction.amount),
                }
              : transaction,
          ),
        })),
      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((transaction) => transaction.id !== id),
        })),
      addCategory: (categoryName) => {
        const nextCategory = categoryName.trim();

        if (!nextCategory) {
          return false;
        }

        const alreadyExists = get().categories.some(
          (category) => category.toLowerCase() === nextCategory.toLowerCase(),
        );

        if (alreadyExists) {
          return false;
        }

        set((state) => ({
          categories: [...state.categories, nextCategory],
        }));

        return true;
      },
      removeCategory: (categoryName) => {
        if (defaultCategories.some((category) => category.toLowerCase() === categoryName.toLowerCase())) {
          return false;
        }

        const nextCategory = categoryName.trim();

        set((state) => {
          const remainingCategories = state.categories.filter(
            (category) => category.toLowerCase() !== nextCategory.toLowerCase(),
          );

          return {
            categories: remainingCategories,
            filters: state.filters.category === nextCategory
              ? { ...state.filters, category: 'all' }
              : state.filters,
          };
        });

        return true;
      },
      replaceTransactions: (transactions) => set({ transactions }),
      setFilters: (nextFilters) =>
        set((state) => ({
          filters: { ...state.filters, ...nextFilters },
        })),
      setRole: (role) => set({ role }),
      resetFilters: () => set({ filters: defaultFilters }),
      resetDemoData: () => set({ transactions: seedTransactions }),
    }),
    {
      name: 'finance-dashboard-store',
      version: STORE_VERSION,
      migrate: migrateStore,
      partialize: (state) => ({
        transactions: state.transactions,
        filters: state.filters,
        role: state.role,
        categories: state.categories,
      }),
    },
  ),
);

export { defaultFilters };