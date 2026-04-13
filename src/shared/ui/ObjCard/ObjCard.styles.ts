import { useThemeStore } from '@/shared/hooks/useThemeStore';
import { createStyles } from '@/shared/lib/createStyles';

export const useStyles = () => {
  const { colors } = useThemeStore();

  return createStyles({
    container: {
      width: '95vw',
      display: 'flex',
      flexDirection: 'row',
      boxSizing: 'content-box',
      borderRadius: '20px',
      border: `2px ${colors.primary} solid`,
    },
    photo: {
      width: '30%',
      objectFit: 'contain',
      borderTopLeftRadius: '20px',
      borderBottomLeftRadius: '20px',
      borderRight: `2px ${colors.primary} solid`,
    },
    infoContainer: {
      height: '100%',
      width: '100%',
      boxSizing: 'content-box',
      display: 'flex',
      flexDirection: 'column',
    },
    header: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      boxSizing: 'border-box',
      paddingLeft: '0.5vh',
      paddingRight: '0.5vh',

      color: colors.primary,
      fontSize: '5vw',
      borderBottom: `2px ${colors.primary} solid`,
    },
    content: {
      boxSizing: 'border-box',
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      paddingTop: '1vh',
      paddingLeft: '1vh',
      paddingRight: '1vh',
      overflowY: 'auto',
      gap: '3%',
    },
    propContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      fontSize: '5vw',
    },
    propKeyName: {
      width: '40%',
      flexShrink: 0, // Запрещаем сжатие
      whiteSpace: 'normal', // Разрешаем перенос текста
      wordBreak: 'break-word', // Перенос длинных слов
      overflowWrap: 'break-word',
    },
  });
};
