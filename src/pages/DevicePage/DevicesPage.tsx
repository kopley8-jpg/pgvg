import { useThemeStore } from '@/shared/hooks/useThemeStore';
import { useStyles } from './styles';
import { useEffect } from 'react';
import { useDevicesStore } from '@/entities/devices/model/store/devicesStore';
import { DeviceCard } from '@/widgets/DeviceCard/DeviceCard';

export const DevicesPage = () => {
  const styles = useStyles();
  const { toggleTheme } = useThemeStore();

  const { devices, loading, subscribeToDevices, unsubscribeFromDevices } =
    useDevicesStore();

  useEffect(() => {
    subscribeToDevices();

    return () => {
      unsubscribeFromDevices();
    };
  }, []);

  if (loading || !devices || devices.length === 0) return <a>Загрузка...</a>;

  return (
    <div style={styles.container}>
      {devices.map(device => (
        <DeviceCard key={device.id} device={device} />
      ))}
    </div>
  );
};
