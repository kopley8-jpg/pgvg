import type { ObjCardStyles as ObjCardStylesType } from '../ui/ObjCard/types';
import type { ObjEntryStylesType } from '../ui/ObjEntry/ObjEntry';
import type { colors as cols } from './colors';

export const ObjCardStyles = (colors: typeof cols.light): ObjCardStylesType => {
  return {
    container: {
      borderRadius: '20px',
      border: `2px ${colors.second} solid`,
      fontSize: '3vw',
      color: colors.primary,
      backgroundColor: colors.background,
    },
    photo: {
      borderRadius: '20px 0px 0px 20px',
      borderRight: `2px ${colors.second} solid`,
    },
    header: {
      borderBottom: `2px ${colors.second} solid`,
      paddingLeft: 10,
    },
    prop: {
      color: colors.primary,
    },
    propKeyName: {},
  };
};

export const ObjEntryStyles = (
  colors: typeof cols.light
): ObjEntryStylesType => {
  return {
    entryName: {
      color: colors.primary,
      fontSize: '3vw',
    },
    propsContainer: {
      borderLeft: `2px ${colors.primary} solid`,
      fontSize: '3vw',
    },
  };
};

export const modalStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};
