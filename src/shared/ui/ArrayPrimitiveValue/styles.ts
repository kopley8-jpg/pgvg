import { createStyles } from '@/shared/lib/createStyles';

export const useStyles = () => {
  return createStyles({
    container: {
      backgroundColor: 'grey',
      padding: '1.5%',
      borderRadius: '20px',
      cursor: 'pointer', // добавим, раз это кликабельно
      display: 'flex',
      alignItems: 'center',
    },
    text: {
      fontSize: '3vw',
      textAlign: 'center',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      color: 'black',
      maxWidth: '90%',
    },
  });
};
