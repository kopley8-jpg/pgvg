import { useStyles } from './styles';
import React, { useState } from 'react';
import {
  IconButton,
  Popover,
  TextField,
  type PopoverProps,
} from '@mui/material';
import { Save, Cancel } from '@mui/icons-material';
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state';

interface IPrimitiveValueEditor {
  value?: string | number | null;
  fontSize?: any;
  style?: React.CSSProperties;
  onSaveButtonPress?: (newValue: string | number) => void;
  errorOptions?: {
    errorText: string;
    onErrorTextClick: () => void;
  };
}

export const TextValue = ({
  value,
  onSaveButtonPress,
  fontSize,
}: IPrimitiveValueEditor) => {
  const styles = useStyles();

  return (
    <PopupState variant="popover">
      {(state) => (
        <>
          <TextEditorTwo
            {...bindMenu(state)}
            value={value ? value : 'значение?'}
            onChangesSave={(e) => onSaveButtonPress?.(e)}
          />
          <span
            style={{
              ...styles.text,
              fontSize: fontSize ? fontSize : undefined,
            }}
            {...bindTrigger(state)}
          >
            {value ? value.toString() : 'значение?'}
          </span>
        </>
      )}
    </PopupState>
  );
};

type ITextEditor = {
  onChangesSave: (text: string) => void;
  value: string | number;
} & PopoverProps;

export const TextEditorTwo = (props: ITextEditor) => {
  const { value, onChangesSave, onClose } = props;
  const [localValue, setLocalValue] = useState(value);

  return (
    <Popover
      {...props}
      slotProps={{
        paper: {
          style: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          },
        },
      }}
      transformOrigin={{ horizontal: 'left', vertical: 'center' }}
      anchorOrigin={{ horizontal: 'left', vertical: 'center' }}
    >
      <TextField
        onChange={(p) => setLocalValue(p.target.value)}
        size="small"
        variant="outlined"
        slotProps={{
          root: {
            style: {
              maxWidth: '200px',
            },
          },
          input: {
            endAdornment: (
              <IconButton
                size="small"
                onClick={() => {
                  onChangesSave(localValue.toString());
                  onClose?.({}, 'backdropClick');
                }}
              >
                <Save fontSize="small" />
              </IconButton>
            ),
          },
        }}
        value={localValue}
      />
      <IconButton size="small" onClick={() => onClose?.({}, 'backdropClick')}>
        <Cancel fontSize="small" />
      </IconButton>
    </Popover>
  );
};
