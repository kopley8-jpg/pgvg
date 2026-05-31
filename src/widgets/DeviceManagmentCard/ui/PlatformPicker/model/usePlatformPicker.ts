import { useEffect, useState } from 'react';
import type { IPlatformPicker, SeriesItem } from './types';
import { subscribeToPods } from '@/shared/api/firebase/pods';
import { subscribeToTanks } from '@/shared/api/firebase/tanks';
import { pushCoilSeries, subscribeToCoils } from '@/shared/api/firebase/coils';
import type { TabsOwnProps } from '@mui/material';
import { pushPodSeries } from '@/features/pod-managment/push-pod-series/push-pod-series';
import { pushTankSeries } from '@/features/tank-managment/push-tank-series/push-tank-series';

export const usePlatformPicker = (props: IPlatformPicker) => {
  const { showedPlatforms, onClose, onPick } = props;
  const tabs = showedPlatforms.map((tab, index) => ({ tab: tab, id: index }));
  const [currentTabId, setCurrentTabId] = useState(0);
  const [serieses, setSerieses] = useState<SeriesItem[]>([]);
  const [seriesToShow, setSeriesToShow] = useState<SeriesItem | null>(null);
  const [newSeriesId, setNewSeriesId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToSeriesByName(
      showedPlatforms[currentTabId],
      (newSerieses) => {
        setSerieses(newSerieses);
      }
    );

    if (newSeriesId) {
      const newSeries = serieses.find((series) => series.id === newSeriesId);
      if (newSeries) {
        setSeriesToShow(newSeries);
        setNewSeriesId(null);
      }
    }

    return unsubscribe;
  }, [currentTabId, newSeriesId]);

  const uiHandler: IUiHandler = {
    tabs: {
      onChange(_event, value) {
        setCurrentTabId(value);
      },
    },
    seriesesList: {
      onClick(series) {
        setSeriesToShow(series);
      },
      onSeriesAdd: async (type) => {
        switch (type) {
          case 'coil':
            setNewSeriesId(await pushCoilSeries());
            break;
          case 'pod':
            setNewSeriesId(await pushPodSeries());
            break;
          case 'tank':
            setNewSeriesId(await pushTankSeries());
            break;
        }
      },
    },
    modalDialog: {
      onClose() {
        setSeriesToShow(null);
      },
    },
    seriesCardDialog: {
      onAdd() {
        onPick?.(seriesToShow!);
        setSeriesToShow(null);
        onClose?.();
      },
    },
  };

  return {
    tabs,
    currentTabId,
    serieses,
    uiHandler,
    seriesToShow,
  };
};

type IUiHandler = {
  tabs: Partial<TabsOwnProps>;
  seriesesList: {
    onClick: (series: SeriesItem) => void;
    onSeriesAdd: (type: 'pod' | 'tank' | 'coil') => void;
  };
  modalDialog: {
    onClose: () => void;
  };
  seriesCardDialog: {
    onAdd: () => void;
  };
};

const subscribeToSeriesByName = (
  subscribeTo: 'pods' | 'tanks' | 'coils',
  onValue: (serieses: SeriesItem[]) => void
) => {
  switch (subscribeTo) {
    case 'pods':
      return subscribeToPods((pods) => {
        onValue(pods.map((pod) => ({ ...pod, type: 'pod' as const })));
      });
    case 'tanks':
      return subscribeToTanks((tanks) => {
        onValue(tanks.map((tank) => ({ ...tank, type: 'tank' as const })));
      });
    case 'coils':
      return subscribeToCoils((coils) => {
        onValue(coils.map((coil) => ({ ...coil, type: 'coil' as const })));
      });
  }
};
