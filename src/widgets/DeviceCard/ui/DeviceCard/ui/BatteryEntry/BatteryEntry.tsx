import {
  BATTERY_FORMATS,
  type BatteryType,
} from '@/entities/devices/model/types';
import { useThemeStore } from '@/shared/hooks/useThemeStore';
import { createRenderConfig } from '@/shared/lib/createRenderConfig';
import { createStyles } from '@/shared/lib/createStyles';
import { DropDownList } from '@/shared/ui/DropDownList/DropDownList';
import { ObjEntry } from '@/shared/ui/ObjEntry/ObjEntry';
import { TextValue } from '@/shared/ui/PrimitiveValue/TextValue/TextValue';
import { useTheme } from '@emotion/react';

interface IBatteryEntry {
  battery: BatteryType;
  onChange: (newValue: BatteryType) => void;
}

export const BatteryEntry = ({ battery, onChange }: IBatteryEntry) => {
  if (battery.type === 'встроенный') {
    const batteryConfig = createRenderConfig(battery);

    return (
      <ObjEntry
        translatedNamesForKeys={translate}
        entryName="АКБ"
        data={battery}
        renderForKeys={[
          ...batteryConfig.forKeys(['type'], (key, value) => (
            <span
              style={{ fontSize: '5vw', cursor: 'pointer' }}
              onClick={() => onChange({ type: 'сменный', format: '18650' })}
            >
              встроенный
            </span>
          )),
          ...batteryConfig.forKeys(['capacity'], (key, value) => (
            <TextValue
              value={value}
              fontSize={'5vw'}
              onSaveButtonPress={(newValue) =>
                onChange({ ...battery, capacity: Number(newValue) })
              }
            />
          )),
        ]}
      />
    );
  } else if (battery.type === 'сменный') {
    const batteryConfig = createRenderConfig(battery);

    return (
      <ObjEntry
        translatedNamesForKeys={translate}
        entryName="АКБ"
        data={battery}
        renderForKeys={[
          ...batteryConfig.forKeys(['type'], (key, value) => (
            <span
              style={{ fontSize: '5vw', cursor: 'pointer' }}
              onClick={() => onChange({ type: 'встроенный', capacity: 0 })}
            >
              сменный
            </span>
          )),
          ...batteryConfig.forKeys(['format'], (key, value) => (
            <DropDownList
              value={value}
              data={BATTERY_FORMATS}
              onPick={(picked) => onChange({ type: 'сменный', format: picked })}
            />
          )),
        ]}
      />
    );
  }
};

const translate = {
  type: 'Тип',
  capacity: 'Емкость',
  format: 'Формат',
};
