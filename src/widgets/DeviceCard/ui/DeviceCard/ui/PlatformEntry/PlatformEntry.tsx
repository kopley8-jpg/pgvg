import type { PlatformType } from '@/entities/devices/model/types';
import { createRenderConfig } from '@/shared/lib/createRenderConfig';
import { DropDownList } from '@/shared/ui/DropDownList/DropDownList';
import { ObjEntry, ObjEntryTwo } from '@/shared/ui/ObjEntry/ObjEntry';
import type { IPlatformEntry } from './model/platformEntry.types';
import { usePlatformEntry } from './model/usePlatformEntry';
import { usePodSeriesesStore } from '@/entities/pods/model/store/podsStore';

export const PlatformEntry = ({ platform, onChange }: IPlatformEntry) => {
  const { handlePlatformTypeChanged } = usePlatformEntry({
    platform,
    onChange,
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
              (key, value) => <CompactiblePlatsEntry compltiblePlats={value} />,
              { hideKeyName: true }
            )
          : [null]),
      ]}
    />
  );
};

interface ICompactiblePlatsEntry {
  compltiblePlats:
    | {
        type: 'pod' | 'tank';
        name: string;
        idFromPlatforms: number;
      }[]
    | null;
}

const CompactiblePlatsEntry = ({ compltiblePlats }: ICompactiblePlatsEntry) => {
  const { loading, podSerieses } = usePodSeriesesStore();

  return (
    <ObjEntryTwo
      translatedNamesForKeys={{}}
      entryName="Поддерживает"
      renderForKeys={[
        ...(compltiblePlats ? compltiblePlats : [])
          .map((plat) =>
            createRenderConfig({ plat }).forKeys(
              ['plat'],
              (key, value) => (
                <span style={{ width: '100%' }}>
                  {value.type + ' ' + value.name}
                </span>
              ),
              { hideKeyName: true }
            )
          )
          .flat(),
      ]}
    />
  );
};

const PlatItem = ({
  type,
  name,
  idFromPlatforms,
}: {
  type: 'pod' | 'tank';
  name: string;
  idFromPlatforms: number;
}) => {
  return <></>;
};

const translated = {
  type: 'Тип',
  compatiblePlats: 'Поддерживает',
};
