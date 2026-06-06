import { ObjCard } from '@/shared/ui/ObjCard/ObjCard';
import type { IDeviceCard } from './model/types';
import { useDeviceCard } from './model/useDeviceCard';
import { SCREEN_TYPES, type DeviceType } from '@/shared/types/device';
import { TextValue } from '@/shared/ui/PrimitiveValue/TextValue/TextValue';
import { createRenderConfig } from '@/shared/lib/createRenderConfig';
import { ArrayPrimitiveValue } from '@/shared/ui/ArrayPrimitiveValue/ArrayPrimitiveValue';
import { ObjCardStyles, ObjEntryStyles } from '@/shared/constants/styles';
import { DropDownList } from '@/shared/ui/DropDownList/DropDownList';
import { BatteryEntry } from './ui/BatteryEntry/BatteryEntry';
import { PlatformEntry } from './ui/PlatformEntry/PlatformEntry';
import { KitEntry } from './ui/KitEntry/KitEntry';
import { Delete, Photo } from '@mui/icons-material';
import { PhotoLoader } from '@/shared/ui/photoLoader/PhotoLoader';

export const DeviceCard = (props: IDeviceCard) => {
  const { device, loading, uiHandler, photoLoader } = useDeviceCard(props);

  const { colors } = props;

  if (!device || loading) return <span>Загрузка...</span>;

  const deviceConfig = createRenderConfig(device);

  return (
    <>
      <ObjCard
        data={device}
        photoURL={device.photoURL}
        styles={ObjCardStyles(colors)}
        translatedNamesForKeys={translate}
        renderInHeader={() => (
          <>
            <TextValue value={device.brand} {...uiHandler.textField("brand")} />
            <TextValue value={device.model} {...uiHandler.textField("model")} />
          </>
        )}
        menu={{
          menuItems: [
            ...(device.photoURL
              ? [
                {
                  label: 'Заменить фото',
                  sx: { gap: 1 },
                  ...uiHandler.menuItem('load-photo'),
                  renderBeforeLabel: <Photo />,
                },
                {
                  label: 'Удалить фото',
                  sx: { gap: 1 },
                  ...uiHandler.menuItem('delete-photo'),
                  renderBeforeLabel: <Photo />,
                },
              ]
              : [
                {
                  label: 'Добавить фото',
                  ...uiHandler.menuItem('load-photo'),
                  sx: { gap: 1 },
                  renderBeforeLabel: <Photo />,
                },
              ]),
            {
              label: 'Удалить девайс',
              ...uiHandler.menuItem('delete-device'),
              sx: { color: 'red', gap: 1 },
              renderBeforeLabel: <Delete />,
            },
          ],
        }}
        renderForKeys={[
          ...deviceConfig.forKeys(
            ['platforms'],
            (_key, value) => (
              <PlatformEntry
                platform={value}
                objEntryStyles={ObjEntryStyles(colors)}
                {...uiHandler.platformEntry}
              />
            ),
            { hideKeyName: true }
          ),
          ...deviceConfig.forKeys(
            ['battery'],
            (_key, value) => (
              <BatteryEntry
                style={ObjEntryStyles(colors)}
                battery={value}
                {...uiHandler.batteryEntry}
              />
            ),
            { hideKeyName: true }
          ),
          ...deviceConfig.forKeys(
            ['kit'],
            (_key, value) => (
              <KitEntry kit={value} {...uiHandler.kitEntry} colors={colors} />
            ),
            { hideKeyName: true }
          ),
          ...deviceConfig.forKeys(['minCoilResistance'], (_key, value) => (
            <TextValue
              style={{ maxWidth: '120px' }}
              value={value}
              {...uiHandler.textField("minCoilResistance")}
            />
          )),
          ...deviceConfig.forKeys(['screen'], (_key, value) => (
            <DropDownList
              value={value}
              data={SCREEN_TYPES}
              {...uiHandler.dropDown("screen")}
            />
          )),
          ...deviceConfig.forKeys(['features', 'modes'], (key, value) => (
            <ArrayPrimitiveValue
              value={value}
              {...uiHandler.arrayPrimitive(key)}
            />
          )),
        ]}
      />
      <PhotoLoader {...photoLoader} {...uiHandler.photoLoader} />
    </>
  );
};

const translate: Record<keyof DeviceType, string> | undefined = {
  id: '', /// +
  photoURL: '', /// +
  brand: '', /// +
  model: '', /// +
  modes: 'Режимы', /// +
  features: 'Фичи', /// +
  screen: 'Экран', /// +
  battery: 'АКБ', /// +
  minCoilResistance: 'Мин. сопрот',
  platforms: 'Платформа',
  kit: 'Комплект',
};
