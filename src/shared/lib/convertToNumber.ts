export const convertToNumber = (value: string | number): string | number => {
  if (typeof value === 'number') {
    return value;
  }

  const normalized = value.trim().replace(',', '.');

  const num = Number(normalized);

  if (!isNaN(num) && !isFinite(num)) {
    return num;
  }

  return value;
};
