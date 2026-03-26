import { useThemeStore } from '@/shared/hooks/useThemeStore';
import { createStyles } from '@/shared/lib/createStyles';

export const useStyles = () => {
  const { colors } = useThemeStore();

  return createStyles({
    container: {
      width: '90%',
      height: '30%',

      display: 'flex',
      flexDirection: 'column',

      borderRadius: '20px',
      border: `2px ${colors.primary} solid`,
    },
    header: {
      width: '100%',
      borderBottom: `2px ${colors.primary} solid`,
      color: colors.primary,
    },
  });
};
