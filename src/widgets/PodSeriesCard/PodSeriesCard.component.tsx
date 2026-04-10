import type { PodSeriesType } from '@/entities/pods/model/types';
import { updatePodSeriesEntryById } from '@/features/updatePodSeriesEntryById/model/updatePodSeriesEntryById';
import { ArrayPrimitiveValue } from '@/shared/ui/ArrayPrimitiveValue/ArrayPrimitiveValue';
import { ObjCard } from '@/shared/ui/ObjCard/ObjCard';
import { PrimitiveValue } from '@/shared/ui/PrimitiveValue/PrimitiveValue';
import { PrimitiveValueEditor } from '@/shared/ui/PrimitiveValue/PrimitiveValueEditor/PrimitiveValueEditor';
import { useState } from 'react';

interface IPodSeriesCard {
  podSeries: PodSeriesType;
}

export const PodSeriesCard = ({ podSeries }: IPodSeriesCard) => {
  const [editingEntryName, setEditingEntryName] = useState<
    keyof PodSeriesType | null
  >();

  const updatePodSeries = (keyName: string, value: any) => {
    updatePodSeriesEntryById(podSeries.id, keyName, value);
    setEditingEntryName(null);
  };

  return (
    <ObjCard
      renderInHeader={() => (
        <PrimitiveValue value={podSeries.name} onSaveButtonPress={() => {}} />
      )}
      renderInPropsContainer={() => (
        <>
          <ArrayPrimitiveValue
            onChangesSaved={(p) => updatePodSeries('capacity', p)}
            value={podSeries.capacity}
            keyName="Емкости"
            onClick={() => setEditingEntryName('capacity')}
          />
          <ArrayPrimitiveValue
            onChangesSaved={(p) => updatePodSeries('ohms', p)}
            keyName={'Сопротивления'}
            value={podSeries.ohms}
          />
        </>
      )}
    />
  );
};
