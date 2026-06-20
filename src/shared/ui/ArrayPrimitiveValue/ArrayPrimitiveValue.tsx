import { ArrayPrimitiveValueEditor } from './ArrayPrimitiveValueEditor/ArrayPrimitiveValueEditor';
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state';

interface IArrayPrimitiveValue {
  value?: (string | number)[] | null;
  style?: ArrPrimitiveValueStyles;
  onChangesSaved: (newValue: (string | number)[]) => void;
  onClick?: () => void;
  errorOptions?: {
    errorText: string;
    errorTextFontSize: any;
    onErrorTextClick: () => void;
  };
}

export type ArrPrimitiveValueStyles = {
  value?: React.CSSProperties;
  popupContainer?: React.CSSProperties;
  popupIcons?: React.CSSProperties;
  popupItem?: React.CSSProperties;
};

export const ArrayPrimitiveValue = ({
  value,
  style,
  onChangesSaved,
}: IArrayPrimitiveValue) => {
  const handleChangesSaved = (newValue: (string | number)[]) => {
    onChangesSaved(
      newValue.sort((a, b) => {
        const numA = Number(a);
        const numB = Number(b);
        return numA - numB;
      })
    );
  };

  return (
    <PopupState variant="popover">
      {(state) => (
        <>
          <ArrayPrimitiveValueEditor
            menuProps={{ ...bindMenu(state) }}
            value={value ? value : []}
            onSaveButtonClick={handleChangesSaved}
          />
          <span {...bindTrigger(state)} style={{ ...style?.value }}>
            {Boolean(value) && value && value.length > 0
              ? value.join(', ')
              : 'значение?'}
          </span>
        </>
      )}
    </PopupState>
  );
};
