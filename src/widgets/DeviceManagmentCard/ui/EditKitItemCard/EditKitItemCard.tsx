import { subscribeToCoilSeriesById } from "@/shared/api/firebase/coils";
import { subscribeToPodSeriesById } from "@/shared/api/firebase/pods";
import { subscribeToTankSeriesById } from "@/shared/api/firebase/tanks";
import type { colors as cols } from "@/shared/constants/colors";
import { ObjCardStyles } from "@/shared/constants/styles";
import { createRenderConfig } from "@/shared/lib/createRenderConfig";
import type { CoilSeriesType } from "@/shared/types/coil-series";
import type { DeviceKitType, SomethingElseInKitType, PodInKitType, TankInKitType, CoilInKitType } from "@/shared/types/device";
import type { PodSeriesType } from "@/shared/types/pod-series";
import type { TankSeriesType } from "@/shared/types/tank-series";
import { DropDownList } from "@/shared/ui/DropDownList/DropDownList";
import { ObjCard } from "@/shared/ui/ObjCard/ObjCard";
import { TextValue } from "@/shared/ui/PrimitiveValue/TextValue/TextValue";
import { useState, useEffect } from "react";

type LocalDeviceKitType = Exclude<DeviceKitType, SomethingElseInKitType>


export const EditKitItemCard = ({
  item,
  colors,
  onChange,
  onError,
}: {
  item: Exclude<DeviceKitType, SomethingElseInKitType> & { id: number };
  colors: typeof cols.light;
  onChange: (
    newItem: Exclude<DeviceKitType, SomethingElseInKitType> & { id: number }
  ) => void;
  onError: (error: string) => void;
}) => {
  const [series, setSeries] = useState<
    | (PodSeriesType & { type: 'pod' })
    | (TankSeriesType & { type: 'tank' })
    | (CoilSeriesType & { type: 'coil' })
    | null
  >(null);

  useEffect(() => {
    const unsubscribe = subscribeToSeriesByName(
      item.type,
      item.idFromPlatforms,
      (series) => {
        setSeries({ ...series, type: item.type } as any);
      }
    );
    return unsubscribe;
  }, []);

  if (!series) return <span>Загрузка...</span>;

  switch (item.type) {
    case 'pod':
      if (series.type !== 'pod') return <></>;
      return (
        <PodItemInKitEditorCard
          onChange={onChange}
          onError={onError}
          kitItem={item}
          series={series}
          colors={colors}
        />
      );
    case 'tank':
      if (series.type !== 'tank') return <></>;
      return (
        <TankItemInKitEditorCard
          onChange={onChange}
          onError={onError}
          kitItem={item}
          series={series}
          colors={colors}
        />
      );
    case 'coil':
      if (series.type !== 'coil') return <></>;
      return (
        <CoilItemInKitEditorCard
          onChange={onChange}
          onError={onError}
          kitItem={item}
          series={series}
          colors={colors}
        />
      );
  }
};

interface IItemInKit {
  colors: typeof cols.light;
  onChange: (
    newItem: Exclude<DeviceKitType, SomethingElseInKitType> & { id: number }
  ) => void;
  onError: (error: string) => void;
}

