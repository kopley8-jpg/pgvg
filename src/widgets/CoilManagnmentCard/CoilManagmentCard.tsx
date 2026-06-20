import { CoilSeriesCard } from '@/entities/coils/ui/EditableCoilSeriesCard/EditableCoilSeriesCard';
import { deleteCoilSeries } from '@/features/coilManagment/delete-coil-series/deleteCoilSeries';
import { updateCoilSeries } from '@/features/coilManagment/edit-сoil-series/model/edit-coil-series';
import { uploadImageToImgBB } from '@/shared/api/imgbb/uploadImage';
import { useThemeStore } from '@/shared/hooks/useThemeStore';
import type { CoilSeriesType } from '@/shared/types/coil-series';

type ICoilManagmentCard = {
  coilSeries: CoilSeriesType | string;
  renderInHeader?: React.ReactNode;
};

export const CoilManagmentCard = (props: ICoilManagmentCard) => {
  const { coilSeries, renderInHeader } = props;
  const { colors } = useThemeStore();
  const id = typeof coilSeries === 'object' ? coilSeries.id : coilSeries;

  return (
    <CoilSeriesCard
      coilSeries={coilSeries}
      renderInHeader={renderInHeader}
      onChange={(k, val) => {
        updateCoilSeries(id, k, val).catch((e) => alert(e));
      }}
      onDelete={() => {
        deleteCoilSeries(id);
      }}
      onPhotoAccept={async (file) => {
        await uploadImageToImgBB(file)
          .then((url) => {
            updateCoilSeries(id, 'photoURL', url);
          })
          .catch(() => alert('не удалось загрузить фото'));
      }}
      colors={colors}
      onError={(err) => alert(err)}
    />
  );
};
