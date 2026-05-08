import { useState } from 'react';
import type { IArrayPrimitiveValueEditor } from './types';

export const useArrayPrimitiveValueEditor = (
  props: IArrayPrimitiveValueEditor
) => {
  const { value, onClose, onSaveButtonClick } = props;

  const [localValues, setLocalValues] = useState<(string | number)[]>(value);
  const [pickedValueId, setPickedValueId] = useState<number | null>(null);

  const createHandler = () => {
    return {
      item: {
        onClick: (index: number) => {
          setPickedValueId(index);
        },
      },
      editing: {
        textField: {
          onCancelButtonPress: () => {
            setPickedValueId(null);
          },
          onSaveButtonPress: (newValue: string | number) => {
            setLocalValues((prev) =>
              prev.map((val, index) =>
                index === pickedValueId ? newValue : val
              )
            );
            setPickedValueId(null);
          },
        },
        deleteButton: {
          onClick: () => {
            setLocalValues((prev) =>
              prev.filter((_val, index) => index != pickedValueId)
            );
          },
        },
      },
      addButton: {
        onClick: () => {
          setLocalValues((prev) => [...prev, '?']);
        },
      },
      saveButton: {
        onClick: () => {
          onSaveButtonClick(localValues);
        },
      },
      exitButton: {
        onClick: () => onClose(),
      },
    };
  };

  return {
    localValues,
    pickedValueId,
    createHandler,
  };
};
