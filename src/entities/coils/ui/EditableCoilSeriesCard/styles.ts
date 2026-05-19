import { useThemeStore } from '@/shared/hooks/useThemeStore';
import type { ObjCardStyles } from '@/shared/ui/ObjCard/types';

export const useStyles = (): ObjCardStyles => {
  const { colors } = useThemeStore();
  return {
    container: {
      height: '25vh',
      width: '60vw',
      backgroundColor: colors.background,
    },
    header: {
      display: 'flex',
      flexDirection: 'row',
      paddingLeft: '4%',
      justifyContent: 'space-between',
      fontSize: '4vw',
    },
    content: {
      fontSize: '4vw',
    },
  };
};