const PodItemInKitEditorCard = ({
  kitItem,
  series,
  colors,
  onChange,
  onError,
}: IItemInKit & {
  kitItem: PodInKitType & { id: number };
  series: PodSeriesType;
}) => {
  const podItemConfig = createRenderConfig(kitItem);

  return (
    <ObjCard
      styles={{
        ...ObjCardStyles(colors),
        container: {
          ...ObjCardStyles(colors).container,
          height: '20vh',
        },
      }}
      data={kitItem}
      renderInHeader={() => <span>{kitItem.name}</span>}
      renderForKeys={[
        ...podItemConfig.forKeys(['resistance'], (_key, value) => (
          <DropDownList
            value={value}
            data={series.ohms}
            onPick={(p) => {
              if (p === value) return;
              onChange({ ...kitItem, resistance: p });
            }}
          />
        )),
        ...[
          series.capacity.length > 1
            ? podItemConfig.forKeys(['capacity'], (_key, value) => (
              <DropDownList
                value={value}
                data={series.capacity}
                onPick={(p) => {
                  if (p === value) return;
                  onChange({ ...kitItem, capacity: p });
                }}
              />
            ))
            : [],
        ].flat(),
        ...podItemConfig.forKeys(['count'], (_key, value) => (
          <TextValue
            value={value}
            onSaveButtonPress={(e) => {
              const toNumber = Number(e);
              if (isNaN(toNumber)) {
                onError('значение должно быть числом');
              } else {
                onChange({ ...kitItem, count: toNumber });
              }
            }}
          />
        )),
      ]}
    />
  );
};

const TankItemInKitEditorCard = ({
  kitItem,
  series,
  colors,
  onChange,
  onError,
}: IItemInKit & {
  kitItem: TankInKitType & { id: number };
  series: TankSeriesType;
}) => {
  const tankItemConfig = createRenderConfig(kitItem);

  return (
    <ObjCard
      styles={{
        ...ObjCardStyles(colors),
        container: {
          ...ObjCardStyles(colors).container,
          height: '20vh',
        },
      }}
      data={kitItem}
      renderInHeader={() => <span>{kitItem.name}</span>}
      renderForKeys={[
        ...[
          series.capacity.length > 1
            ? tankItemConfig.forKeys(['capacity'], (_key, value) => (
              <DropDownList
                value={value}
                data={series.capacity}
                onPick={(p) => {
                  if (p === value) return;
                  onChange({ ...kitItem, capacity: p });
                }}
              />
            ))
            : [],
        ].flat(),
        ...tankItemConfig.forKeys(['count'], (_key, value) => (
          <TextValue
            value={value}
            onSaveButtonPress={(e) => {
              const toNumber = Number(e);
              if (isNaN(toNumber)) {
                onError('значение должно быть числом');
              } else {
                onChange({ ...kitItem, count: toNumber });
              }
            }}
          />
        )),
      ]}
    />
  );
};

const CoilItemInKitEditorCard = ({
  kitItem,
  series,
  colors,
  onChange,
  onError,
}: IItemInKit & {
  kitItem: CoilInKitType & { id: number };
  series: CoilSeriesType;
}) => {
  const coilItemConfig = createRenderConfig(kitItem);

  return (
    <ObjCard
      styles={{
        ...ObjCardStyles(colors),
        container: {
          ...ObjCardStyles(colors).container,
          height: '20vh',
        },
      }}
      data={kitItem}
      renderInHeader={() => <span>{kitItem.name}</span>}
      renderForKeys={[
        ...coilItemConfig.forKeys(['resistance'], (_key, value) => (
          <DropDownList
            value={value}
            data={series.ohms}
            onPick={(p) => {
              if (p === value) return;
              onChange({ ...kitItem, resistance: p });
            }}
          />
        )),
        ...coilItemConfig.forKeys(['count'], (_key, value) => (
          <TextValue
            value={value}
            onSaveButtonPress={(e) => {
              const toNumber = Number(e);
              if (isNaN(toNumber)) {
                onError('значение должно быть числом');
              } else {
                onChange({ ...kitItem, count: toNumber });
              }
            }}
          />
        )),
      ]}
    />
  );
};

function subscribeToSeriesByName(
  name: 'coil' | 'pod' | 'tank',
  id: string,
  onChange: (item: CoilSeriesType | PodSeriesType | TankSeriesType) => void
) {
  switch (name) {
    case 'coil':
      return subscribeToCoilSeriesById(id, onChange);
    case 'pod':
      return subscribeToPodSeriesById(id, onChange);
    case 'tank':
      return subscribeToTankSeriesById(id, onChange);
  }
}
