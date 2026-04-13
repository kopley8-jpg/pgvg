export interface IObjCard<T extends Record<string, any>> {
  photoURL?: string | null;
  data: T;
  translatedNamesForKeys?: Record<keyof T, string>;
  renderInHeader: () => React.ReactNode;
  renderForKeys: {
    options?: { hideKeyName?: boolean };
    key: keyof T;
    renderItem: (key: keyof T, value: T[keyof T]) => React.ReactNode;
  }[];
}
