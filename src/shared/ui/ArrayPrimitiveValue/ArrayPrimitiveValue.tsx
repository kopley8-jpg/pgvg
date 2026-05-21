import { Chip, Typography } from '@mui/material';
import { useState, useRef } from 'react';
import { ArrayPrimitiveValueEditor } from './ArrayPrimitiveValueEditor/ArrayPrimitiveValueEditor';
import { useStyles } from './styles';
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state';

interface IArrayPrimitiveValue {
  value?: (string | number)[] | null;
  style?: ArrPrimitiveValueStyles
  onChangesSaved: (newValue: (string | number)[]) => void;
  onClick?: () => void;
  errorOptions?: {
    errorText: string;
    errorTextFontSize: any;
    onErrorTextClick: () => void;
  };
}

export type ArrPrimitiveValueStyles = {
  value?: React.CSSProperties,
  popupContainer?: React.CSSProperties,
  popupIcons?: React.CSSProperties,
  popupItem?: React.CSSProperties,
}

export const ArrayPrimitiveValue = ({
  value,
  style,
  onClick,
  onChangesSaved,
  errorOptions,
}: IArrayPrimitiveValue) => {
  const [isOpen, setIsOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  const styles = useStyles();

  const handleChangesSaved = (newValue: (string | number)[]) => {
    onChangesSaved(newValue);
    setIsOpen(false);
  };

  return (
    <>
      {value ? (
        <PopupState variant='popover'>
          {state => (
            <>
              <ArrayPrimitiveValueEditor
                menuProps={{ ...bindMenu(state) }}
                value={value}
                onSaveButtonClick={handleChangesSaved}
              />
              <span {...bindTrigger(state)} style={{ ...styles.text, ...style?.value }}>{value.join(', ')}</span>
            </>
          )}
        </PopupState>
      ) : (
        <>
          <span onClick={() => errorOptions?.onErrorTextClick?.()}>
            {errorOptions ? errorOptions.errorText : 'undefined'}
          </span>
        </>
      )}
    </>
  );
};
