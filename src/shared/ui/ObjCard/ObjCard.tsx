import React from 'react';
import type { IObjCard, ObjCardStyles } from './types';
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state';
import {
  Box,
  IconButton,
  MenuItem,
  Popover,
  type SxProps,
} from '@mui/material';
import { MoreVert } from '@mui/icons-material';

export const ObjCard = <T extends Record<string, any>>({
  photoURL,
  data,
  translatedNamesForKeys,
  renderInHeader,
  styles: propsStyles,
  renderForKeys,
  menu,
}: IObjCard<T>) => {
  return (
    <Box sx={{ ...styles.container, ...propsStyles?.container } as SxProps}>
      {photoURL ? (
        <img
          src={photoURL}
          style={{ ...styles.photo, ...propsStyles?.photo }}
        />
      ) : (
        <></>
      )}

      <Box
        sx={
          { ...styles.infoContainer, ...propsStyles?.infoContainer } as SxProps
        }
      >
        <Box sx={{ ...styles.header, ...propsStyles?.header } as SxProps}>
          {renderInHeader()}
          {menu ? (
            <PopupState variant="popover">
              {(state) => (
                <>
                  <IconButton
                    {...bindTrigger(state)}
                    {...menu.trigger}
                    size={'small'}
                  >
                    <MoreVert fontSize="small" />
                  </IconButton>
                  <Popover
                    {...bindPopover(state)}
                    transformOrigin={{ horizontal: 'center', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
                  >
                    {menu.menuItems.map((menuItem) => (
                      <MenuItem
                        {...menuItem}
                        onClick={(e) => {
                          state.close();
                          menuItem.onClick?.(e);
                        }}
                      >
                        {menuItem.renderBeforeLabel}
                        {menuItem.label}
                      </MenuItem>
                    ))}
                  </Popover>
                </>
              )}
            </PopupState>
          ) : (
            <></>
          )}
        </Box>
        <Box sx={{ ...styles.props, ...propsStyles?.props } as SxProps}>
          {renderForKeys.map((render, index) => (
            <React.Fragment key={index}>
              {!render.options?.hideKeyName ? (
                <Box
                  key={index}
                  sx={
                    {
                      ...styles.prop,
                      ...propsStyles?.prop,
                      ...render.options?.style,
                    } as SxProps
                  }
                >
                  <Box sx={styles.propKeyName}>
                    <span>
                      {translatedNamesForKeys
                        ? translatedNamesForKeys[render.key]
                        : render.key.toString()}
                    </span>
                  </Box>
                  <Box sx={{ ...styles.propContentContainer }}>
                    {render.renderItem(render.key, data[render.key])}
                  </Box>
                </Box>
              ) : (
                <Box
                  key={index}
                  sx={
                    {
                      ...styles.prop,
                      ...propsStyles?.prop,
                      border: '0px black solid',
                    } as SxProps
                  }
                >
                  <Box sx={{ ...styles.propContentContainer, width: '100%' }}>
                    {render.renderItem(render.key, data[render.key])}
                  </Box>
                </Box>
              )}
            </React.Fragment>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

const styles: ObjCardStyles = {
  container: {
    border: '2px grey solid',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'row',
    height: '35vh',
  },
  photo: {
    objectFit: 'contain',
    height: '100%',
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  header: {
    borderBottom: '2px grey solid',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 1,
    gap: 1,
  },
  props: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '0.5vh',
    paddingBottom: '0.5vh',
    paddingLeft: 1,
    paddingRight: 1,
    gap: '0.5vh',
    overflowY: 'auto',
    boxSizing: 'border-box',
  },
  prop: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    border: '2px grey solid',
    borderRadius: '20px',
  },
  propKeyName: {
    backgroundColor: 'grey',
    width: '50%',
    borderRadius: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  propContentContainer: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    overflow: 'hidden' /* Скрываем выходящий за границы текст */,
    whiteSpace: 'nowrap' /* Запрещаем перенос строк */,
    textOverflow: 'ellipsis',
  },
};
