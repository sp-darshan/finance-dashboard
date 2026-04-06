import { useFinanceStore } from '../store/useFinanceStore';

export const useTheme = () => {
  const theme = useFinanceStore((state) => state.theme);

  return {
    theme,
    isLight: theme === 'light',
  };
};