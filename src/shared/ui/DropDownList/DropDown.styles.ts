import { useThemeStore } from '@/shared/hooks/useThemeStore';
import { createStyles } from '@/shared/lib/createStyles';

export const useStyles = () => {
  const { colors } = useThemeStore();

  return createStyles({
    container: {
      position: 'absolute',
      left: 0,
      zIndex: 1000,
      backgroundColor: colors.second,
      color: colors.background,
      display: 'flex',
      flexDirection: 'column',
      padding: '5px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    },
  });
};
