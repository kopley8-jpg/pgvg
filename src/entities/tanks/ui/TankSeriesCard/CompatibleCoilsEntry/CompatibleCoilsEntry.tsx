import type { CompactibleCoilSeriesesType } from '@/shared/types/tank-series';
import { ListEntryItem } from '@/shared/ui/ListEntryItem/ListEntryItem';
import {
  ObjEntryTwo,
  type ObjEntryStylesType,
} from '@/shared/ui/ObjEntry/ObjEntry';
import { Add } from '@mui/icons-material';
import { IconButton } from '@mui/material';

interface ICompatiblePlatsEntry {
  compactibleCoils: CompactibleCoilSeriesesType[] | null;
  objEntryStyles: ObjEntryStylesType;
  onDelete: (compatiblePlats: CompactibleCoilSeriesesType[]) => void;
  onCoilItemClick: (plat: CompactibleCoilSeriesesType) => void;
  onCoilAdd: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const CompactibleCoilsEntry = (props: ICompatiblePlatsEntry) => {
  const {
    compactibleCoils,
    objEntryStyles,
    onDelete,
    onCoilItemClick,
    onCoilAdd,
  } = props;
  return (
    <ObjEntryTwo
      entryName="Поддерживает"
      style={objEntryStyles}
      translatedNamesForKeys={{}}
      renderForKeys={[
        ...(compactibleCoils ? compactibleCoils : [])
          .map((coil) => (
            <ListEntryItem
              label={coil.name}
              onClick={() => onCoilItemClick(coil)}
              onDelete={() => {
                onDelete(
                  (compactibleCoils ? compactibleCoils : []).filter(
                    (res) => res.idFromPlatforms != coil.idFromPlatforms
                  )
                );
              }}
            />
          ))
          .flat(),
        <IconButton
          size="small"
          onClick={(e) => {
            onCoilAdd(e);
          }}
        >
          <Add fontSize="small" />
        </IconButton>,
      ]}
    />
  );
};
