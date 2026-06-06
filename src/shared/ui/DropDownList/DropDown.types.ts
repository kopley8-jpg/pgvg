import type React from 'react';

export interface IDropDownList<T extends string | number> {
  value: T | null;
  data: T[] | readonly T[];
  style?: DropDownStyle;
  onPick: (picked: T) => void;
}

type DropDownStyle = {
  value?: React.CSSProperties;
  menuContainer?: React.CSSProperties;
  menuItem?: React.CSSProperties;
};
