import { Chip, Typography } from '@mui/material';
import { useState } from 'react';
import { ArrayPrimitiveValueEditor } from './ArrayPrimitiveValueEditor/ArrayPrimitiveValueEditor';
import { useStyles } from './styles';

interface IArrayPrimitiveValue {
  value: (string | number)[];
  onChangesSaved: (newValue: (string | number)[]) => void;
  onClick?: () => void;
}

export const ArrayPrimitiveValue = ({
  value,
  onClick,
  onChangesSaved,
}: IArrayPrimitiveValue) => {
  const [isOpen, setIsOpen] = useState(false);

  const styles = useStyles();

  const handleChangesSaved = (newValue: (string | number)[]) => {
    onChangesSaved(newValue);
    setIsOpen(false);
  };

  return (
    <>
      {isOpen ? (
        <ArrayPrimitiveValueEditor
          value={value}
          onSaveButtonClick={handleChangesSaved}
          onCancelButtonClick={() => setIsOpen(false)}
        />
      ) : (
        <div
          onClick={() => {
            setIsOpen(true);
          }}
          style={styles.container}
        >
          <span style={styles.text}>{value.join(', ')}</span>
        </div>
      )}
    </>
  );
};
