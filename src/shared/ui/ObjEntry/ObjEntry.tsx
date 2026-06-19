import { useState } from 'react';
import { useStyles } from './ObjEntry.styles';
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import { Box, MenuItem, type SxProps, type Theme } from '@mui/material';

interface IObjEntryTwo {
  translatedNamesForKeys: Record<string | symbol | number, string>;
  entryName: string;
  style?: ObjEntryStylesType;
  renderForKeys: (RenderPropType | React.ReactNode)[];
}

export type RenderPropType = {
  options?: { style?: SxProps<Theme> };
  key: string | number | symbol;
  renderItem: React.ReactNode;
};

export type ObjEntryStylesType = Partial<
  Record<keyof ReturnType<typeof useStyles>, SxProps<Theme>>
>;

export const ObjEntryTwo = ({
  entryName,
  style,
  translatedNamesForKeys,
  renderForKeys,
}: IObjEntryTwo) => {
  const styles = useStyles();

  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ ...styles.container, ...style?.container }}>
      <MenuItem
        sx={{ ...styles.entryName, ...style?.entryName }}
        onClick={() => setOpen(!open)}
      >
        {entryName}
        {open ? <ArrowDropUp /> : <ArrowDropDown />}
      </MenuItem>
      {open ? (
        <Box sx={{ ...styles.propsContainer, ...style?.propsContainer }}>
          {renderForKeys.map((render) => (
            <>
              {render ? (
                <>
                  {!isRenderPropType(render) ? (
                    <Box
                      sx={{
                        ...styles.propContainer,
                        ...style?.propContainer,
                        border: '0px black solid',
                      }}
                    >
                      <Box
                        sx={{
                          ...styles.propContentContainer,
                          ...style?.propContentContainer,
                          width: '100%',
                        }}
                      >
                        {render}
                      </Box>
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        ...styles.propContainer,
                        ...style?.propContainer,
                      }}
                    >
                      <Box
                        sx={{
                          ...styles.propKeyNameContainer,
                          ...style?.propKeyNameContainer,
                        }}
                      >
                        <span>
                          <span>
                            {translatedNamesForKeys
                              ? translatedNamesForKeys[render.key]
                              : render.key.toString()}
                            :
                          </span>
                        </span>
                      </Box>
                      <Box
                        sx={{
                          ...styles.propContentContainer,
                          ...style?.propContentContainer,
                          alignItems: 'center',
                        }}
                      >
                        {render.renderItem}
                      </Box>
                    </Box>
                  )}
                </>
              ) : (
                <></>
              )}
            </>
          ))}
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
};

function isRenderPropType(item: any): item is RenderPropType {
  return item && typeof item === 'object' && 'renderItem' in item;
}
