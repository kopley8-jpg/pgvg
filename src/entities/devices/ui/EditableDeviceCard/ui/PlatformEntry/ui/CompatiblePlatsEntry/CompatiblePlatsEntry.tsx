import { createRenderConfig } from '@/shared/lib/createRenderConfig';
import type { CompactiblePlatType } from '@/shared/types/device';
import {
  ObjEntryTwo,
  type ObjEntryStylesType,
} from '@/shared/ui/ObjEntry/ObjEntry';
import { Add, Delete } from '@mui/icons-material';
import { IconButton, MenuItem } from '@mui/material';

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
      style={{
        ...objEntryStyles,
        propsContainer: {
          ...objEntryStyles.propsContainer,
          overflow: 'hidden',
        },
        propContainer: {
          ...objEntryStyles.propContainer,
          backgroundColor: 'red',
        },
      }}
      translatedNamesForKeys={{}}
      renderForKeys={[
        ...(compatiblePlats ? compatiblePlats : [])
          .map((plat) =>
            createRenderConfig({ plat }).forKeys(
              ['plat'],
              (_key, value) => (
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <MenuItem
                    sx={{
                      py: 1,
                      px: 1,
                      minHeight: 'auto',
                      width: '100%',
                      fontSize: '1rem',
                      '@media (max-width: 386px)': {
                        fontSize: '2.5vw',
                      },
                      overflow:
                        'hidden' /* Скрываем выходящий за границы текст */,
                      whiteSpace: 'nowrap' /* Запрещаем перенос строк */,
                      textOverflow: 'ellipsis',
                    }}
                    onClick={() => {
                      onPlatItemClick(plat);
                    }}
                  >
                    {value.name}
                  </MenuItem>
                  <IconButton
                    size="small"
                    onClick={() => {
                      onDelete(
                        (compatiblePlats ? compatiblePlats : []).filter(
                          (res) => res.idFromPlatforms != plat.idFromPlatforms
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
                onPlatAdd(e);
              }}
              sx={{ width: '100%', borderRadius: 10 }}
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
