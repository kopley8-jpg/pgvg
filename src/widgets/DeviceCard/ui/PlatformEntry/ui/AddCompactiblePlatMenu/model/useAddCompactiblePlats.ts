import { useEffect, useState } from 'react';
import type { IAddCompactiblePlatMenu } from './types';
import { usePodSeriesesStore } from '@/entities/pods/model/store/podsStore';
import { usePopupState } from 'material-ui-popup-state/hooks';
import { useTanksSeriesesStore } from '@/entities/tanks/model/store/tanksStore';
import type { PodSeriesType } from '@/entities/pods/model/types';
import type { TankSeriesType } from '@/entities/tanks/model/types';

export const useAddCompatiblePlats = ({ onPick }: IAddCompactiblePlatMenu) => {
  const { podSerieses, loadingPods, subscribeToPods, unsubscribeFromPods } =
    usePodSeriesesStore();

  const { tankSerieses, loadingTanks, subscribeToTanks, unsubscribeFromTanks } =
    useTanksSeriesesStore();

  const popupState = usePopupState({
    variant: 'popover',
  });

  const [pickedTab, setPickedTab] = useState<'pods' | 'tanks'>('pods');

  useEffect(() => {
    if (pickedTab === 'pods') {
      subscribeToPods();
    } else {
      subscribeToTanks();
    }

    return () => {
      unsubscribeFromPods();
      unsubscribeFromTanks();
    };
  }, [popupState.isOpen, pickedTab]);

  const handleTabsChange = (_event: React.SyntheticEvent, picked: number) => {
    setPickedTab(picked === 0 ? 'pods' : 'tanks');
  };

  const handlePick = (
    series:
      | { type: 'pod'; series: PodSeriesType }
      | { type: 'tank'; series: TankSeriesType }
  ) => {
    onPick(series);
    popupState.close();
  };

  return {
    pickedTab,
    handleTabsChange,
    podSerieses,
    loadingPods,
    tankSerieses,
    loadingTanks,
    handlePick,
    popupState,
  };
};
