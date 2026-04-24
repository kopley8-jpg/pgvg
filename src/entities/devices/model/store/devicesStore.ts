import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { DeviceType, IDevicesStore } from '../types';
import { DataSnapshot, off, onValue, ref } from 'firebase/database';
import database from '@shared/api/firebase/client';

export const useDevicesStore = create<IDevicesStore>()(
  immer((set, get) => ({
    devices: [],
    loading: false,
    error: null,

    unsubscribe: null,

    subscribeToDevices: () => {
      if (get().unsubscribe) {
        return;
      }

      set({ loading: true, error: null });

      const podsSeriesesRef = ref(database, '/kochegar/devices');

      const handler = (snaphot: DataSnapshot) => {
        const data = snaphot.val();
        console.log('data', data);

        const devices: DeviceType[] = data
          ? Object.entries(data).map(([key, value]) => ({
              ...(value as DeviceType),
              id: key,
            }))
          : [];

        set({
          devices,
          loading: false,
          error: null,
        });
      };

      onValue(podsSeriesesRef, handler);

      set({
        unsubscribe: () => {
          off(podsSeriesesRef, 'value', handler);
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

const checkThePropAtObj = <K extends string, Type>(
  obj: unknown,
  propName: K
): obj is Record<K, Type> => {
  if (obj && typeof obj === 'object' && propName in obj) {
    return true;
  } else {
    return false;
  }
};
