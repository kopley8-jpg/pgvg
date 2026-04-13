import { useThemeStore } from '@/shared/hooks/useThemeStore';
import { createStyles } from '@/shared/lib/createStyles';

export const useStyles = () => {
  const { colors } = useThemeStore();

  return createStyles({
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: '1.2%',
      gap: '3%',
    },

    TextField: {
      '& .MuiInputBase-root': {
        height: 'auto', // авто-высота
      },
      '& .MuiInputBase-input': {
        height: 'auto !important', // принудительно авто
        padding: '2px 6px',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: colors.second, // обычное состояние
          borderWidth: '2px',
        },
        '&:hover fieldset': {
          borderColor: colors.second, // при наведении
        },
        '&.Mui-focused fieldset': {
          borderColor: colors.primary, // при фокусе
          borderWidth: '2px',
        },
      },
      '& .MuiInputLabel-root': {
        color: colors.second, // цвет лейбла
      },
      '& .MuiInputLabel-root.Mui-focused': {
        color: colors.primary, // цвет лейбла при фокусе
      },
    },
    button: {
      color: colors.second,
    },
  });
};
