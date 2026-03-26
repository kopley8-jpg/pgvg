import { useThemeStore } from '@shared/hooks/useThemeStore';
import { createStyles } from '@shared/lib/createStyles';

export const useStyles = () => {
  const { colors } = useThemeStore();

  return createStyles({
    container: {
      width: '100vw',
      height: '100vh',
      backgroundColor: colors.background,
    },
  });
};
