import type { DeviceType } from '@/entities/devices/model/types';
import { translate } from '../constants/translatesKeys';
import { updateDeviceById } from '@/features/devices/updateDeviceEntryById/model/updateDeviceEntryById';

export const useErrorOptions = (
  deviceID: string
): Record<keyof DeviceType, any> => {
  return {
    id: {},
    photoURL: {},
    brand: {
      errorText: translate.minCoilResistance + '?',
      onErrorTextClick: () => updateDeviceById(deviceID, 'brand', 'бренд'),
    },
    model: {
      errorText: translate.minCoilResistance + '?',
      onErrorTextClick: () => updateDeviceById(deviceID, 'model', 'модель'),
    },
    minCoilResistance: {
      errorText: translate.minCoilResistance + '?',
      onErrorTextClick: () =>
        updateDeviceById(deviceID, 'minCoilResistance', 0),
    },
    adjustmentAirflow: {},
    modes: {
      errorText: translate.modes + '?',
      errorTextFontSize: '4vw',
      onErrorTextClick: () => updateDeviceById(deviceID, 'modes', ['пиши']),
    },
    features: {
      errorText: translate.features + '?',
      errorTextFontSize: '4vw',
      onErrorTextClick: () => updateDeviceById(deviceID, 'features', ['пиши']),
    },
    battery: {},
    platforms: {},
    kit: {},
    screen: {},
  };
};
