import { useThemeStore } from '@/shared/hooks/useThemeStore';
import { createStyles } from '@/shared/lib/createStyles';

export const useStyles = () => {
  const { colors } = useThemeStore();

  return createStyles({
    container: {
      backgroundColor: colors.second,
      padding: '1.5%',
      borderRadius: '20px',
      cursor: 'pointer', // добавим, раз это кликабельно
      display: 'flex',
      alignItems: 'center',
    },
    text: {
      fontSize: '4vw',
      textAlign: 'center',
      color: colors.background,
      width: 'fit-content',
      wordBreak: 'break-word',
      maxWidth: '100%',
    },
  });
};
