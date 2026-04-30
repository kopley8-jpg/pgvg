export interface IObjCard<T extends Record<string, any>> {
  photoURL?: string | null;
  data: T;
  translatedNamesForKeys?: Record<keyof T, string>;
  style?: ObjCardStyles;
  renderInHeader: () => React.ReactNode;
  renderForKeys: {
    options?: { hideKeyName?: boolean };
    key: keyof T;
    renderItem: (key: keyof T, value: T[keyof T]) => React.ReactNode;
  }[];
}

export type ObjCardStyles = {
  container?: React.CSSProperties;
  photo?: React.CSSProperties;
  infoContainer?: React.CSSProperties;
  header?: React.CSSProperties;
  content?: React.CSSProperties;
  propContainer?: React.CSSProperties;
  propKeyName?: React.CSSProperties;
};
