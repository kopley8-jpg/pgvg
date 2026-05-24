import { useEffect, useState } from 'react';
import type { ICompatiblePlatPicker } from './types';
import type { PodSeriesType } from '@/shared/types/pod-series';
import type { TankSeriesType } from '@/shared/types/tank-series';
import { subscribeToPods } from '@/shared/api/firebase/pods';
import { subscribeToTanks } from '@/shared/api/firebase/tanks';
import { pushPodSeries } from '@/features/pod-managment/push-pod-series/push-pod-series';
import { pushTankSeries } from '@/features/tank-managment/push-tank-series/push-tank-series';

export const useCompatiblePlatPicker = (props: ICompatiblePlatPicker) => {
  const { onClose, onPick } = props;
  const [loading, setLoading] = useState(false);
  const [plats, setPlats] = useState<
    ({ type: 'pod' } & PodSeriesType)[] | ({ type: 'tank' } & TankSeriesType)[]
  >([]);
  const [currentTab, setCurrentTab] = useState(0);
  const [platToShow, setPlatToShow] = useState<
    | ({
        type: 'pod';
      } & PodSeriesType)
    | ({
        type: 'tank';
      } & TankSeriesType)
    | null
  >(null);
  const [newPlatId, setNewPlatId] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);

    let unsubscribe = () => {};

    if (currentTab === 0) {
      unsubscribe = subscribeToPods((pods) => {
        setPlats(pods.map((pod) => ({ ...pod, type: 'pod' })));
      });
    } else {
      unsubscribe = subscribeToTanks((tanks) => {
        setPlats(tanks.map((tank) => ({ ...tank, type: 'tank' })));
      });
    }

    if (newPlatId) {
      const newPlat = plats.find((plat) => plat.id === newPlatId);
      setPlatToShow(newPlat ? newPlat : null);
    }

    return () => {
      unsubscribe();
    };
  }, [currentTab, newPlatId]);

  const uiHandler = {
    tabs: {
      onChange: (event: React.SyntheticEvent<Element, Event>, value: any) => {
        setCurrentTab(value);
      },
    },
    createSeriesButton: {
      onClick: async () => {
        if (currentTab === 0) {
          let newId = await pushPodSeries();
          setNewPlatId(newId);
        } else {
          let newId = await pushTankSeries();
          setNewPlatId(newId);
        }
      },
    },
    platItem: (
      plat:
        | ({ type: 'tank' } & TankSeriesType)
        | ({ type: 'pod' } & PodSeriesType)
    ) => {
      return {
        onClick: () => {
          setPlatToShow(plat);
        },
      };
    },
    seriesCardDialog: {
      menuProps: {
        onClose: () => {
          setPlatToShow(null);
        },
      },
      onAdd: (
        plat:
          | ({
              type: 'pod';
            } & PodSeriesType)
          | ({
              type: 'tank';
            } & TankSeriesType)
      ) => {
        onPick({
          type: plat.type,
          name: plat.name,
          idFromPlatforms: plat.id,
        });
        onClose();
      },
    },
  };

  return {
    plats,
    currentTab,
    uiHandler,
    platToShow,
    newPlatId,
  };
};
