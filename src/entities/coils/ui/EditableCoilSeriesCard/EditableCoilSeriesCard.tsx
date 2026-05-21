import { createRenderConfig } from '@/shared/lib/createRenderConfig';
import { ArrayPrimitiveValue } from '@/shared/ui/ArrayPrimitiveValue/ArrayPrimitiveValue';
import { ObjCard } from '@/shared/ui/ObjCard/ObjCard';
import { TextValue } from '@/shared/ui/PrimitiveValue/TextValue/TextValue';
import { MoreVert } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state';
import { CoilSeriesMenu } from './CoilSeriesMenu/CoilSeriesMenu';
import type { ICoilSeriesCard } from './model/types';
import { useCoilSeriesCard } from './model/useCoilSeriesCard';
import { useStyles } from './styles';


export const CoilSeriesCard = (props: ICoilSeriesCard) => {
  const { onChange, onMenuItemClick } = props;
  const { coilSeries, loading, handleOhmsChange } = useCoilSeriesCard(props)
  const styles = useStyles();

  if (!coilSeries || loading) return <span>загрузка...</span>

  return (
    <ObjCard
      style={{ ...styles }}
      translatedNamesForKeys={translate}
      data={coilSeries}
      renderInHeader={() => (
        <>
          <TextValue
            value={coilSeries.name}
            onSaveButtonPress={(value) => {
              onChange('name', value.toString());
            }}
          />
          <PopupState variant='popover'>
            {state => (
              <>
                <IconButton {...bindTrigger(state)}>
                  <MoreVert />
                </IconButton>
                <CoilSeriesMenu menuProps={{ ...bindMenu(state) }} onItemClick={onMenuItemClick} />
              </>
            )}
          </PopupState>
        </>
      )}
      renderForKeys={[
        ...createRenderConfig(coilSeries).forKeys(['ohms'], (_key, value) => (
          <ArrayPrimitiveValue
            value={value}
            onChangesSaved={handleOhmsChange}
          />
        )),
      ]}
    />
  );
};

const translate = {
  id: '',
  name: 'Название',
  ohms: 'Сопроты',
};
