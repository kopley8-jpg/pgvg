import { Chip, Typography } from '@mui/material';
import { useState } from 'react';
import { ArrayPrimitiveValueEditor } from './ArrayPrimitiveValueEditor/ArrayPrimitiveValueEditor';
import { useStyles } from './styles';

interface IArrayPrimitiveValue {
  value?: (string | number)[];
  onChangesSaved: (newValue: (string | number)[]) => void;
  onClick?: () => void;
  errorOptions?: {
    errorText: string,
    errorTextFontSize: any,
    onErrorTextClick: () => void
  }
}

export const ArrayPrimitiveValue = ({
  value,
  onClick,
  onChangesSaved,
  errorOptions
}: IArrayPrimitiveValue) => {
  const [isOpen, setIsOpen] = useState(false);

  const styles = useStyles();

  const handleChangesSaved = (newValue: (string | number)[]) => {
    onChangesSaved(newValue);
    setIsOpen(false);
  };

  return (
    <>
      {value ?
        (<>
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
        </>) : (
          <>
            <span
              onClick={() => errorOptions?.onErrorTextClick?.()}>
              {errorOptions ? errorOptions.errorText : "undefined"}
            </span>
          </>
        )}
    </>
  );
};
