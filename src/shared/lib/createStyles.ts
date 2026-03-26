import { useThemeStore } from '../hooks/useThemeStore';

export const createStyles = <T extends Record<string, React.CSSProperties>>(
  styles: T
): T => styles;
