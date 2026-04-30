import { ObjCard } from '@/shared/ui/ObjCard/ObjCard';
import type { IDeviceCard } from './model/types';
import { TextValue } from '@/shared/ui/PrimitiveValue/TextValue/TextValue';
import type { DeviceType } from '@/entities/devices/model/types';
import { ArrayPrimitiveValue } from '@/shared/ui/ArrayPrimitiveValue/ArrayPrimitiveValue';
import { Switch } from '@mui/material';
import { createRenderConfig } from '@/shared/lib/createRenderConfig';
import { BatteryEntry } from './ui/BatteryEntry/BatteryEntry';
import { updateDeviceById } from '@/features/devices/updateDeviceEntryById/model/updateDeviceEntryById';
import { PlatformEntry } from './ui/PlatformEntry/PlatformEntry';
import { useErrorOptions } from '@/shared/hooks/useErrorOptions';
import { translate } from '@/shared/constants/translatesKeys';

export const DeviceCard = ({ device }: IDeviceCard) => {
  const deviceConfig = createRenderConfig<DeviceType>(device);

  return (
    <ObjCard
      photoURL={device.photoURL}
      renderInHeader={() => (
        <>
          <TextValue value={device.brand} onSaveButtonPress={() => {}} />
          <TextValue value={device.model} onSaveButtonPress={() => {}} />
        </>
      )}
      data={device}
      translatedNamesForKeys={translate}
      renderForKeys={[
        ...deviceConfig.forKeys(
          ['minCoilResistance', 'screen'],
          (key, value) => (
            <TextValue
              value={value}
              onSaveButtonPress={(newVal) =>
                updateDeviceById(device.id, key, newVal)
              }
              errorOptions={useErrorOptions(device.id)[key]}
            />
          )
        ),
        ...deviceConfig.forKeys(['features', 'modes'], (key, value) => (
          <ArrayPrimitiveValue
            value={value}
            onChangesSaved={(newVal) =>
              updateDeviceById(device.id, key, newVal)
            }
            errorOptions={useErrorOptions(device.id)[key]}
          />
        )),
        ...deviceConfig.forKeys(['adjustmentAirflow'], (key, value) => (
          <Switch
            checked={value ? value : undefined}
            onClick={() => updateDeviceById(device.id, key, !value)}
          />
        )),
        ...deviceConfig.forKeys(
          ['battery'],
          (key, value) => (
            <BatteryEntry
              battery={value}
              onChange={(newVal) => updateDeviceById(device.id, key, newVal)}
            />
          ),
          { hideKeyName: true }
        ),
        ...deviceConfig.forKeys(
          ['platforms'],
          (key, value) => (
            <PlatformEntry
              platform={value ? value : { type: null }}
              onChange={(newValue) =>
                updateDeviceById(device.id, key, newValue)
              }
            />
          ),
          { hideKeyName: true }
        ),
      ]}
    />
  );
};
