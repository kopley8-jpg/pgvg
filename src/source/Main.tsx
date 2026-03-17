import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import { toArray } from "./lib";
import type { CoilType, DeviceType, PodType, TankType } from "./model";
import { database } from "./firebase";

export default function Main() {
  const [devices, setDevices] = useState<(DeviceType & { id: string })[]>([]);
  const [pods, setPods] = useState<(PodType & { id: string })[]>([]);
  const [tanks, setTanks] = useState<(TankType & { id: string })[]>([]);
  const [coils, setCoils] = useState<(CoilType & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const kochegarRef = ref(database, "kochegar");
    onValue(
      kochegarRef,
      (snapshot) => {
        const data = snapshot.val();
        setDevices(toArray<DeviceType>(data.podiki));
        setPods(toArray<PodType>(data.platform.cartridges));
        setLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  if (loading) return <div className="loader">Загрузка...</div>;

  return (
    <div className="app">
      <div style={styles.container}>
        {devices.map((device, index) => (
          <Card pods={pods} key={index} device={device} />
        ))}
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: "100vw",
    maxWidth: "100%",
    minHeight: "100vh",
    backgroundColor: "#1a1a1a",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
  },
};
