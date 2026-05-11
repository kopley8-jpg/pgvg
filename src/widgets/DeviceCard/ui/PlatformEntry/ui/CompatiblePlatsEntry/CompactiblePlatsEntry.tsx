import { ObjEntryTwo } from '@/shared/ui/ObjEntry/ObjEntry';
import type { ICompactiblePlatsEntry } from './model/types';
import { createRenderConfig } from '@/shared/lib/createRenderConfig';
import { PlatItem } from '../PlatItem/PlatItem';
import { useCompatiblePlatsEntry } from './model/useCompatiblePodsEntry';
import { PlatformModal } from '../PlatformModal/PlatformModal';
import { IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';
import { AddCompactiblePlatMenu } from '../AddCompactiblePlatMenu/AddCompactiblePlatMenu';
import { updateDeviceById } from '@/features/devices/updateDeviceEntryById/model/updateDeviceEntryById';

export const CompactiblePlatsEntry = (props: ICompactiblePlatsEntry) => {
  const { compactiblePlats, onChange } = props;

  const {
    openPlat,
    openAddPlatMenu,
    handlePlatPick,
    handleBackdropModalClick,
    handlePlatItemDeleteButtonClick,
    handleAddCompactiblePlatBittonClick,
    handleNewPlatPicked,
  } = useCompatiblePlatsEntry(props);

  return (
    <ObjEntryTwo
      translatedNamesForKeys={{}}
      entryName="Поддерживает"
      renderForKeys={[
        ...(compactiblePlats ? compactiblePlats : [])
          .map((plat) =>
            createRenderConfig({ plat }).forKeys(
              ['plat'],
              (key, value) => (
                <>
                  <PlatformModal
                    isOpen={
                      openPlat?.id === value.idFromPlatforms ? true : false
                    }
                    plat={{ ...plat, id: plat.idFromPlatforms }}
                    onBackdropClick={handleBackdropModalClick}
                  />
                  <PlatItem
                    platform={plat}
                    onClick={() =>
                      handlePlatPick(plat.type, plat.idFromPlatforms)
                    }
                    onDeleteButtonClick={() =>
                      handlePlatItemDeleteButtonClick(plat.idFromPlatforms)
                    }
                  />
                </>
              ),
              { hideKeyName: true }
            )
          )
          .flat(),
        ...createRenderConfig({ aaa: 3 }).forKeys(
          ['aaa'],
          () => <AddCompactiblePlatMenu onPick={handleNewPlatPicked} />,
          { hideKeyName: true }
        ),
      ]}
    />
  );
};
