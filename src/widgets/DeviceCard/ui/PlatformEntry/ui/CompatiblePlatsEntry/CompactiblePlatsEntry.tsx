import { ObjEntryTwo } from '@/shared/ui/ObjEntry/ObjEntry';
import type { ICompactiblePlatsEntry } from './model/types';
import { createRenderConfig } from '@/shared/lib/createRenderConfig';
import { PlatItem } from '../PlatItem/PlatItem';
import { useCompatiblePlatsEntry } from './model/useCompatiblePodsEntry';
import { AddCompactiblePlatMenu } from '../AddCompactiblePlatMenu/AddCompactiblePlatMenu';
import { TankSeriesCardModal } from '@/widgets/Tank/TankSeriesCardModal/TankSeriesCardModal';
import PopupState, { bindMenu } from 'material-ui-popup-state';
import { PodSeriesCardModal } from '@/widgets/pod/PodSeriesCardModal/PodSeriesCardModal';

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
                <PopupState variant='popover'>
                  {state => (
                    <>
                      {value.type === "tank" ? (
                        <TankSeriesCardModal compatiblePlat={value} {...bindMenu(state)} />
                      ) : (
                        <PodSeriesCardModal compatiblePlat={value} {...bindMenu(state)} />
                      )}
                      <PlatItem
                        platform={plat}
                        onClick={() =>
                          state.open()
                        }
                        onDeleteButtonClick={() =>
                          handlePlatItemDeleteButtonClick(plat.idFromPlatforms)
                        }
                      />
                    </>
                  )}
                </PopupState>
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
