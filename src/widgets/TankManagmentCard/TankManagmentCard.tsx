import { TankSeriesCard } from '@/entities/tanks/ui/TankSeriesCard/EditableTankSeriesCard';
import { deleteTankSeries } from '@/features/tank-managment/delete-tank-series/delete-tank-series';
import { pushCompactibleCoilSeries, updateTankSeries } from '@/features/tank-managment/update-tank-series/update-tank-series';
import { useThemeStore } from '@/shared/hooks/useThemeStore';
import type { CompactibleCoilSeriesesType, TankSeriesType } from '@/shared/types/tank-series';
import { useState } from 'react';
import { CompatibleCoilPicker } from './CompatibleCoilPicker/CompatibleCoilPicker';
import { Modal } from '@mui/material';
import { CoilManagmentCard } from '../CoilManagnmentCard/CoilManagmentCard';

export const TankManagmentCard = ({
  tankSeries,
  headerRender
}: {
  tankSeries: TankSeriesType | string;
  headerRender?: React.ReactNode
}) => {
  const { colors } = useThemeStore();

  const id = typeof tankSeries === 'object' ? tankSeries.id : tankSeries;

  const [compatibleCoilPickerProps, setCompatibleCoilPickerProps] = useState<{
    open: boolean;
    anchorEl: HTMLElement | null;
  }>({
    open: false,
    anchorEl: null,
  });
  const [clickedCoil, setClickedCoil] = useState<CompactibleCoilSeriesesType | null>(null)

  return (
    <>
      <TankSeriesCard
        tankSeries={tankSeries}
        colors={colors}
        onChange={(key, value) => updateTankSeries(id, key, value)}
        onDelete={() => {
          deleteTankSeries(id);
        }}
        onCoilAdd={(e) => {
          setCompatibleCoilPickerProps(prev => ({
            ...prev,
            open: true,
            anchorEl: e.currentTarget
          }))
        }}
        onCoilItemClick={(coil) => { setClickedCoil(coil) }}
        onError={() => { }}
        headerRender={headerRender}
      />
      <CompatibleCoilPicker
        {...compatibleCoilPickerProps}
        onPick={coil => {
          pushCompactibleCoilSeries(id, coil)
        }}
        onClose={() => setCompatibleCoilPickerProps(prev => ({ ...prev, open: false }))} />
      <CoilPreview coil={clickedCoil} onClose={() => setClickedCoil(null)} />
    </>
  );
};

const CoilPreview = ({
  coil,
  onClose,
}: {
  coil: CompactibleCoilSeriesesType | null;
  onClose: () => void;
}) => {
  if (!coil) return <></>;
  return (
    <Modal
      open={Boolean(coil)}
      onClose={() => onClose()}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CoilManagmentCard coilSeries={coil.idFromPlatforms} />
    </Modal>
  );
};

