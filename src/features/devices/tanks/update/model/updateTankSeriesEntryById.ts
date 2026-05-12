import database from '@/shared/api/firebase/client';
import { ref, update } from 'firebase/database';
import type { TankSeriesType } from '@/entities/tanks/model/types';
import type { IUpdateTankSeriesEntryById } from './updateTank.types';

export const updateTankSeriesEntryById = async <
  K extends keyof TankSeriesType,
>({
  id,
  entryName,
  newValue,
}: IUpdateTankSeriesEntryById<K>) => {
  const tankSeriesRef = ref(database, `/kochegar/platform/tanks/${id}`);

  alert(`id:${id}, entryName:${entryName}, newValue:${newValue}`);

  await update(tankSeriesRef, {
    [entryName]: newValue,
  });
};
