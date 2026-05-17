import type { DeviceType } from '@/shared/types/device';

export interface IDevicesStore {
  //данные
  devices: DeviceType[];

  //ui состояние
  loading: boolean;
  error: string | null;

  // для управления подпиской
  unsubscribe: (() => void) | null;

  //действия
  subscribeToDevices: () => void;
  unsubscribeFromDevices: () => void;
  clearError: () => void;
}
