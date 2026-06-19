import { useState } from 'react';
import type { IArrayPrimitiveValueEditor } from './types';
import type { PopupState } from 'material-ui-popup-state/hooks';

export const useArrayPrimitiveValueEditor = (
  props: IArrayPrimitiveValueEditor
) => {
  const { value, menuProps, onSaveButtonClick } = props;

  const [localValues, setLocalValues] = useState<(string | number)[]>(value);

  const createHandler = () => {
    return {
      editing: (id: number, state: PopupState) => ({
        textField: {
          onSaveButtonPress: (newValue: string | number) => {
            setLocalValues((prev) =>
              prev.map((val, index) => (index === id ? newValue : val))
            );
            state.close();
          },
        },
        deleteButton: {
          onClick: () => {
            setLocalValues((prev) => prev.filter((_val, index) => index != id));
          },
        },
      }),
      addButton: {
        onClick: () => {
          setLocalValues((prev) => [...prev, '?']);
        },
      },
      saveButton: {
        onClick: () => {
          onSaveButtonClick(localValues);
          menuProps.onClose?.({}, 'backdropClick');
        },
      },
      exitButton: {
        onClick: () => {
          menuProps.onClose?.({}, 'backdropClick');
        },
      },
    };
  };

  return {
    localValues,
    createHandler,
  };
};
