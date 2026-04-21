import type { PlatformType } from '@/entities/devices/model/types';
import { createRenderConfig } from '@/shared/lib/createRenderConfig';
import { DropDownList } from '@/shared/ui/DropDownList/DropDownList';
import { ObjEntry } from '@/shared/ui/ObjEntry/ObjEntry';

interface IPlatformEntry {
  platform: PlatformType;
  onChange: (newValue: PlatformType) => void;
}

export const PlatformEntry = ({ platform, onChange }: IPlatformEntry) => {
  if (
    platform.type === '510' ||
    platform.type === 'boro' ||
    platform.type === 'dot' ||
    platform.type === 'squonk'
  ) {
    const platConfig = createRenderConfig(platform);
  } else if (platform.type === 'магнит') {
    const platConfig = createRenderConfig(platform);
    return (
      <ObjEntry
        entryName="Платформы"
        translatedNamesForKeys={translated}
        data={platform}
        renderForKeys={[
          ...platConfig.forKeys(['type'], (key, value) => (
            <DropDownList
              value={'магнит'}
              data={['магнит', 'dot', 'boro', 'squonk', '510']}
              onPick={(picked) =>
                picked === 'магнит' ? undefined : onChange({ type: picked })
              }
            />
          )),
        ]}
      />
    );
  }
};

const translated = {
  type: 'Тип',
  compatiblePlats: 'Поддерживает',
};
