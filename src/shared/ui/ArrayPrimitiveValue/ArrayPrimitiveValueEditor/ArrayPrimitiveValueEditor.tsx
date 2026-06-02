import { Add, Cancel, Delete, Save } from '@mui/icons-material';
import { Divider, IconButton, MenuItem, Popover } from '@mui/material';
import { useStyles } from './styles';
import type { IArrayPrimitiveValueEditor } from './model/types';
import { useArrayPrimitiveValueEditor } from './model/useArrayPrimitiveValueEditor';
import { TextEditor } from '../../TextEditor/TextEditor';

export const ArrayPrimitiveValueEditor = (
  props: IArrayPrimitiveValueEditor
) => {
  const styles = useStyles();

  const { style } = props;

  const { localValues, pickedValueId, createHandler } =
    useArrayPrimitiveValueEditor(props);

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
          {index === pickedValueId ? (
            <div style={styles.item}>
              <TextEditor value={val} {...handler.editing.textField} />
              <IconButton
                size="small"
                {...handler.editing.deleteButton}
                sx={style?.popupIcons}
              >
                <Delete fontSize="small" />
              </IconButton>
            </div>
          ) : (
            <MenuItem
              onClick={() => handler.item.onClick(index)}
              sx={style?.popupItem}
            >
              {val}
            </MenuItem>
          )}
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
