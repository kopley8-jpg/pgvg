import { createRenderConfig } from '@/shared/lib/createRenderConfig';
import {
  type CompactiblePlatType,
  type PlatformType,
} from '@/shared/types/device';
import { DropDownList } from '@/shared/ui/DropDownList/DropDownList';
import {
  ObjEntryTwo,
  type ObjEntryStylesType,
} from '@/shared/ui/ObjEntry/ObjEntry';
import { Switch } from '@mui/material';
import { CompatiblePlatsEntry } from './ui/CompatiblePlatsEntry/CompatiblePlatsEntry';

export interface IPlatformEntry {
  platform: PlatformType;
  objEntryStyles: ObjEntryStylesType;
  onChange?: (platform: PlatformType) => void;
  onPlatItemClick?: (plat: CompactiblePlatType) => void;
  onCompatiblePlatAdd?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

export const PlatformEntry = (props: IPlatformEntry) => {
  const {
    platform,
    objEntryStyles,
    onChange,
    onPlatItemClick,
    onCompatiblePlatAdd,
  } = props;

  return (
    <ObjEntryTwo
      style={objEntryStyles}
      entryName="Платформа"
      translatedNamesForKeys={translate}
      renderForKeys={[
        ...createRenderConfig(platform).forKeys(['type'], (_key, value) => (
          <DropDownList
            value={value}
            data={['510', 'boro', 'dot', 'squonk', 'магнит']}
            onPick={(picked) => {
              if (!picked || picked === platform.type) return;
              if (picked === 'магнит') {
                onChange?.({
                  type: picked,
                  adjustmentAirflow: false,
                  compatiblePlats: [],
                });
              } else {
                onChange?.({ type: picked });
              }
            }}
          />
        )),
        ...(platform.type === 'магнит'
          ? [
              ...createRenderConfig(platform).forKeys(
                ['adjustmentAirflow'],
                (_key, value) => (
                  <Switch
                    checked={value}
                    size="small"
                    onClick={() =>
                      onChange?.({
                        ...platform,
                        adjustmentAirflow: !platform.adjustmentAirflow,
                      })
                    }
                  />
                )
              ),
              <CompatiblePlatsEntry
                compatiblePlats={platform.compatiblePlats}
                objEntryStyles={objEntryStyles}
                onPlatItemClick={(plat) => {
                  onPlatItemClick?.(plat);
                }}
                onDelete={(newPlats) => {
                  onChange?.({ ...platform, compatiblePlats: newPlats });
                }}
                onPlatAdd={(e) => {
                  onCompatiblePlatAdd?.(e);
                }}
              />,
            ]
          : [null]),
      ]}
    />
  );
};

const translate = {
  type: 'Тип',
  adjustmentAirflow: 'Рег. затяжки',
  compatiblePlats: 'Поддерживает',
};
