import { useThemeStore } from '@/shared/hooks/useThemeStore';
import { createStyles } from '@/shared/lib/createStyles';

export const useStyles = () => {
  const { colors } = useThemeStore();

  return createStyles({
    container: {
      width: '90%',
      aspectRatio: 3 / 2,

      display: 'flex',
      flexDirection: 'column',

      borderRadius: '20px',
      border: `2px ${colors.primary} solid`,
    },
    header: {
      width: '100%',

      display: 'flex',
      alignItems: 'center',

      paddingLeft: '2%',
      paddingRight: '2%',

      boxSizing: 'border-box',

      color: colors.primary,
      fontSize: '3vw',
      borderBottom: `2px ${colors.primary} solid`,
    },
    content: {
      width: '100%',
      height: '100%',

      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box',
    },
  });
};
