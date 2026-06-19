import type { CompactiblePlatType } from '@/shared/types/device';
import { ListEntryItem } from '@/shared/ui/ListEntryItem/ListEntryItem';
import {
  ObjEntryTwo,
  type ObjEntryStylesType,
} from '@/shared/ui/ObjEntry/ObjEntry';
import { Add } from '@mui/icons-material';
import { IconButton } from '@mui/material';

interface ICompatiblePlatsEntry {
  compatiblePlats: CompactiblePlatType[] | null;
  objEntryStyles: ObjEntryStylesType;
  onDelete: (compatiblePlats: CompactiblePlatType[]) => void;
  onPlatItemClick: (plat: CompactiblePlatType) => void;
  onPlatAdd: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const CompatiblePlatsEntry = (props: ICompatiblePlatsEntry) => {
  const {
    compatiblePlats,
    objEntryStyles,
    onDelete,
    onPlatItemClick,
    onPlatAdd,
  } = props;
  return (
    <ObjEntryTwo
      entryName="Поддерживает"
      style={objEntryStyles}
      translatedNamesForKeys={{}}
      renderForKeys={[
        ...(compatiblePlats ? compatiblePlats : [])
          .map((plat) => (
            <ListEntryItem
              label={plat.name}
              onClick={() => onPlatItemClick(plat)}
              onDelete={() => {
                onDelete(
                  (compatiblePlats ? compatiblePlats : []).filter(
                    (res) => res.idFromPlatforms != plat.idFromPlatforms
                  )
                );
              }}
            />
          ))
          .flat(),
        <IconButton
          size="small"
          onClick={(e) => {
            onPlatAdd(e);
          }}
          sx={{ width: '100%', borderRadius: 10 }}
        >
          <Add fontSize="small" />
        </IconButton>,
      ]}
    />
  );
};
