export function createRenderConfig<T extends Record<string, any>>(data: T) {
  return {
    forKeys: <K extends keyof T>(
      keys: K[],
      renderItem: (key: K, value: T[K]) => React.ReactNode,
      options?: { hideKeyName?: boolean }
    ) => {
      return keys.map((key) => ({
        options: options,
        key: key,
        renderItem: () => renderItem(key, data[key]),
      }));
    },
  };
}
