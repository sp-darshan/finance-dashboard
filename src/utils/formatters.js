import { CATEGORIES } from '../constants/categories';
import { FaWallet } from 'react-icons/fa';

export const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(Number.isFinite(amount) ? amount : 0);

export const formatDate = (dateString) => {
  const date = new Date(dateString);

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const formatCompactNumber = (value) =>
  new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(Number.isFinite(value) ? value : 0);

export const getCategoryMeta = (category) =>
  CATEGORIES.find((item) => item.name === category) ?? CATEGORIES[0];

export const getCategoryIcon = (category) => getCategoryMeta(category).icon;

export const getCategoryColor = (category) => getCategoryMeta(category).color;

export const getFallbackIcon = () => FaWallet;
