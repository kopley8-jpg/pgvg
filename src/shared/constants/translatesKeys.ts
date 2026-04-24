import type { DeviceType } from '@/entities/devices/model/types';

export const translate: Record<keyof DeviceType, string> = {
  id: 'id', // +
  photoURL: 'photoURL', // +
  brand: 'Бренд', // +
  model: 'Модель', // +
  adjustmentAirflow: 'Регулировка обдува', // +
  modes: 'Режимы', // +
  features: 'Фичи', // +
  battery: 'Батарея', // +
  platforms: 'Платформа',
  kit: 'Комплект',
  minCoilResistance: 'Мин. сопрот', // +
  screen: 'Экран', // +
};
