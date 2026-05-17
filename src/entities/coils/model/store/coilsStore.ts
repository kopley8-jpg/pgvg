// import { create } from 'zustand';
// import { immer } from 'zustand/middleware/immer';
// import type { ICoilSeriesesStore } from '../types';
// import { DataSnapshot, off, onValue, ref } from 'firebase/database';
// import database from '@shared/api/firebase/client';

// export const useCoilSeriesesStore = create<ICoilSeriesesStore>()(
//   immer((set, get) => ({
//     coilSerieses: [],
//     loadingCoils: false,
//     error: null,

//     unsubscribe: null,

//     subscribeToCoils: () => {
//       if (get().unsubscribe) {
//         return;
//       }

//       set({ loadingCoils: true, error: null });

//       const coilSeriesesRef = ref(database, '/kochegar/platform/coils');

//       const handler = (snaphot: DataSnapshot) => {
//         const data = snaphot.val();
//         console.log('data', data);

//         const coilSerieses: CoilSeriesType[] = data
//           ? Object.entries(data).map(([key, value]) => ({
//               ...(value as CoilSeriesType),
//               id: key,
//             }))
//           : [];

//         set({
//           coilSerieses,
//           loadingCoils: false,
//           error: null,
//         });
//       };

//       onValue(coilSeriesesRef, handler);

//       set({
//         unsubscribe: () => {
//           off(coilSeriesesRef, 'value', handler);
//           set({ coilSerieses: [], loadingCoils: false, unsubscribe: null });
//         },
//       });
//     },

//     unsubscribeFromCoils: () => {
//       const { unsubscribe } = get();

//       if (unsubscribe) {
//         unsubscribe();
//       }
//     },
//     clearError: () => {},
//   }))
// );
