import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { IDevicesStore } from '../types';
import { subscribeToDevices } from '@/shared/api/firebase/devices';

export const useDevicesStore = create<IDevicesStore>()(
  immer((set, get) => ({
    devices: [],
    loading: false,
    error: null,

    unsubscribe: null,

    subscribeToDevices: () => {
      if (get().unsubscribe) return;

      set({ loading: true });
      const unsubscribe = subscribeToDevices((devices) => {
        set({ devices, loading: false });
      });

      set({
        unsubscribe: () => {
          unsubscribe();
          set({ devices: [], loading: false, unsubscribe: null });
        },
      });
    },

    unsubscribeFromDevices: () => {
      const { unsubscribe } = get();

      if (unsubscribe) {
        unsubscribe();
      }
    },
    clearError: () => {},
  }))
);
