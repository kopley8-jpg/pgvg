import type { colors } from '@/shared/constants/colors';
import type { DeviceType } from '@/shared/types/device';

export interface IDeviceCard {
  device: string | DeviceType;
  colors: typeof colors.light;
  onChange?: <K extends keyof Omit<DeviceType, 'id'>>(
    key: K,
    value: Omit<DeviceType, 'id'>[K]
  ) => void;
  onError?: (error: string) => void;
}
