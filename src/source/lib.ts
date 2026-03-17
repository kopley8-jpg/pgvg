export const toArray = <T>(obj?: Record<string, T>) => {
  if (!obj) return [];
  return Object.entries(obj).map(([id, item]) => ({
    id, // ← добавляем id из ключа
    ...item, // ← все поля объекта
  }));
};
