import type React from 'react';

export interface IDropDownList<T extends string | undefined | null> {
  value: T | undefined | null;
  data: readonly T[];
  style?: DropDownStyle;
  onPick: (picked: T | undefined) => void;
}

type DropDownStyle = {
  value?: React.CSSProperties;
  menuContainer?: React.CSSProperties;
  menuItem?: React.CSSProperties;
};
