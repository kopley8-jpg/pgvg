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
import { KitEntry } from './ui/KitEntry/KitEntry';
import { Delete, Photo } from '@mui/icons-material';
import { MenuItem, Popover, type PopoverProps } from '@mui/material';
import { useRef } from 'react';

export const DeviceCard = (props: IDeviceCard) => {
  const { device, loading, uiHandler, photoLoader } = useDeviceCard(props);

  const { colors } = props;

  if (!device || loading) return <span>Загрузка...</span>;

  const deviceConfig = createRenderConfig(device);

  const styles = useStyles(colors);

  return (
    <>
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
        menu={{
          trigger: {},
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
                {...uiHandler.platform}
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
                {...uiHandler.battery}
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
              {...uiHandler.screen}
            />
          )),
          ...deviceConfig.forKeys(['features', 'modes'], (key, value) => (
            <ArrayPrimitiveValue
              value={value}
              {...uiHandler.featuresNModes(key)}
            />
          )),
        ]}
      />
      <PhotoLoader {...photoLoader} {...uiHandler.photoLoader} />
    </>
  );
};

type PhotoLoaderProps = {
  onFile?: (file: File) => void;
  onURL?: (url: string) => void;
} & PopoverProps;

const PhotoLoader = (props: PhotoLoaderProps) => {
  const { onClose, onFile, onURL } = props;
  const fileInputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <Popover {...props}>
        <MenuItem
          onClick={() => {
            fileInputRef.current?.click();
          }}
        >
          Выбрать файл
        </MenuItem>
        <MenuItem
          onClick={async () => {
            const res = await pasteFromClipboard();
            if (!res) return;
            if (typeof res === 'object') {
              onFile?.(res);
              onClose?.({}, 'backdropClick');
            } else {
              onURL?.(res);
              onClose?.({}, 'backdropClick');
            }
          }}
        >
          Вставить
        </MenuItem>
      </Popover>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          onFile?.(file);
          onClose?.({}, 'backdropClick');
        }}
      />
    </>
  );
};

const pasteFromClipboard = async () => {
  const items = await navigator.clipboard.read();
  for (const item of items) {
    const imageType = item.types.find((t) => t.startsWith('image/'));
    if (imageType) {
      const blob = await item.getType(imageType);
      return new File([blob], 'pasted.png', { type: blob.type });
    }
    if (item.types.includes('text/plain')) {
      const text = await (await item.getType('text/plain')).text();
      return text;
    }
  }
  return null;
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
