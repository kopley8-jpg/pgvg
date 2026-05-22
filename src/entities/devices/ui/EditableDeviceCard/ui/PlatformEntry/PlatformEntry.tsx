import { createRenderConfig } from '@/shared/lib/createRenderConfig';
import { PLATFORM_FORMATS, type PlatformType } from '@/shared/types/device';
import { DropDownList } from '@/shared/ui/DropDownList/DropDownList';
import {
  ObjEntryTwo,
  type ObjEntryStylesType,
} from '@/shared/ui/ObjEntry/ObjEntry';

interface IPlatformEntry {
  platform: PlatformType;
  objEntryStyles: ObjEntryStylesType;
}

export const PlatformEntry = (props: IPlatformEntry) => {
  const { platform, objEntryStyles } = props;

  return (
    <ObjEntryTwo
      style={objEntryStyles}
      entryName="Платформа"
      translatedNamesForKeys={translate}
      renderForKeys={[
        ...createRenderConfig(platform).forKeys(['type'], (_key, value) => (
          <DropDownList
            value={value}
            data={PLATFORM_FORMATS}
            onPick={() => {}}
          />
        )),
      ]}
    />
  );
};

const translate = {
  type: 'Тип',
  adjustmentAirflow: 'Рег. затяжки',
  compatiblePlats: 'Поддерживает',
};
