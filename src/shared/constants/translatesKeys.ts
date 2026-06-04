import type { DeviceType } from '../types/device';

export const translate: Record<keyof DeviceType, string> = {
  id: 'id', // +
  photoURL: 'photoURL', // +
  brand: 'Бренд', // +
  model: 'Модель', // +
  modes: 'Режимы', // +
  features: 'Фичи', // +
  battery: 'Батарея', // +
  platforms: 'Платформа',
  kit: 'Комплект',
  minCoilResistance: 'Мин. сопрот', // +
  screen: 'Экран', // +
};
