import database from '@/shared/api/firebase/client';
import type { DeviceType } from '@/shared/types/device';
import { push, ref } from 'firebase/database';

export const pushDevice = async (device?: Omit<DeviceType, 'id'>) => {
  const devicesRef = ref(database, 'kochegar/devices');
  await push(devicesRef, device ? device : NEW_DEVICE);
};

const NEW_DEVICE: Omit<DeviceType, 'id'> = {
  photoURL: null,
  brand: 'бренд?',
  model: 'модель?',
  modes: ['режимы?'],
  features: ['фичи?'],
  screen: 'нет',
  battery: { type: 'встроенный', capacity: 0 },
  minCoilResistance: 1,
  platforms: {
    type: 'магнит',
    adjustmentAirflow: false,
    compatiblePlats: [],
  },
  kit: [],
};
