import type { colors as cols } from '@/shared/constants/colors';
import { createStyles } from '@shared/lib/createStyles';

export const useStyles = (colors: typeof cols.light) => {
  return createStyles({
    container: {
      width: '100%',
      height: '100%',

      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '3vh',
      paddingTop: '3vh',
      overflowY: 'auto',

      backgroundColor: colors.background,
      color: colors.primary,
    },
  });
};
