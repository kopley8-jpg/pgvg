import { createStyles } from '@/shared/lib/createStyles';

export const useStyles = () => {
  return createStyles({
    container: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      fontSize: '3vw',
    },
    entryName: {
      displat: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      fontSize: '5vw',
      boxSizing: 'border-box',
      padding: '0',
      minHeight: 'auto',
    },
    propsContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      paddingLeft: '4%',
      borderRadius: '10px',
      boxSizing: 'border-box',
      paddingTop: '6px',
      paddingBottom: '6px',
      gap: '6px',
    },
    propContainer: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      border: '2px grey solid',
      borderRadius: '20px',
    },
    propKeyNameContainer: {
      backgroundColor: 'grey',
      width: '50%',
      borderRadius: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    },
    propContentContainer: {
      minWidth: '50%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
  });
};
