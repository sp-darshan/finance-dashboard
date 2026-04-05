import { CATEGORIES } from '../constants/categories';

const monthKey = (dateString) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
};

const monthLabel = (date) =>
  date.toLocaleDateString('en-US', {
    month: 'short',
    year: '2-digit',
  });

const buildMonthlySummaries = (transactions, months) => {
  const today = new Date();

  return Array.from({ length: months }, (_, index) => {
    const offset = months - 1 - index;
    const date = new Date(today.getFullYear(), today.getMonth() - offset, 1);
    const key = monthKey(date.toISOString());
    const monthTransactions = transactions.filter((transaction) => monthKey(transaction.date) === key);
    const summary = getSummary(monthTransactions);

    return {
      key,
      label: monthLabel(date),
      income: summary.income,
      expenses: summary.expenses,
    };
  });
};

export const applyTransactionFilters = (transactions, filters) => {
  return transactions.filter((transaction) => {
    const typeMatch = filters.type === 'all' || transaction.type === filters.type;
    const categoryMatch = filters.category === 'all' || transaction.category === filters.category;
    const searchMatch = transaction.description.toLowerCase().includes(filters.search.toLowerCase());
    const startMatch = !filters.startDate || new Date(transaction.date) >= new Date(filters.startDate);
    const endMatch = !filters.endDate || new Date(transaction.date) <= new Date(filters.endDate);

    return typeMatch && categoryMatch && searchMatch && startMatch && endMatch;
  });
};

export const getSummary = (transactions) => {
  const income = transactions.reduce((sum, transaction) => sum + (transaction.type === 'income' ? transaction.amount : 0), 0);
  const expenses = transactions.reduce((sum, transaction) => sum + (transaction.type === 'expense' ? transaction.amount : 0), 0);
  const balance = income - expenses;
  const savingsRate = income > 0 ? (balance / income) * 100 : 0;

  return { income, expenses, balance, savingsRate };
};

export const getMonthlyBalances = (transactions, months = 6) => {
  let runningBalance = 0;

  return buildMonthlySummaries(transactions, months).map((month) => {
    const net = month.income - month.expenses;
    runningBalance += net;

    return {
      ...month,
      balance: runningBalance,
    };
  });
};

export const getMonthlyComparison = (transactions, months = 6) => {
  return buildMonthlySummaries(transactions, months);
};

export const getMonthlyExpenseTrend = (transactions, months = 6) => {
  return getMonthlyComparison(transactions, months).map((month) => ({
    key: month.key,
    label: month.label,
    expenses: month.expenses,
  }));
};

export const getCategoryTotals = (transactions, categories = CATEGORIES.map((category) => category.name)) => {
  const totals = categories.reduce((accumulator, category) => {
    accumulator[category] = 0;
    return accumulator;
  }, {});

  const knownCategories = new Set(categories);

  transactions.forEach((transaction) => {
    if (transaction.type === 'expense') {
      if (!knownCategories.has(transaction.category)) {
        totals[transaction.category] = totals[transaction.category] ?? 0;
        knownCategories.add(transaction.category);
      }

      totals[transaction.category] = (totals[transaction.category] ?? 0) + transaction.amount;
    }
  });

  return Object.entries(totals)
    .map(([category, amount]) => ({ category, amount }))
    .filter((item) => item.amount > 0)
    .sort((left, right) => right.amount - left.amount);
};

export const getInsights = (transactions, categories) => {
  const summary = getSummary(transactions);
  const monthlyBalances = getMonthlyBalances(transactions, 2);
  const categoryTotals = getCategoryTotals(transactions, categories);
  const topCategory = categoryTotals[0] ?? null;
  const averageTransaction = transactions.length ? (summary.income + summary.expenses) / transactions.length : 0;
  const largestTransaction = transactions.reduce((largest, transaction) => {
    if (!largest || transaction.amount > largest.amount) {
      return transaction;
    }

    return largest;
  }, null);

  const currentMonth = monthlyBalances[monthlyBalances.length - 1] ?? null;
  const previousMonth = monthlyBalances[monthlyBalances.length - 2] ?? null;
  const monthlyDelta = currentMonth && previousMonth ? currentMonth.balance - previousMonth.balance : 0;

  return {
    summary,
    monthlyBalances,
    categoryTotals,
    topCategory,
    averageTransaction,
    largestTransaction,
    monthlyDelta,
    currentMonth,
    previousMonth,
  };
};