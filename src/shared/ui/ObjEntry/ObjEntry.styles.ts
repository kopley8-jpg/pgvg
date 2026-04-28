import { useThemeStore } from '@/shared/hooks/useThemeStore';
import { createStyles } from '@/shared/lib/createStyles';

export const useStyles = () => {
  const { colors } = useThemeStore();

  return createStyles({
    container: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      fontSize: '3vw',
    },
    entryName: {
      fontSize: '5vw',
      boxSizing: 'border-box',
    },
    propsContainer: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      paddingLeft: '8%',
      borderRadius: '10px',
      boxSizing: 'border-box',
      borderLeft: `3px ${colors.primary} solid`,
    },
    propContainer: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: '2%',
    },
  });
};
