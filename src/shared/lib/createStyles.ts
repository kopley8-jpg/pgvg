import { useThemeStore } from '../hooks/useThemeStore';

interface nestedCSSProp {
  [key: string]: React.CSSProperties | nestedCSSProp;
}

export const createStyles = <
  T extends Record<string, React.CSSProperties | nestedCSSProp>,
>(
  styles: T
): T => styles;
