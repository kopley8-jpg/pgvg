import type { colors } from '@/shared/constants/colors';
import type {
  CompactiblePlatType,
  DeviceKitType,
  DeviceType,
  SomethingElseInKitType,
} from '@/shared/types/device';

export interface IDeviceCard {
  device: string | DeviceType;
  colors: typeof colors.light;
  onChange?: <K extends keyof Omit<DeviceType, 'id'>>(
    key: K,
    value: Omit<DeviceType, 'id'>[K]
  ) => void;
  onPlatItemClick?: (plat: CompactiblePlatType) => void;
  onCompatiblePlatAdd?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onKitItemClick?: (
    item: Exclude<DeviceKitType, SomethingElseInKitType>
  ) => void;
  onAddKitItemMenuClick?: (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => void;
  onError?: (error: string) => void;
}
