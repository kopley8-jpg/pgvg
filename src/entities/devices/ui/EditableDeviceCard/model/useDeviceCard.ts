import { subscribeToDeviceById } from '@/shared/api/firebase/devices';
import type { DeviceType } from '@/shared/types/device';
import { useEffect, useState } from 'react';
import type { IDeviceCard } from './types';
import { Key } from '@mui/icons-material';
import { convertToNumber } from '@/shared/lib/convertToNumber';

export const useDeviceCard = (props: IDeviceCard) => {
  const { device: imDevice, onChange, onError } = props;

  const [device, setDevice] = useState<DeviceType | null>(null);
  const [loading, setLoading] = useState(typeof imDevice === 'string');

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
  });

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
  };

  return {
    device,
    loading,
    handleChange,
    uiHandler,
  };
};
