import { Delete, MoreVert } from '@mui/icons-material';
import { IconButton, MenuItem, Popover } from '@mui/material';
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state';

interface ICardMenu {
  onClick: () => void;
}

export const CardMenu = ({ onClick }: ICardMenu) => {
  return (
    <PopupState variant="popover">
      {(state) => (
        <>
          <IconButton size="small" {...bindTrigger(state)}>
            <MoreVert fontSize="small" />
          </IconButton>
          <Popover {...bindMenu(state)}>
            <MenuItem
              sx={{ color: 'red' }}
              onClick={() => {
                onClick();
                state.close();
              }}
            >
              <Delete />
              Удалить
            </MenuItem>
          </Popover>
        </>
      )}
    </PopupState>
  );
};
