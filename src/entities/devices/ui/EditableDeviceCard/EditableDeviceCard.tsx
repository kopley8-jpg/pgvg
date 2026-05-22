import { createStyles } from '@/shared/lib/createStyles';
import { ObjCard } from '@/shared/ui/ObjCard/ObjCard';
import type { IDeviceCard } from './model/types';
import { useDeviceCard } from './model/useDeviceCard';
import type { DeviceType } from '@/shared/types/device';
import { TextValue } from '@/shared/ui/PrimitiveValue/TextValue/TextValue';
import { createRenderConfig } from '@/shared/lib/createRenderConfig';
import { ArrayPrimitiveValue } from '@/shared/ui/ArrayPrimitiveValue/ArrayPrimitiveValue';
import type { colors as cols } from '@/shared/constants/colors';
import { ObjCardStyles, ObjEntryStyles } from '@/shared/constants/styles';
import { DropDownList } from '@/shared/ui/DropDownList/DropDownList';
import { BatteryEntry } from './ui/BatteryEntry/BatteryEntry';
import { PlatformEntry } from './ui/PlatformEntry/PlatformEntry';

export const DeviceCard = (props: IDeviceCard) => {
  const { device, loading, uiHandler } = useDeviceCard(props);

  const { colors } = props;

  if (!device || loading) return <span>Загрузка...</span>;

  const deviceConfig = createRenderConfig(device);

  const styles = useStyles(colors);

  return (
    <ObjCard
      data={device}
      photoURL={device.photoURL}
      styles={ObjCardStyles(colors)}
      translatedNamesForKeys={translate}
      renderInHeader={() => (
        <>
          <TextValue value={device.brand} {...uiHandler.brand} />
          <TextValue value={device.model} {...uiHandler.model} />
        </>
      )}
      renderForKeys={[
        ...deviceConfig.forKeys(
          ['platforms'],
          (_key, value) => (
            <PlatformEntry
              platform={value}
              objEntryStyles={ObjEntryStyles(colors)}
            />
          ),
          {
            hideKeyName: true,
            style: { border: '0px black solid' },
          }
        ),

        ...deviceConfig.forKeys(
          ['battery'],
          (_key, value) => (
            <BatteryEntry
              style={ObjEntryStyles(colors)}
              battery={value}
              onError={(e) => {
                alert(e);
              }}
            />
          ),
          {
            hideKeyName: true,
            style: {
              border: '0px rgba(0,0,0,0), solid',
            },
          }
        ),
        ...deviceConfig.forKeys(['minCoilResistance'], (_key, value) => (
          <TextValue
            style={{ maxWidth: '120px' }}
            value={value}
            {...uiHandler.minCoilResisnatce}
          />
        )),
        ...deviceConfig.forKeys(['screen'], (_key, value) => (
          <DropDownList
            style={{
              value: styles.dropDown,
              menuContainer: styles.dropDown,
            }}
            value={value}
            data={['индикация', 'нет', 'полноценный']}
            onPick={() => {}}
          />
        )),
        ...deviceConfig.forKeys(['features', 'modes'], (_key, value) => (
          <ArrayPrimitiveValue value={value} onChangesSaved={() => {}} />
        )),
      ]}
    />
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

const useStyles = (colors: typeof cols.light) => {
  return createStyles({
    dropDown: {
      color: colors.primary,
    },
  });
};
