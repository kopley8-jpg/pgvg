import { createRenderConfig } from '@/shared/lib/createRenderConfig';
import { DropDownList } from '@/shared/ui/DropDownList/DropDownList';
import { ObjEntryTwo } from '@/shared/ui/ObjEntry/ObjEntry';
import type { IPlatformEntry } from './model/platformEntry.types';
import { usePlatformEntry } from './model/usePlatformEntry';
import { CompactiblePlatsEntry } from './ui/CompatiblePlatsEntry/CompactiblePlatsEntry';

export const PlatformEntry = ({
  platform,
  onChange,
  deviceId,
}: IPlatformEntry) => {
  const { handlePlatformTypeChanged } = usePlatformEntry({
    platform,
    onChange,
    deviceId,
  });

  return (
    <ObjEntryTwo
      translatedNamesForKeys={translated}
      entryName="Платформа"
      renderForKeys={[
        ...createRenderConfig(platform).forKeys(['type'], (key, value) => (
          <DropDownList
            value={value}
            data={['510', 'boro', 'dot', 'squonk', 'магнит']}
            onPick={handlePlatformTypeChanged}
          />
        )),
        ...(platform.type === 'магнит'
          ? createRenderConfig(platform).forKeys(
            ['compatiblePlats'],
            (key, value) => (
              <CompactiblePlatsEntry
                deviceId={deviceId}
                compactiblePlats={value}
                onChange={(newPlats) => onChange({ type: "магнит", compatiblePlats: newPlats })}
              />
            ),
            { hideKeyName: true }
          )
          : [null]),
      ]}
    />
  );
};

const translated = {
  type: 'Тип',
  compatiblePlats: 'Поддерживает',
};
