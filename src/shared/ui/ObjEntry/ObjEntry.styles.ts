import { createStyles } from '@/shared/lib/createStyles';

export const useStyles = () => {
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
      alignItems: 'stretch',
      paddingLeft: '8%',
      borderRadius: '10px',
      boxSizing: 'border-box',
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
