import { useState } from 'react';
import type { IDeviceManagmentCard } from './types';
import type {
  CompactiblePlatType,
  DeviceKitType,
  SomethingElseInKitType,
} from '@/shared/types/device';
import { updateDevice } from '@/features/device-managment/update-device/update-device';
import type { IDeviceCard } from '@/entities/devices/ui/EditableDeviceCard/model/types';
import type {
  IPlatformPicker,
  SeriesItem,
} from '../ui/PlatformPicker/model/types';
import { removeDevice } from '@/features/device-managment/remove-device/remove-device';
import { uploadImageToImgBB } from '@/shared/api/imgbb/uploadImage';

export const useDeviceManagmentCard = ({ device }: IDeviceManagmentCard) => {
  const id = typeof device === 'object' ? device.id : device;

  const [clickedPlat, setClickedPlat] = useState<CompactiblePlatType | null>(
    null
  );

  const [clickedKitItem, setClickedKitItem] = useState<
    (Exclude<DeviceKitType, SomethingElseInKitType> & { id: number }) | null
  >(null);

  const [platformPickerProps, setPlatformPickerProps] = useState<{
    target: 'platform' | 'kit' | null;
    open: boolean;
    anchorEl: HTMLElement | null;
  }>({ open: false, anchorEl: null, target: null });

  const uiHandler: IUiHandler = {
    deviceCard: {
      onChange(key, value) {
        updateDevice(id, key, value);
      },
      onCompatiblePlatAdd(e) {
        setPlatformPickerProps({
          target: 'platform',
          open: true,
          anchorEl: e.currentTarget,
        });
      },
      onPlatItemClick(plat) {
        setClickedPlat(plat);
      },
      onAddKitItemMenuClick(e) {
        setPlatformPickerProps({
          target: 'kit',
          open: true,
          anchorEl: e.currentTarget,
        });
      },
      onKitItemClick(item) {
        setClickedKitItem(item);
      },
      onError(error) {
        alert(error);
      },
      onDeviceDelete() {
        removeDevice(id);
      },
      onPhotoAccept: async (file) => {
        await uploadImageToImgBB(file)
          .then((url) => {
            updateDevice(id, 'photoURL', url);
          })
          .catch(() => alert('не удалось загрузить фото'));
      },
    },
    platPreview: {
      onClose() {
        setClickedPlat(null);
      },
    },
    platformPicker: {
      onClose() {
        setPlatformPickerProps({ open: false, anchorEl: null, target: null });
      },
      onPick(item) {
        if (platformPickerProps.target === 'platform') {
          if (item.type === 'coil') return;
          const newCompatiblePlat: CompactiblePlatType = {
            ...item,
            idFromPlatforms: item.id,
          };
          updateDevice(id, 'platforms', (device) =>
            device.platforms.type === 'магнит'
              ? {
                  ...device.platforms,
                  compatiblePlats: [
                    ...device.platforms.compatiblePlats,
                    newCompatiblePlat,
                  ],
                }
              : device.platforms
          );
        } else if (platformPickerProps.target === 'kit') {
          updateDevice(id, 'kit', (device) => [
            ...device.kit,
            seriesItemToDeviceKitItem(item),
          ]);
        }
        setPlatformPickerProps({ open: false, target: null, anchorEl: null });
      },
    },
    editKitItemCardModal: {
      onClose() {
        setClickedKitItem(null);
      },
    },
    editKitItemCard: {
      onChange(newItem) {
        updateDevice(id, 'kit', (device) =>
          device.kit.map((item, index) =>
            item.type === 'something-else'
              ? item
              : item.idFromPlatforms === newItem.idFromPlatforms &&
                  item.type === newItem.type &&
                  newItem.id === index
                ? newItem
                : item
          )
        );
        setClickedKitItem(newItem);
      },
      onError(error) {
        alert(error);
      },
    },
  };

  return {
    platformPickerProps,
    clickedPlat,
    clickedKitItem,
    id,
    uiHandler,
  };
};

type IUiHandler = {
  deviceCard: Partial<IDeviceCard>;
  platPreview: { onClose: () => void };
  platformPicker: Partial<IPlatformPicker>;
  editKitItemCardModal: { onClose: () => void };
  editKitItemCard: {
    onChange: (
      newItem: Exclude<DeviceKitType, SomethingElseInKitType> & { id: number }
    ) => void;
    onError: (error: string) => void;
  };
};

const seriesItemToDeviceKitItem = (series: SeriesItem): DeviceKitType => {
  switch (series.type) {
    case 'pod':
      return {
        type: 'pod',
        name: series.name,
        idFromPlatforms: series.id,
        resistance: series.ohms[0],
        capacity: series.capacity[0],
        count: 1,
      };
    case 'tank':
      return {
        type: 'tank',
        name: series.name,
        idFromPlatforms: series.id,
        capacity: series.capacity[0],
        count: 1,
      };
    case 'coil':
      return {
        type: 'coil',
        name: series.name,
        resistance: series.ohms[0],
        idFromPlatforms: series.id,
        count: 1,
      };
  }
};
