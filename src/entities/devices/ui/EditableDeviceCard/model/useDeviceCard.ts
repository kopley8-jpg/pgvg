import { subscribeToDeviceById } from '@/shared/api/firebase/devices';
import type { DeviceType } from '@/shared/types/device';
import { useEffect, useState } from 'react';
import type { DEVICE_MENU_ACTIONS, IDeviceCard, UiHandlerType } from './types';
import { convertToNumber } from '@/shared/lib/tryConvertToNumber';

export const useDeviceCard = (props: IDeviceCard) => {
  const {
    device: imDevice,
    onChange,
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

  const handleTextFieldChange = (
    key: 'brand' | 'model' | 'minCoilResistance'
  ) => {
    return {
      onSaveButtonPress: (value: string | number) => {
        if (key === 'minCoilResistance') {
          const num = convertToNumber(value);
          if (isNaN(num)) {
            return onError?.('значение должно быть числом');
          }
          onChange?.(key, num);
        } else {
          onChange?.(key, value.toString());
        }
      },
    };
  };

  const handleMenuItemClick = (item: (typeof DEVICE_MENU_ACTIONS)[number]) => {
    return {
      onClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        switch (item) {
          case 'load-photo':
            setPhotoLoader({ open: true, anchorEl: e.currentTarget });
            break;
          case 'delete-photo':
            onChange?.('photoURL', null);
            break;
          case 'delete-device':
            onDeviceDelete?.();
            break;
        }
      },
    };
  };

  const uiHandler: UiHandlerType = {
    menuItem: (item) => handleMenuItemClick(item),
    textField: (key) => handleTextFieldChange(key),
    arrayPrimitive: (key) => ({
      onChangesSaved: (value) =>
        onChange?.(
          key,
          value.map((val) => val.toString())
        ),
    }),
    dropDown: (_key) => ({
      onPick(picked) {
        onChange?.('screen', picked);
      },
    }),
    platformEntry: {
      ...props,
      onChange: (platform) => onChange?.('platforms', platform),
    },
    batteryEntry: {
      onChange: (battery) => onChange?.('battery', battery),
      onError,
    },
    kitEntry: {
      ...props,
      onChange: (newValue) => onChange?.('kit', newValue),
    },
    photoLoader: {
      onFile: onPhotoAccept,
      onURL(url) {
        onChange?.('photoURL', url);
      },
      onClose: () => {
        setPhotoLoader({ open: false, anchorEl: null });
      },
    },
  };

  return {
    device,
    loading,
    uiHandler,
    photoLoader,
  };
};
