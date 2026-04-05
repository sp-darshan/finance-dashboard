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
  FaUtensils,
  FaWallet,
} from 'react-icons/fa';

export const CATEGORIES = [
  { name: 'Salary', icon: FaWallet, color: '#22c55e' },
  { name: 'Freelance', icon: FaBriefcase, color: '#14b8a6' },
  { name: 'Food', icon: FaUtensils, color: '#f97316' },
  { name: 'Transport', icon: FaCar, color: '#38bdf8' },
  { name: 'Shopping', icon: FaShoppingBag, color: '#ec4899' },
  { name: 'Bills', icon: FaFileInvoiceDollar, color: '#f59e0b' },
  { name: 'Health', icon: FaHeartbeat, color: '#ef4444' },
  { name: 'Travel', icon: FaPlane, color: '#8b5cf6' },
  { name: 'Entertainment', icon: FaFilm, color: '#06b6d4' },
  { name: 'Education', icon: FaGraduationCap, color: '#6366f1' },
  { name: 'Cash', icon: FaMoneyBillWave, color: '#a855f7' },
];

export const TRANSACTION_TYPES = ['income', 'expense'];