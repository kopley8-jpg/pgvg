import { createStyles } from '@/shared/lib/createStyles';

export const useStyles = () => {
  return createStyles({
    container: {
      position: 'absolute', // 👈 не влияет на родителя
      left: 0,
      zIndex: 1000,
      backgroundColor: 'white',
      borderRadius: '8px',
      minWidth: '200px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    },
    header: {
      display: 'flex',
      flexDirection: 'row',
    },
    item: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
  });
};
