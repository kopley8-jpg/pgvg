import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { colors } from '@shared/constants/colors';

interface IUseTheme {
  isDark: boolean;
  colors: typeof colors.light;
  toggleTheme: () => void;
}

export const useThemeStore = create<IUseTheme>()(
  persist(
    (set, get) => ({
      isDark: false,
      colors: colors.light,

      toggleTheme() {
        const newIsDark = !get().isDark;
        set({
          isDark: newIsDark,
          colors: newIsDark ? colors.dark : colors.light,
        });
      },
    }),
    {
      name: 'theme-storage',
    }
  )
);
