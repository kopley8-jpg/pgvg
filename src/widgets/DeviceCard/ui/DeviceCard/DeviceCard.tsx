import { ObjCard } from '@/shared/ui/ObjCard/ObjCard';
import type { IDeviceCard } from './model/types';
import { TextValue } from '@/shared/ui/PrimitiveValue/TextValue/TextValue';
import { TextEditor } from '@/shared/ui/TextEditor/TextEditor';
import type { DeviceType } from '@/entities/devices/model/types';
import { ArrayPrimitiveValue } from '@/shared/ui/ArrayPrimitiveValue/ArrayPrimitiveValue';
import { Switch } from '@mui/material';

export const DeviceCard = ({ device }: IDeviceCard) => {
  const deviceConfig = createRenderConfig<DeviceType>(device);
  const huy = deviceConfig.forKeys(['minCoilResistance'], (key, value) => (
    <></>
  ));
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
          (key, value) => <TextValue value={value} />
        ),
        ...deviceConfig.forKeys(['features', 'modes'], (key, value) => (
          <ArrayPrimitiveValue value={value} onChangesSaved={() => {}} />
        )),
        ...deviceConfig.forKeys(['adjustmentAirflow'], (key, value) => (
          <Switch value={value} onClick={() => {}} />
        )),
      ]}
    />
  );
};

const translate: Record<keyof DeviceType, string> = {
  id: 'id', // +
  photoURL: 'photoURL', // +
  brand: 'Бренд', // +
  model: 'Модель', // +
  adjustmentAirflow: 'Регулировка обдува', // +
  modes: 'Режимы', // +
  features: 'Фичи', // +
  battery: 'Батарея',
  platforms: 'Платформа',
  kit: 'Комплект',
  minCoilResistance: 'Мин. сопрот', // +
  screen: 'Экран', // +
};

export function createRenderConfig<T extends Record<string, any>>(data: T) {
  return {
    forKeys: <K extends keyof T>(
      keys: K[],
      renderItem: (key: K, value: T[K]) => React.ReactNode,
      options?: { hideKeyName?: boolean }
    ) => {
      return keys.map((key) => ({
        options: options,
        key: key,
        renderItem: () => renderItem(key, data[key]),
      }));
    },
  };
}

const render = <T extends Record<string, any>>() => {};
