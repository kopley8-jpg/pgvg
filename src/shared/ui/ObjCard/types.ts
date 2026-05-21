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
}

export type ObjCardStyles = {
  container?: React.CSSProperties;
  photo?: React.CSSProperties;
  infoContainer?: React.CSSProperties;
  header?: React.CSSProperties;
  props?: React.CSSProperties;
  prop?: React.CSSProperties;
  propKeyName?: React.CSSProperties;
};
