import { useStyles } from './styles';
import { useEffect } from 'react';
import { useDevicesStore } from '@/entities/devices/model/store/devicesStore';
import { DeviceCard } from '@/entities/devices/ui/EditableDeviceCard/EditableDeviceCard';
import { useThemeStore } from '@/shared/hooks/useThemeStore';
import { DeviceManagmentCard } from '@/widgets/DeviceManagmentCard/DeviceManagmentCard';

export const DevicesPage = () => {
  const { colors } = useThemeStore()
  const styles = useStyles(colors);
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
        <DeviceManagmentCard device={device} />
      ))}
    </div>
  );
};
