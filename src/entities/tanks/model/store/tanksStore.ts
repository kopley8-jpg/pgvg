import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { IPodSeriesesStore, TankSeriesType } from '../types';
import { DataSnapshot, off, onValue, ref } from 'firebase/database';
import database from '@shared/api/firebase/client';

export const useTanksSeriesesStore = create<IPodSeriesesStore>()(
  immer((set, get) => ({
    tankSerieses: [],
    loadingTanks: false,
    error: null,

    unsubscribe: null,

    subscribeToTanks: () => {
      if (get().unsubscribe) {
        return;
      }

      set({ loadingTanks: true, error: null });

      const tankSeriesesRef = ref(database, '/kochegar/platform/tanks');

      const handler = (snaphot: DataSnapshot) => {
        const data = snaphot.val();
        console.log('data', data);

        const tankSerieses: TankSeriesType[] = data
          ? Object.entries(data).map(([key, value]) => ({
              ...(value as TankSeriesType),
              id: key,
              capacities: Array.isArray((value as TankSeriesType).capacities)
                ? (value as TankSeriesType).capacities
                : [(value as any).capacities as string],
            }))
          : [];

        set({
          tankSerieses,
          loadingTanks: false,
          error: null,
        });
      };

      onValue(tankSeriesesRef, handler);

      set({
        unsubscribe: () => {
          off(tankSeriesesRef, 'value', handler);
          set({ tankSerieses: [], loadingTanks: false, unsubscribe: null });
        },
      });
    },

    unsubscribeFromTanks: () => {
      const { unsubscribe } = get();

      if (unsubscribe) {
        unsubscribe();
      }
    },
    clearError: () => {},
  }))
);
