import { subscribeToDeviceById } from '@/shared/api/firebase/devices';
import type {
  BatteryType,
  CompactiblePlatType,
  DeviceKitType,
  DeviceType,
  PlatformType,
  SomethingElseInKitType,
} from '@/shared/types/device';
import { useEffect, useState } from 'react';
import type { IDeviceCard } from './types';
import { convertToNumber } from '@/shared/lib/convertToNumber';

export const useDeviceCard = (props: IDeviceCard) => {
  const {
    device: imDevice,
    onChange,
    onCompatiblePlatAdd,
    onPlatItemClick,
    onAddKitItemMenuClick,
    onKitItemClick,
    onError,
    onDeviceDelete,
    onPhotoAccept,
  } = props;

  const [device, setDevice] = useState<DeviceType | null>(null);
  const [loading, setLoading] = useState(typeof imDevice === 'string');
  const [photoLoader, setPhotoLoader] = useState<{
    open: boolean;
    anchorEl: HTMLElement | null;
  }>({ open: false, anchorEl: null });

  const id = typeof imDevice === 'string' ? imDevice : imDevice.id;

  useEffect(() => {
    if (typeof imDevice === 'object') {
      setDevice(imDevice);
      return;
    }

    const unsubscribe = subscribeToDeviceById(id, (device) => {
      setDevice(device);
      setLoading(false);
    });

    return unsubscribe;
  }, [imDevice]);

  const handleChange = <K extends keyof Omit<DeviceType, 'id'>>(
    key: K,
    value: Omit<DeviceType, 'id'>[K]
  ) => {
    onChange?.(key, value);
  };

  const handleTextFieldChange = (
    key: 'brand' | 'model' | 'minCoilResistance'
  ) => {
    return {
      onSaveButtonPress: (value: string | number) => {
        if (key === 'minCoilResistance') {
          const normalize = Number(convertToNumber(value));
          if (isNaN(normalize)) {
            onError?.('значение должно быть числом');
            return;
          } else {
            handleChange(key, normalize);
          }
        } else {
          handleChange(key, value.toString());
        }
      },
    };
  };

  const uiHandler = {
    brand: handleTextFieldChange('brand'),
    model: handleTextFieldChange('model'),
    minCoilResisnatce: handleTextFieldChange('minCoilResistance'),
    platform: {
      onChange: (newPlatform: PlatformType) => {
        onChange?.('platforms', newPlatform);
        console.log(newPlatform);
      },
      onCompatiblePlatAdd: (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
      ) => {
        onCompatiblePlatAdd?.(e);
      },
      onPlatItemClick: (plat: CompactiblePlatType) => {
        onPlatItemClick?.(plat);
      },
    },
    battery: {
      onChange: (battery: BatteryType) => {
        onChange?.('battery', battery);
      },
      onError: (error: string) => {
        onError?.(error);
      },
    },
    screen: {
      onPick: (picked: 'индикация' | 'полноценный' | 'нет' | undefined) => {
        if (!picked) return;
        onChange?.('screen', picked);
      },
    },
    featuresNModes: (key: 'features' | 'modes') => {
      return {
        onChangesSaved: (newVal: (string | number)[]) => {
          onChange?.(
            key,
            newVal.map((val) => val.toString())
          );
        },
      };
    },
    kitEntry: {
      onAddKitItemMenuClick: (
        e: React.MouseEvent<HTMLLIElement, MouseEvent>
      ) => {
        onAddKitItemMenuClick?.(e);
      },
      onKitItemClick: (
        item: Exclude<DeviceKitType, SomethingElseInKitType>
      ) => {
        onKitItemClick?.(item);
      },
      onChange: (newValue: DeviceKitType[]) => {
        onChange?.('kit', newValue);
      },
      onError: (error: string) => {
        onError?.(error);
      },
    },
    menuItem: (item: 'delete-device' | 'load-photo' | 'delete-photo') => {
      return {
        onClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
          switch (item) {
            case 'delete-device':
              onDeviceDelete?.();
              break;
            case 'load-photo':
              setPhotoLoader({ open: true, anchorEl: e.currentTarget });
              break;
            case 'delete-photo':
              onChange?.('photoURL', null);
              break;
          }
        },
      };
    },
    photoLoader: {
      onUrl: (url: string) => {
        onChange?.('photoURL', url);
      },
      onFile: (file: File) => {
        onPhotoAccept?.(file);
      },
      onClose: () => {
        setPhotoLoader({ open: false, anchorEl: null });
      },
    },
  };

  return {
    device,
    loading,
    handleChange,
    uiHandler,
    photoLoader,
  };
};
