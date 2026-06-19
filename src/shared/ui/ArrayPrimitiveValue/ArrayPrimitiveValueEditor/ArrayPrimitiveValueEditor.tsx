import { Add, Cancel, Delete, Save } from '@mui/icons-material';
import { Divider, IconButton, MenuItem, Popover } from '@mui/material';
import { useStyles } from './styles';
import type { IArrayPrimitiveValueEditor } from './model/types';
import { useArrayPrimitiveValueEditor } from './model/useArrayPrimitiveValueEditor';
import { TextEditor } from '../../TextEditor/TextEditor';
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state';

export const ArrayPrimitiveValueEditor = (
  props: IArrayPrimitiveValueEditor
) => {
  const styles = useStyles();

  const { style } = props;

  const { localValues, createHandler } = useArrayPrimitiveValueEditor(props);

  const handler = createHandler();

  return (
    <Popover
      {...props.menuProps}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      slotProps={{
        paper: {
          style: { ...styles.container, ...style?.popupContainer },
        },
      }}
    >
      <div style={styles.header}>
        <IconButton size="small" {...handler.exitButton} sx={style?.popupIcons}>
          <Cancel fontSize="small" />
        </IconButton>
        <IconButton size="small" {...handler.saveButton} sx={style?.popupIcons}>
          <Save fontSize="small" />
        </IconButton>
      </div>
      <Divider />
      {localValues.map((val, index) => (
        <>
          <PopupState variant="popover">
            {(state) => (
              <>
                <MenuItem
                  {...bindTrigger(state)}
                  sx={{ ...style?.popupItem, whiteSpace: 'normal' }}
                >
                  {val}
                </MenuItem>
                <Popover
                  {...bindPopover(state)}
                  slotProps={{
                    paper: {
                      style: { display: 'flex', flexDirection: 'row' },
                    },
                  }}
                >
                  <TextEditor
                    value={val}
                    {...handler.editing(index, state).textField}
                  />
                  <IconButton
                    size="small"
                    {...handler.editing(index, state).deleteButton}
                    sx={style?.popupIcons}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </Popover>
              </>
            )}
          </PopupState>
        </>
      ))}

      <IconButton
        sx={{ borderRadius: 0, ...style?.popupIcons }}
        size="small"
        {...handler.addButton}
      >
        <Add fontSize="small" />
      </IconButton>
    </Popover>
  );
};
