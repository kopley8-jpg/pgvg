import { DeviceCard } from '@/entities/devices/ui/EditableDeviceCard/EditableDeviceCard';
import { useThemeStore } from '@/shared/hooks/useThemeStore';
import type { CompactiblePlatType, DeviceType } from '@/shared/types/device';
import { CompatiblePlatPicker } from './ui/CompatiblePlatPicker/CompatiblePlatPicker';
import { useState } from 'react';
import { Modal } from '@mui/material';
import { PodManagmentCard } from '../PodManagmentCard/PodManagmentCard';
import { TankManagmentCard } from '../TankManagmentCard/TankManagmentCard';
import { pushCompactiblePlat } from '@/features/pod-managment/update-pod-series/update-pod-series';
import { updateDevice } from '@/features/device-managment/update-device/update-device';

export const DeviceManagmentCard = ({
  device,
}: {
  device: DeviceType | string;
}) => {
  const { colors } = useThemeStore();

  const [compatiblePlatPickerProps, setCompatiblePlatPickerProps] = useState<{
    open: boolean;
    anchorEl: HTMLElement | null;
  }>({
    open: false,
    anchorEl: null,
  });

  const [clickedPlat, setClickedPlat] = useState<CompactiblePlatType | null>(
    null
  );

  const id = typeof device === 'object' ? device.id : device;

  return (
    <>
      <DeviceCard
        device={device}
        onChange={(key, val) => {
          updateDevice(id, key, val);
        }}
        onCompatiblePlatAdd={(e) => {
          setCompatiblePlatPickerProps((prev) => ({
            ...prev,
            open: true,
            anchorEl: e.currentTarget,
          }));
        }}
        onPlatItemClick={(plat) => {
          setClickedPlat(plat);
        }}
        onError={(err) => {
          alert(err);
        }}
        colors={colors}
      />
      <CompatiblePlatPicker
        {...compatiblePlatPickerProps}
        onClose={() =>
          setCompatiblePlatPickerProps((prev) => ({ ...prev, open: false }))
        }
        onPick={(plat) => {
          pushCompactiblePlat(id, plat);
        }}
      />
      <PlatPreview plat={clickedPlat} onClose={() => setClickedPlat(null)} />
    </>
  );
};

const PlatPreview = ({
  plat,
  onClose,
}: {
  plat: CompactiblePlatType | null;
  onClose: () => void;
}) => {
  if (!plat) return <></>;
  return (
    <Modal
      open={Boolean(plat)}
      onClose={() => onClose()}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {plat.type === 'pod' ? (
        <PodManagmentCard podSeries={plat.idFromPlatforms} />
      ) : (
        <TankManagmentCard tankSeries={plat.idFromPlatforms} />
      )}
    </Modal>
  );
};
