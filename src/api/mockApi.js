import { seedTransactions } from '../data/transactions';

const API_DELAY_MS = 420;

export const fetchMockTransactions = () =>
  new Promise((resolve) => {
    window.setTimeout(() => {
      const transactions = seedTransactions.map((transaction) => ({ ...transaction }));
      resolve(transactions);
    }, API_DELAY_MS);
  });
