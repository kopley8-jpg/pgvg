import { useState } from 'react';
import type { ICompactibleCoilSeriesesEntry } from './types';

export const useCompatibleCoilSeriesesEntry = (
  props: ICompactibleCoilSeriesesEntry
) => {
  const [clickedCoilSeriesId, setClickedCoilSeriesId] = useState<string | null>(
    null
  );

  const handler = {
    coilItem: {
      onClick: (id: string) => {
        setClickedCoilSeriesId(id);
      },
      onDeleteButtonClick: (id: string) => {},
    },
    coilSeriesCardModal: {
      onClose: () => {
        setClickedCoilSeriesId(null);
      },
    },
  };

  return {
    clickedCoilSeriesId,
    handler,
  };
};
