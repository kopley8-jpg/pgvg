import database from '@/shared/api/firebase/client';
import type { DeviceType } from '@/shared/types/device';
import { ref } from 'firebase/database';

// export const pushDevice = async (device?:Omit<DeviceType, "id">) => {
//   const devicesRef = ref(database, "kochegar/devices")
//   await pushDevice(devicesRef, device?device:)
// }

// const newDevice:Omit<DeviceType, "id"> = {
//   photoURL:'',
//   brand:"бренд?",
//   model:"модель?",
//   modes:["режимы?"],
//   features:["фичи?"],
//   screen:"нет",
//   battery:{type:"встроенный", capacity:0},
//   minCoilResistance:1,
//   platforms:{
//     type:"магнит",
//     adjustmentAirflow:false,
//     compatiblePlats:[

//     ]
//   },
// }
