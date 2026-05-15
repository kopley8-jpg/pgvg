import { useState } from 'react';
import type { ICompactiblePlatsEntry } from './types';
import type { PodSeriesType } from '@/entities/pods/model/types';
import type { TankSeriesType } from '@/entities/tanks/model/types';
import type { CompactiblePlatType } from '@/entities/devices/model/types';

export const useCompatiblePlatsEntry = ({
  compactiblePlats,
  onChange,
  deviceId,
}: ICompactiblePlatsEntry) => {
  const [openPlat, setOpenPlat] = useState<{
    type: 'pod' | 'tank';
    id: string;
  } | null>(null);

  const [openAddPlatMenu, setOpenAddPlatMenu] = useState(false);

  const handlePlatPick = (type: 'pod' | 'tank', id: string) => {
    setOpenPlat({ type, id });
  };

  const handleBackdropModalClick = () => {
    setOpenPlat(null);
  };

  const handlePlatItemDeleteButtonClick = (id: string) => {
    onChange(
      compactiblePlats
        ? compactiblePlats.filter((plat) => plat.idFromPlatforms != id)
        : []
    );
    alert(id);
  };

  const handleAddCompactiblePlatBittonClick = () => {
    setOpenAddPlatMenu(true);
  };

  const handleNewPlatPicked = (
    newSeries:
      | {
          type: 'pod';
          series: PodSeriesType;
        }
      | {
          type: 'tank';
          series: TankSeriesType;
        }
  ) => {
    const newPlat: CompactiblePlatType = {
      type: newSeries.type,
      name: newSeries.series.name,
      idFromPlatforms: newSeries.series.id,
    };
    if (!compactiblePlats?.every((plat) => plat.name !== newPlat.name)) {
      alert('');
    } else {
      onChange([...(compactiblePlats ? compactiblePlats : []), newPlat]);
    }
  };

  return {
    openPlat,
    openAddPlatMenu,
    handlePlatPick,
    handleBackdropModalClick,
    handlePlatItemDeleteButtonClick,
    handleAddCompactiblePlatBittonClick,
    handleNewPlatPicked,
  };
};
