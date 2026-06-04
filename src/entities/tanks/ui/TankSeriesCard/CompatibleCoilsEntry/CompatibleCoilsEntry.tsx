import { createRenderConfig } from '@/shared/lib/createRenderConfig';
import type { CompactibleCoilSeriesesType } from '@/shared/types/tank-series';
import {
  ObjEntryTwo,
  type ObjEntryStylesType,
} from '@/shared/ui/ObjEntry/ObjEntry';
import { Add, Delete } from '@mui/icons-material';
import { IconButton, MenuItem } from '@mui/material';

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
          .map((coil) =>
            createRenderConfig({ coil }).forKeys(
              ['coil'],
              (_key, value) => (
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <MenuItem
                    sx={{ fontSize: '2vw', py: 1, px: 1, minHeight: 'auto' }}
                    onClick={() => {
                      onCoilItemClick(coil);
                    }}
                  >
                    {value.name}
                  </MenuItem>
                  <IconButton
                    size="small"
                    onClick={() => {
                      onDelete(
                        (compactibleCoils ? compactibleCoils : []).filter(
                          (res) => res.idFromPlatforms != coil.idFromPlatforms
                        )
                      );
                    }}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </div>
              ),
              { hideKeyName: true }
            )
          )
          .flat(),
        ...createRenderConfig({ a: 1 }).forKeys(
          ['a'],
          () => (
            <IconButton
              size="small"
              onClick={(e) => {
                onCoilAdd(e);
              }}
            >
              <Add fontSize="small" />
            </IconButton>
          ),
          { hideKeyName: true }
        ),
      ]}
    />
  );
};
