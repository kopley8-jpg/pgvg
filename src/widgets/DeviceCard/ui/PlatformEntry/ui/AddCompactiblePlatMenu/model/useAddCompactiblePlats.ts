import { useEffect, useState } from 'react';
import type { IAddCompactiblePlatMenu } from './types';
import { usePodSeriesesStore } from '@/entities/pods/model/store/podsStore';
import { usePopupState } from 'material-ui-popup-state/hooks';

export const useAddCompatiblePlats = ({ onPick }: IAddCompactiblePlatMenu) => {
  const { podSerieses, loadingPods, subscribeToPods, unsubscribeFromPods } =
    usePodSeriesesStore();

  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'addPlatMenu',
  });

  useEffect(() => {
    subscribeToPods();

    return () => {
      unsubscribeFromPods();
    };
  }, [popupState.isOpen]);

  const [pickedTab, setPickedTab] = useState<'pods' | 'tanks'>('pods');

  const handleTabsChange = (event: React.SyntheticEvent, picked: number) => {
    setPickedTab(picked === 0 ? 'pods' : 'tanks');
  };

  return {
    pickedTab,
    handleTabsChange,
    podSerieses,
    loadingPods,
    popupState,
  };
};
