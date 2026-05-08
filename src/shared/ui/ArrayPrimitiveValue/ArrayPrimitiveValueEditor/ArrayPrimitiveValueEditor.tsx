import { Add, Cancel, Delete, Save } from '@mui/icons-material';
import { Divider, IconButton, Menu, MenuItem, Popover } from '@mui/material';
import { useState } from 'react';
import { useStyles } from './styles';
import { TextValue } from '../../PrimitiveValue/TextValue/TextValue';
import type { IArrayPrimitiveValueEditor } from './model/types';
import { useArrayPrimitiveValueEditor } from './model/useArrayPrimitiveValueEditor';
import { TextEditor } from '../../TextEditor/TextEditor';



export const ArrayPrimitiveValueEditor = (
  props: IArrayPrimitiveValueEditor
) => {
  const styles = useStyles();

  const { value } = props

  const {
    localValues,
    pickedValueId,
    createHandler
  } = useArrayPrimitiveValueEditor(props)

  const handler = createHandler()

  return (
    <Popover
      {...props}
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      slotProps={{
        paper: {
          style: styles.container,
        },
      }}
    >
      <div style={styles.header}>
        <IconButton size='small' {...handler.exitButton}>
          <Cancel fontSize='small' />
        </IconButton>
        <IconButton size="small" {...handler.saveButton}>
          <Save fontSize="small" />
        </IconButton>

      </div>
      <Divider />
      {localValues.map((val, index) => (
        <>
          {index === pickedValueId ? (
            <div style={styles.item}>
              <TextEditor
                value={val}
                {...handler.editing.textField}
              />
              <IconButton size='small' sx={styles.button} {...handler.editing.deleteButton}>
                <Delete fontSize='small' />
              </IconButton>
            </div>
          ) : (
            <MenuItem onClick={() => handler.item.onClick(index)}>{val}</MenuItem>
          )}
        </>
      ))}

      <IconButton sx={{ borderRadius: 0 }} size='small' {...handler.addButton}>
        <Add fontSize='small' />
      </IconButton>
    </Popover>
  );
};
