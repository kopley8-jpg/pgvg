import { PodSeriesCard } from '@/entities/pods/ui/PodSeriesCard/EditablePodSeriesCard';
import { deletePodSeries } from '@/features/pod-managment/delete-pod-series/deletePodSeries';
import { updatePodSeries } from '@/features/pod-managment/update-pod-series/update-pod-series';
import { uploadImageToImgBB } from '@/shared/api/imgbb/uploadImage';
import { useThemeStore } from '@/shared/hooks/useThemeStore';
import type { PodSeriesType } from '@/shared/types/pod-series';

export const PodManagmentCard = ({
  podSeries,
  renderInHeader,
}: {
  podSeries: PodSeriesType | string;
  renderInHeader?: React.ReactNode;
}) => {
  const { colors } = useThemeStore();
  const id = typeof podSeries === 'object' ? podSeries.id : podSeries;

  return (
    <PodSeriesCard
      podSeries={podSeries}
      colors={colors}
      renderInHeader={renderInHeader}
      onChange={(key, val) => {
        updatePodSeries(id, key, val);
        alert(id);
      }}
      onPhotoAccept={async (file) => {
        await uploadImageToImgBB(file)
          .then((url) => {
            updatePodSeries(id, 'photoURL', url);
          })
          .catch(() => alert('не удалось загрузить фото'));
      }}
      onDelete={() => deletePodSeries(id)}
      onError={(error) => alert(error)}
    />
  );
};
