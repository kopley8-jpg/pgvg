import type { ObjCardStyles as ObjCardStylesType } from '../ui/ObjCard/types';
import type { ObjEntryStylesType } from '../ui/ObjEntry/ObjEntry';
import type { colors as cols } from './colors';

export const ObjCardStyles = (colors: typeof cols.light): ObjCardStylesType => {
  return {
    container: {
      borderRadius: '20px',
      border: `2px ${colors.second} solid`,
      fontSize: '1rem',
      '@media (max-width: 386px)': {
        fontSize: '3.5vw',
      },
      color: colors.primary,
      backgroundColor: colors.background,
      '@media (orientation: landscape)': {
        width: { sm: '50%', md: '40%', lg: '30%' },
      },
      '@media (orientation: portrait)': {
        width: '90%',
      },
    },
    photo: {
      borderRadius: '20px 0px 0px 20px',
      borderRight: `2px ${colors.second} solid`,
    },
    header: {
      borderBottom: `2px ${colors.second} solid`,
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
      fontSize: '1rem',
      '@media (max-width: 386px)': {
        fontSize: '3.5vw',
      },
    },
    propsContainer: {
      fontSize: '1rem',
      '@media (max-width: 386px)': {
        fontSize: '3.5vw',
      },
      borderLeft: `2px ${colors.primary} solid`,
    },
  };
};

export const modalStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};
