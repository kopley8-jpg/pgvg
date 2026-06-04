import { IconButton, TextField } from '@mui/material';
import { Cancel, Save } from '@mui/icons-material';
import { useStyles } from './styles';
import React, { useState } from 'react';

interface IPrimitiveValueEditor {
  keyName?: string;
  value: string | number;
  style?: React.CSSProperties;
  onSaveButtonPress?: (newValue: string | number) => void;
  onCancelButtonPress?: () => void;
}

export const TextEditor = ({
  keyName,
  value,
  style,
  onCancelButtonPress,
  onSaveButtonPress,
}: IPrimitiveValueEditor) => {
  const styles = useStyles();
  const [localValue, setLocalValue] = useState(value);

  return (
    <div style={{ ...styles.container, ...style }}>
      <TextField
        onChange={(p) => {
          setLocalValue(p.target.value);
        }}
        variant="outlined"
        {...(keyName ? { label: keyName } : {})}
        slotProps={{
          input: {
            endAdornment: (
              <IconButton
                size="small"
                style={styles.button}
                onClick={() => {
                  if (localValue === '') return;
                  onSaveButtonPress?.(localValue);
                }}
              >
                <Save fontSize="small" />
              </IconButton>
            ),
          },
        }}
        sx={styles.TextField}
        value={localValue}
      />
      <IconButton
        size="small"
        style={styles.button}
        onClick={() => onCancelButtonPress?.()}
      >
        <Cancel fontSize="small" />
      </IconButton>
    </div>
  );
};
