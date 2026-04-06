import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CATEGORIES } from '../constants/categories';
import { fetchMockTransactions } from '../api/mockApi';
import { seedTransactions } from '../data/transactions';

const defaultFilters = {
  type: 'all',
  category: 'all',
  search: '',
  startDate: '',
  endDate: '',
  sortBy: 'date-desc',
  groupBy: 'none',
};

const defaultRole = 'viewer';
const defaultTheme = 'light';
const defaultCategories = CATEGORIES.map((category) => category.name);
const STORE_VERSION = 4;

const createTransactionId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const migrateStore = (persistedState = {}, version) => {
  if (!persistedState || typeof persistedState !== 'object') {
    return {
      transactions: seedTransactions,
      initialLoadedTransactions: seedTransactions,
      hasLoadedInitialMock: false,
      filters: defaultFilters,
      role: defaultRole,
      theme: defaultTheme,
      categories: defaultCategories,
    };
  }

  if (!version || version < STORE_VERSION) {
    return {
      ...persistedState,
      transactions: seedTransactions,
      initialLoadedTransactions: persistedState.initialLoadedTransactions ?? seedTransactions,
      hasLoadedInitialMock: persistedState.hasLoadedInitialMock ?? false,
      filters: { ...defaultFilters, ...(persistedState.filters ?? {}) },
      role: persistedState.role ?? defaultRole,
      theme: persistedState.theme ?? defaultTheme,
      categories: persistedState.categories ?? defaultCategories,
    };
  }

  return {
    ...persistedState,
    initialLoadedTransactions: persistedState.initialLoadedTransactions ?? seedTransactions,
    hasLoadedInitialMock: persistedState.hasLoadedInitialMock ?? false,
    filters: { ...defaultFilters, ...(persistedState.filters ?? {}) },
    role: persistedState.role ?? defaultRole,
    theme: persistedState.theme ?? defaultTheme,
    categories: persistedState.categories ?? defaultCategories,
  };
};

export const useFinanceStore = create(
  persist(
    (set, get) => ({
      transactions: seedTransactions,
      initialLoadedTransactions: seedTransactions,
      hasLoadedInitialMock: false,
      filters: defaultFilters,
      role: defaultRole,
      theme: defaultTheme,
      categories: defaultCategories,
      isSyncingMock: false,
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
      setTheme: (theme) => set({ theme }),
      resetFilters: () => set({ filters: defaultFilters }),
      resetDemoData: () => set({ transactions: seedTransactions }),
      initializeTransactionsFromMock: async () => {
        const { hasLoadedInitialMock, isSyncingMock } = get();

        if (hasLoadedInitialMock || isSyncingMock) {
          return;
        }

        set({ isSyncingMock: true });

        try {
          const transactions = await fetchMockTransactions();
          set({
            transactions,
            initialLoadedTransactions: transactions,
            hasLoadedInitialMock: true,
          });
        } finally {
          set({ isSyncingMock: false });
        }
      },
      resetToInitialLoadedData: () =>
        set((state) => ({
          transactions: state.initialLoadedTransactions,
        })),
    }),
    {
      name: 'finance-dashboard-store',
      version: STORE_VERSION,
      migrate: migrateStore,
      partialize: (state) => ({
        transactions: state.transactions,
        initialLoadedTransactions: state.initialLoadedTransactions,
        hasLoadedInitialMock: state.hasLoadedInitialMock,
        filters: state.filters,
        role: state.role,
        theme: state.theme,
        categories: state.categories,
      }),
    },
  ),
);

export { defaultFilters };