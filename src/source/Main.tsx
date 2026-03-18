import { onValue, push, ref, update } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { Card } from './Card/Card';
import { toArray } from './lib';
import type {
  CoilInContainType,
  CoilType,
  DeviceType,
  PodType,
  TankType,
} from './model';
import { database } from './firebase';

export default function Main() {
  const [devices, setDevices] = useState<(DeviceType & { id: string })[]>([]);
  const [pods, setPods] = useState<(PodType & { id: string })[]>([]);
  const [tanks, setTanks] = useState<(TankType & { id: string })[]>([]);
  const [coils, setCoils] = useState<(CoilType & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const kochegarRef = ref(database, 'kochegar');
    onValue(
      kochegarRef,
      (snapshot) => {
        const data = snapshot.val();
        const newPods = toArray<PodType>(data.platform.cartridges);
        const dataTanks = toArray<
          Omit<TankType, 'coils'> & { coils: string[] }
        >(data.platform.tanks);
        const newCoils = toArray<CoilType>(data.platform.coils);
        const dataDevice = toArray<
          Omit<DeviceType, 'platforms' | 'coilsInContain'> & {
            platforms: string[];
            coilsInContain: '' | CoilInContainType[];
          }
        >(data.podiki);

        const newTanks: TankType[] = dataTanks.map((tank) => ({
          ...tank,
          coils: tank.coils
            .map((name) => newCoils.filter((coil) => coil.name === name))
            .flat(),
        }));

        const newDevices: DeviceType[] = dataDevice.map((device) => ({
          ...device,
          platforms: device.platforms
            .map((name) => [
              ...newPods
                .filter((pod) => pod.name === name)
                .map((pod) => {
                  const type: 'tank' | 'pod' = 'pod';
                  return { ...pod, type: type };
                }),
              ...newTanks
                .filter((tank) => tank.name === name)
                .map((pod) => {
                  const type: 'tank' | 'pod' = 'tank';
                  return { ...pod, type: type };
                }),
            ])
            .flat(),
          coilsInContain:
            typeof device.coilsInContain === 'string'
              ? []
              : device.coilsInContain,
        }));

        setPods(newPods);
        setTanks(newTanks);
        setCoils(newCoils);
        setDevices(newDevices);

        console.log(newDevices);
        setLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  if (loading) return <div className="loader">Загрузка...</div>;

  return (
    <div style={styles.container}>
      {devices.map((device, index) => (
        <Card pods={pods} key={index} device={device} />
      ))}
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: '#d6d6d6',

    width: '100vw',
    height: '100vh',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    gap: '16px',

    overflowY: 'auto',
  },
};
