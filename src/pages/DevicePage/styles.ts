import { useThemeStore } from '@shared/hooks/useThemeStore';
import { createStyles } from '@shared/lib/createStyles';

export const useStyles = () => {
  const { colors } = useThemeStore();

  return createStyles({
    container: {
      width: '100vw',
      height: '100vh',

      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',

      backgroundColor: colors.background,
      color: colors.primary,
    },
  });
};
