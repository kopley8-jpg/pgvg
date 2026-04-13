import { useThemeStore } from '@/shared/hooks/useThemeStore';
import { createStyles } from '@/shared/lib/createStyles';

export const useStyles = () => {
  const { colors } = useThemeStore();

  return createStyles({
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: '1.2%',
      gap: '3%',
    },
    text: {},
  });
};
