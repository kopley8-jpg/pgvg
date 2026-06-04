import type React from 'react';

export interface IDropDownList<T extends string | number | undefined | null> {
  value: T;
  data: T[];
  style?: DropDownStyle;
  onPick: (picked: T) => void;
}

type DropDownStyle = {
  value?: React.CSSProperties;
  menuContainer?: React.CSSProperties;
  menuItem?: React.CSSProperties;
};
