import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { DataSnapshot, off, onValue, ref } from 'firebase/database';
import database from '@shared/api/firebase/client';
import type { IPodSeriesesStore } from '../types';
import type { PodSeriesType } from '@/shared/types/pod-series';

export const usePodSeriesesStore = create<IPodSeriesesStore>()(
  immer((set, get) => ({
    podSerieses: [],
    loadingPods: false,
    error: null,

    unsubscribe: null,

    subscribeToPods: () => {
      if (get().unsubscribe) {
        return;
      }

      set({ loadingPods: true, error: null });

      const podsSeriesesRef = ref(database, '/kochegar/platform/pods');

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
          loadingPods: false,
          error: null,
        });
      };

      onValue(podsSeriesesRef, handler);

      set({
        unsubscribe: () => {
          off(podsSeriesesRef, 'value', handler);
          set({ podSerieses: [], loadingPods: false, unsubscribe: null });
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
