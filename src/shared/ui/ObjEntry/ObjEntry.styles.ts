import { useThemeStore } from '@/shared/hooks/useThemeStore';
import { createStyles } from '@/shared/lib/createStyles';

export const useStyles = () => {
  const { colors } = useThemeStore();

  return createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      fontSize: '3vw',
    },
    entryName: {
      fontSize: '5vw',
      boxSizing: 'border-box',
    },
    propsContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      paddingLeft: '8%',
      borderRadius: '10px',
      boxSizing: 'border-box',
      borderLeft: `3px ${colors.primary} solid`,
    },
    propContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: '2%',
    },
  });
};
