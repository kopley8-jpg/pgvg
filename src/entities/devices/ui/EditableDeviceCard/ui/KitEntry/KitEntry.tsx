import type { colors as cols } from '@/shared/constants/colors';
import {
  modalStyles,
  ObjCardStyles,
  ObjEntryStyles,
} from '@/shared/constants/styles';
import { createRenderConfig } from '@/shared/lib/createRenderConfig';
import type {
  DeviceKitType,
  SomethingElseInKitType,
} from '@/shared/types/device';
import { ListEntryItem } from '@/shared/ui/ListEntryItem/ListEntryItem';
import { ObjCard } from '@/shared/ui/ObjCard/ObjCard';
import { ObjEntryTwo } from '@/shared/ui/ObjEntry/ObjEntry';
import { TextValue } from '@/shared/ui/PrimitiveValue/TextValue/TextValue';
import { Add, Delete } from '@mui/icons-material';
import {
  IconButton,
  MenuItem,
  Modal,
  Popover,
  type PopoverProps,
} from '@mui/material';
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state';
import { useState } from 'react';

export interface IKitEntry {
  kit: DeviceKitType[];
  colors: typeof cols.light;
  onAddKitItemMenuClick?: (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => void;
  onKitItemClick?: (
    item: Exclude<DeviceKitType, SomethingElseInKitType>,
    id: number
  ) => void;
  onChange?: (newValue: DeviceKitType[]) => void;
  onError?: (error: string) => void;
}

export const KitEntry = (props: IKitEntry) => {
  const {
    kit,
    colors,
    onAddKitItemMenuClick,
    onKitItemClick,
    onChange,
    onError,
  } = props;

  const [clickedSomethingElseKitItem, setClickedSomethingElseKitItem] =
    useState<SomethingElseInKitType | null>(null);

  return (
    <ObjEntryTwo
      entryName="Комплект"
      translatedNamesForKeys={{}}
      style={ObjEntryStyles(colors)}
      renderForKeys={[
        ...kit
          .map((item, index) => (
            <>
              <ListEntryItem
                label={
                  item.count +
                  'x ' +
                  item.name +
                  ' ' +
                  (item.type === 'pod' || item.type === 'coil'
                    ? item.resistance
                    : '')
                }
                onClick={() => {
                  if (item.type === 'something-else') {
                    setClickedSomethingElseKitItem(item);
                  } else {
                    onKitItemClick?.(item, index);
                  }
                }}
                onDelete={() => {
                  onChange?.(
                    kit.filter((_kitItem, kitIndex) => kitIndex != index)
                  );
                }}
              />
              <Modal
                sx={modalStyles}
                open={Boolean(clickedSomethingElseKitItem)}
                onClose={() => setClickedSomethingElseKitItem(null)}
              >
                <EditSomethingElseInKitCard
                  item={clickedSomethingElseKitItem!}
                  onChange={(newItem) => {
                    onChange?.(
                      kit.map((kitItem, kitIndex) =>
                        index === kitIndex ? { ...newItem } : kitItem
                      )
                    );
                    setClickedSomethingElseKitItem(newItem);
                  }}
                  onDelete={() => {
                    onChange?.(
                      kit.filter((_kitItem, kitIndex) => kitIndex != index)
                    );
                    setClickedSomethingElseKitItem(null);
                  }}
                  onError={onError}
                  colors={colors}
                />
              </Modal>
            </>
          ))
          .flat(),
        <PopupState variant="popover">
          {(state) => (
            <>
              <IconButton
                size="small"
                {...bindTrigger(state)}
                sx={{ width: '100%', borderRadius: '10px' }}
              >
                <Add fontSize="small" />
              </IconButton>
              <AddItemToKitMenu
                onClick={(item, e) => {
                  if (item === 'somethingElse') {
                    const newKitItem: SomethingElseInKitType = {
                      type: 'something-else',
                      name: 'Новое что-то еще',
                      count: 1,
                    };
                    onChange?.([...kit, newKitItem]);
                    setClickedSomethingElseKitItem(newKitItem);
                  } else {
                    onAddKitItemMenuClick?.(e);
                  }
                }}
                menuProps={{ ...bindPopover(state) }}
              />
            </>
          )}
        </PopupState>,
      ]}
    />
  );
};

const AddItemToKitMenu = (props: {
  menuProps: PopoverProps;
  onClick?: (
    item: 'platform' | 'somethingElse',
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => void;
}) => {
  const { onClick } = props;

  return (
    <Popover {...props.menuProps}>
      <MenuItem onClick={(e) => onClick?.('platform', e)}>
        Картридж, танк, Испарик
      </MenuItem>
      <MenuItem onClick={(e) => onClick?.('somethingElse', e)}>
        Что-то еще
      </MenuItem>
    </Popover>
  );
};

const EditSomethingElseInKitCard = ({
  item,
  colors,
  onChange,
  onDelete,
  onError,
}: {
  item: SomethingElseInKitType;
  colors: typeof cols.light;
  onChange: (newValue: SomethingElseInKitType) => void;
  onDelete: () => void;
  onError?: (error: string) => void;
}) => {
  const kitConfig = createRenderConfig(item);
  return (
    <ObjCard
      styles={ObjCardStyles(colors)}
      translatedNamesForKeys={{
        name: 'Наименование',
        count: 'Кол-во',
        type: '',
      }}
      renderInHeader={
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <TextValue
            value={item.name}
            onSaveButtonPress={(newVal) =>
              onChange({ ...item, name: newVal.toString() })
            }
          />
          <IconButton onClick={onDelete}>
            <Delete />
          </IconButton>
        </div>
      }
      renderForKeys={[
        ...kitConfig.forKeys(['count'], (_key, value) => (
          <TextValue
            value={value}
            onSaveButtonPress={(newVal) => {
              const toNumber = Number(newVal);
              if (isNaN(toNumber)) {
                onError?.('значение должно быть числом');
              } else {
                onChange({ ...item, count: toNumber });
              }
            }}
          />
        )),
      ]}
    />
  );
};
