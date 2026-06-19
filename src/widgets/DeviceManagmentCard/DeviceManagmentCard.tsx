import { DeviceCard } from '@/entities/devices/ui/EditableDeviceCard/EditableDeviceCard';
import { useThemeStore } from '@/shared/hooks/useThemeStore';
import { Modal } from '@mui/material';
import type { IDeviceManagmentCard } from './model/types';
import { useDeviceManagmentCard } from './model/useDeviceManagmentCard';
import { PlatformPicker } from './ui/PlatformPicker/PlatformPicker';
import { modalStyles } from '@/shared/constants/styles';
import { EditKitItemCard } from './ui/EditKitItemCard/EditKitItemCard';
import { PlatPreviewModal } from './ui/PlatPreviewModal/PlatPreviewModal';

export const DeviceManagmentCard = ({ device }: IDeviceManagmentCard) => {
  const { colors } = useThemeStore();

  const { platformPickerProps, clickedPlat, clickedKitItem, uiHandler } =
    useDeviceManagmentCard({ device });

  return (
    <>
      <DeviceCard device={device} colors={colors} {...uiHandler.deviceCard} />
      <PlatPreviewModal plat={clickedPlat} {...uiHandler.platPreview} />
      <PlatformPicker
        {...platformPickerProps}
        {...uiHandler.platformPicker}
        showedPlatforms={
          platformPickerProps.target === 'kit'
            ? ['pods', 'tanks', 'coils']
            : ['pods', 'tanks']
        }
      />
      <Modal
        sx={modalStyles}
        open={Boolean(clickedKitItem)}
        {...uiHandler.editKitItemCardModal}
      >
        <EditKitItemCard
          item={clickedKitItem!}
          colors={colors}
          {...uiHandler.editKitItemCard}
        />
      </Modal>
    </>
  );
};



