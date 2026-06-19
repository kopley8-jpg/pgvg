export const convertToNumber = (value: string | number): number => {
  if (typeof value === 'number') {
    return value;
  }

  const normalized = value.trim().replace(',', '.');

  return Number(normalized);
};
