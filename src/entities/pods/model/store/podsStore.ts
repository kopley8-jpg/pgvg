import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { IPodSeriesesStore, PodSeriesType } from '../types';
import { DataSnapshot, off, onValue, ref } from 'firebase/database';
import database from '@shared/api/firebase/client';

export const usePodSeriesesStore = create<IPodSeriesesStore>()(
  immer((set, get) => ({
    podSerieses: [],
    loading: false,
    error: null,

    unsubscribe: null,

    subscribeToPods: () => {
      if (get().unsubscribe) {
        return;
      }

      set({ loading: true, error: null });

      const podsSeriesesRef = ref(database, '/kochegar/platform/cartridges');

      const handler = (snaphot: DataSnapshot) => {
        const data = snaphot.val();
        console.log('data', data);

        const podSerieses: PodSeriesType[] = data
          ? Object.entries(data).map(([key, value]) => ({
              ...(value as PodSeriesType),
              id: key,
            }))
          : [];

        set({
          podSerieses,
          loading: false,
          error: null,
        });
      };

      onValue(podsSeriesesRef, handler);

      set({
        unsubscribe: () => {
          off(podsSeriesesRef, 'value', handler);
          set({ podSerieses: [], loading: false, unsubscribe: null });
        },
      });
    },

    unsubscribeFromPods: () => {
      const { unsubscribe } = get();

      if (unsubscribe) {
        unsubscribe();
      }
    },
    clearError: () => {},
  }))
);
