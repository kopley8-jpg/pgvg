import type { ISeriesCard } from './types';

export const useSeriesCard = (props: ISeriesCard) => {
  const { podSeries, onChange, onSave, onExit } = props;

  const handler = {
    header: {
      textField: {
        onSaveButtonPress: (newValue: string | number) => {
          onChange({ ...podSeries, name: newValue.toString() });
        },
      },
      exitButton: {
        onClick: () => onExit?.(),
      },
      saveButton: {
        onClick: () => onSave?.(),
      },
    },
    arrayPrimitiveValue: {
      onSaveButtonPress: (
        key: 'capacity' | 'ohms',
        newValue: (string | number)[]
      ) => {
        if (newValue.every((val) => isNaN(Number(val)))) {
          alert('так не пойдет');
          return;
        }
        onChange({ ...podSeries, [key]: newValue });
      },
    },
  };

  return {
    handler,
  };
};
