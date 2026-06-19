import type { colors } from '@/shared/constants/colors';
import type {
  CompactiblePlatType,
  DeviceKitType,
  DeviceType,
  SCREEN_TYPES,
  SomethingElseInKitType,
} from '@/shared/types/device';
import type { IPlatformEntry } from '../ui/PlatformEntry/PlatformEntry';
import type { IBatteryEntry } from '../ui/BatteryEntry/BatteryEntry';
import type { IKitEntry } from '../ui/KitEntry/KitEntry';
import type { PhotoLoaderProps } from '@/shared/ui/photoLoader/PhotoLoader';

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
    item: Exclude<DeviceKitType, SomethingElseInKitType>,
    id: number
  ) => void;
  onAddKitItemMenuClick?: (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => void;
  onError?: (error: string) => void;
  onDeviceDelete?: () => void;
  onPhotoAccept?: (file: File) => void;
}

export type UiHandlerType = {
  menuItem: (item: (typeof DEVICE_MENU_ACTIONS)[number]) => {
    onClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
  };
  textField: (key: 'brand' | 'model' | 'minCoilResistance') => {
    onSaveButtonPress: (value: string | number) => void;
  };
  arrayPrimitive: (key: 'features' | 'modes') => {
    onChangesSaved: (value: (string | number)[]) => void;
  };
  dropDown: (key: 'screen') => {
    onPick: (picked: (typeof SCREEN_TYPES)[number]) => void;
  };
  platformEntry: Partial<IPlatformEntry>;
  batteryEntry: Partial<IBatteryEntry>;
  kitEntry: Partial<IKitEntry>;
  photoLoader: Partial<PhotoLoaderProps>;
};

export const DEVICE_MENU_ACTIONS = [
  'load-photo',
  'delete-photo',
  'delete-device',
] as const;
