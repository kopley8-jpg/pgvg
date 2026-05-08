import { createStyles } from '@/shared/lib/createStyles';

export const useStyles = () => {
  return createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      minWidth: '15vw',
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
    },
  });
};
