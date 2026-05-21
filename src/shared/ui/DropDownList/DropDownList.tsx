import { useState } from 'react';
import type { IDropDownList } from './DropDown.types';
import { useStyles } from './DropDown.styles';
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state';
import { Box, MenuItem, Popover } from '@mui/material';

export const DropDownList = <T extends string | undefined | null>({
  value,
  data,
  style,
  onPick,
}: IDropDownList<T>) => {
  const styles = useStyles();

  return (
    <PopupState variant="popover" >
      {state => (
        <>
          <span {...bindTrigger(state)} style={{ ...style?.value }}>{value}</span>
          <Popover
            {...bindMenu(state)}
            slotProps={{
              paper: {
                style: { ...style?.menuContainer }
              }
            }}>
            {data.map(item => (
              <MenuItem
                sx={{ ...style?.menuItem }}
                onClick={() => {
                  onPick(item)
                  state.close()
                }}>{item}</MenuItem>
            ))}
          </Popover>
        </>
      )}
    </PopupState>
  );
};


