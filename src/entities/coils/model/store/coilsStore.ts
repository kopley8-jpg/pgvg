import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { ICoilSeriesesStore } from '../types';
import { subscribeToCoils } from '@/shared/api/firebase/coils';

export const useCoilSeriesesStore = create<ICoilSeriesesStore>()(
  immer((set, get) => ({
    coilSerieses: [],
    loadingCoils: false,
    error: null,

    unsubscribe: null,

    subscribeToCoils: () => {
      if (get().unsubscribe) {
        return;
      }

      set({ loadingCoils: true });

      const unsubscribe = subscribeToCoils((coilSerieses) => {
        set({
          coilSerieses,
          loadingCoils: false,
        });
      });

      set({
        unsubscribe: () => {
          unsubscribe();
          set({ coilSerieses: [], loadingCoils: false, unsubscribe: null });
        },
      });
    },

    unsubscribeFromCoils: () => {
      const { unsubscribe } = get();

      if (unsubscribe) {
        unsubscribe();
      }
    },

    clearError: () => {},
  }))
);
