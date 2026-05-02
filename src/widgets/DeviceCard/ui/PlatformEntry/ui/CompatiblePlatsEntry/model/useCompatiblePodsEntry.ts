import { useState } from 'react';
import type { ICompactiblePlatsEntry } from './types';

interface IUseCompatiblePlatsEntry {}

export const useCompatiblePlatsEntry = ({
  compactiblePlats,
  onChange,
}: ICompactiblePlatsEntry) => {
  const [openPlat, setOpenPlat] = useState<{
    type: 'pod' | 'tank';
    id: number;
  } | null>(null);

  const [openAddPlatMenu, setOpenAddPlatMenu] = useState(false);

  const handlePlatPick = (type: 'pod' | 'tank', id: number) => {
    setOpenPlat({ type, id });
  };

  const handleBackdropModalClick = () => {
    setOpenPlat(null);
  };

  const handlePlatItemDeleteButtonClick = (id: number) => {
    onChange(
      compactiblePlats
        ? compactiblePlats.filter((plat) => plat.idFromPlatforms != id)
        : []
    );
  };

  const handleAddCompactiblePlatBittonClick = () => {
    setOpenAddPlatMenu(true);
  };

  return {
    openPlat,
    openAddPlatMenu,
    handlePlatPick,
    handleBackdropModalClick,
    handlePlatItemDeleteButtonClick,
    handleAddCompactiblePlatBittonClick,
  };
};
