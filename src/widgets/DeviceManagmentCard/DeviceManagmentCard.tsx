import { DeviceCard } from '@/entities/devices/ui/EditableDeviceCard/EditableDeviceCard';
import { useThemeStore } from '@/shared/hooks/useThemeStore';
import type { CompactiblePlatType, DeviceType } from '@/shared/types/device';
import { CompatiblePlatPicker } from './ui/CompatiblePlatPicker/CompatiblePlatPicker';
import { useState } from 'react';
import { Modal } from '@mui/material';
import { PodSeriesCard } from '@/entities/pods/ui/PodSeriesCard/EditablePodSeriesCard';
import { PodManagmentCard } from '../PodManagmentCard/PodManagmentCard';

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

  return (
    <>
      <DeviceCard
        device={device}
        onChange={() => {}}
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
        <></>
      )}
    </Modal>
  );
};
