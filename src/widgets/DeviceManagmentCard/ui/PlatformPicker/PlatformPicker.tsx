import {
  Box,
  IconButton,
  MenuItem,
  Modal,
  Popover,
  Tab,
  Tabs,
} from '@mui/material';
import type { IPlatformPicker, SeriesItem } from './model/types';
import { usePlatformPicker } from './model/usePlatformPicker';
import { TankManagmentCard } from '@/widgets/TankManagmentCard/TankManagmentCard';
import { Add } from '@mui/icons-material';
import { PodManagmentCard } from '@/widgets/PodManagmentCard/PodManagmentCard';
import { CoilManagmentCard } from '@/widgets/CoilManagnmentCard/CoilManagmentCard';
import { modalStyles } from '@/shared/constants/styles';

export const PlatformPicker = (props: IPlatformPicker) => {
  if (!props.open) return <></>;

  const { tabs, currentTabId, serieses, seriesToShow, uiHandler } =
    usePlatformPicker(props);

  if (!serieses || serieses === undefined) return <></>;

  return (
    <Popover {...props}>
      <Tabs value={currentTabId} {...uiHandler.tabs}>
        {tabs.map((tab) => (
          <Tab label={tab.tab} />
        ))}
      </Tabs>
      <SeriesesList serieses={serieses} {...uiHandler.seriesesList} />
      <SeriesCardDialog
        open={Boolean(seriesToShow)}
        series={seriesToShow!}
        {...uiHandler.seriesCardDialog}
      />
    </Popover>
  );
};

const SeriesesList = ({
  serieses,
  onClick,
  onSeriesAdd,
}: {
  serieses: SeriesItem[];
  onClick: (series: SeriesItem) => void;
  onSeriesAdd: (type: 'pod' | 'tank' | 'coil') => void;
}) => {
  return (
    <Box sx={{ maxHeight: '50vh', overflowY: 'auto' }}>
      <MenuItem onClick={() => onSeriesAdd(serieses[0].type)}>
        {'+ Добавить серию '}
      </MenuItem>
      {serieses.map((series) => (
        <MenuItem onClick={() => onClick(series)}>{series.name}</MenuItem>
      ))}
    </Box>
  );
};

const SeriesCardDialog = ({
  open,
  series,
  onAdd,
  onClose
}: {
  open:boolean,
  series: SeriesItem;
  onAdd?: () => void;
  onClose?:() => void
}) => {
  const AddButton = (
    <IconButton onClick={onAdd}>
      <Add />
    </IconButton>
  );

  const Card = () => {
      switch (series.type) {
      case 'tank':
        return <TankManagmentCard tankSeries={series} headerRender={AddButton} />;
      case 'pod':
        return <PodManagmentCard podSeries={series} renderInHeader={AddButton} />;
      case 'coil':
        return <CoilManagmentCard coilSeries={series} renderInHeader={AddButton} />
    }
  }

  return(
    <Modal open={open} onClose={onClose} sx={modalStyles}>
      <Card/>
    </Modal>
  )

};
