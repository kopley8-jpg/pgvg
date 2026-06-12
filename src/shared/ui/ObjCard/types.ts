import type { IconButtonProps, MenuItemProps, SxProps, Theme } from '@mui/material';

export interface IObjCard<T extends Record<string, any>> {
  photoURL?: string | null;
  data: T;
  translatedNamesForKeys?: Record<keyof T, string>;
  styles?: ObjCardStyles;
  renderInHeader: () => React.ReactNode;
  renderForKeys: {
    options?: { hideKeyName?: boolean; style?: React.CSSProperties };
    key: keyof T;
    renderItem: (key: keyof T, value: T[keyof T]) => React.ReactNode;
  }[];
  menu?: {
    trigger?: IconButtonProps;
    menuItems: MenuItemAtObjCard[];
  };
}

type MenuItemAtObjCard = {
  label: string;
  renderBeforeLabel?: React.ReactNode;
} & MenuItemProps;

export type ObjCardStyles = {
  container?: SxProps<Theme>;
  photo?: React.CSSProperties;
  infoContainer?: SxProps<Theme>;
  header?: SxProps<Theme>;
  props?: SxProps<Theme>;
  prop?: SxProps<Theme>;
  propKeyName?: SxProps<Theme>;
  propContentContainer?:SxProps<Theme>
};
