import type {
  IconButtonProps,
  MenuItemProps,
  SxProps,
  Theme,
} from '@mui/material';
import type React from 'react';

export interface IObjCard {
  photoURL?: string | null;
  translatedNamesForKeys?: Record<string | number | symbol, string>;
  styles?: ObjCardStyles;
  renderInHeader: React.ReactNode;
  renderForKeys: (RenderPropType | React.ReactNode)[];
  menu?: ObjCardMenuType;
}

export type RenderPropType = {
  options?: { style?: SxProps<Theme> };
  key: string | number | symbol;
  renderItem: React.ReactNode;
};

export type ObjCardMenuType = {
  trigger?: IconButtonProps;
  menuItems: MenuItemAtObjCard[];
};

export type MenuItemAtObjCard = {
  label: string;
  renderBeforeLabel?: React.ReactNode;
} & MenuItemProps;

export type ObjCardStyles = {
  container?: SxProps<Theme>;
  photo?: React.CSSProperties;
  infoContainer?: SxProps<Theme>;
  header?: SxProps<Theme>;
  headerLeftContainer?: SxProps<Theme>;
  props?: SxProps<Theme>;
  prop?: SxProps<Theme>;
  propKeyName?: SxProps<Theme>;
  propContentContainer?: SxProps<Theme>;
};

export function isRenderPropType(item: any): item is RenderPropType {
  return item && typeof item === 'object' && 'renderItem' in item;
}
