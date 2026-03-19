import type { SxProps, Theme } from '@mui/material';

export const toArray = <T>(obj?: Record<string, T>) => {
  if (!obj) return [];
  return Object.entries(obj).map(([id, item]) => ({
    id,
    ...item, // ← все поля объекта
  }));
};

export const isArrayObj = (arr: any[]) => {
  return arr.every((item) => item !== null && typeof item === 'object');
};

export const createStyles = <
  T extends Record<string, SxProps<Theme> | ((...args: any) => SxProps<Theme>)>,
>(
  styles: T
): T => styles;

export const createStyless = <
  T extends Record<
    string,
    React.CSSProperties | ((...args: any) => React.CSSProperties)
  >,
>(
  styles: T
): T => styles;
