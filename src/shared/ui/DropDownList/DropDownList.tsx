import type { IDropDownList } from './DropDown.types';
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state';
import { MenuItem, Popover } from '@mui/material';

export const DropDownList = <T extends string | number>({
  value,
  data,
  style,
  onPick,
}: IDropDownList<T>) => {
  return (
    <PopupState variant="popover">
      {(state) => (
        <>
          <span {...bindTrigger(state)} style={{ ...style?.value }}>
            {value ? value : "значение?"}
          </span>
          <Popover
            {...bindMenu(state)}
            slotProps={{
              paper: {
                style: { ...style?.menuContainer },
              },
            }}
          >
            {data.map((item) => (
              <MenuItem
                sx={{ ...style?.menuItem }}
                onClick={() => {
                  onPick(item);
                  state.close();
                }}
              >
                {item}
              </MenuItem>
            ))}
          </Popover>
        </>
      )}
    </PopupState>
  );
};
