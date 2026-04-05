import { useFinanceStore } from '../store/useFinanceStore';

export const useFilters = () => {
  const filters = useFinanceStore((state) => state.filters);
  const setFilters = useFinanceStore((state) => state.setFilters);
  const resetFilters = useFinanceStore((state) => state.resetFilters);

  return {
    filters,
    setFilters,
    resetFilters,
  };
};