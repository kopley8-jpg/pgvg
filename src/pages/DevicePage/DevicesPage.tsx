import { useStyles } from './styles';
import { useEffect, useState } from 'react';
import { useThemeStore } from '@/shared/hooks/useThemeStore';
import { DeviceManagmentCard } from '@/widgets/DeviceManagmentCard/DeviceManagmentCard';
import type { DeviceType } from '@/shared/types/device';
import { subscribeToDevices } from '@/shared/api/firebase/devices';

export const DevicesPage = () => {
  const { colors } = useThemeStore();
  const styles = useStyles(colors);

  const [loading, setLoading] = useState(true);
  const [devices, setDevices] = useState<DeviceType[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToDevices((devices) => {
      setDevices(devices);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading || !devices || devices.length === 0) return <a>Загрузка...</a>;

  return (
    <div style={styles.container}>
      {devices.map((device) => (
        <DeviceManagmentCard key={device.id} device={device} />
      ))}
    </div>
  );
};
