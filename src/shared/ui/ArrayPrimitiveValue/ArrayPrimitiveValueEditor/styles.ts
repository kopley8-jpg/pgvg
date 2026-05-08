import { useThemeStore } from '@/shared/hooks/useThemeStore';
import { createStyles } from '@/shared/lib/createStyles';

export const useStyles = () => {
  const { colors } = useThemeStore();
  return createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      minWidth: '15vw',
      maxWidth: '20vw',
    },
    header: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    item: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '5px',
    },
    button: {
      color: colors.primary,
    },
  });
};
