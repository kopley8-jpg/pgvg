import type { MenuProps } from '@mui/material';
import type { ArrPrimitiveValueStyles } from '../../ArrayPrimitiveValue';

export interface IArrayPrimitiveValueEditor {
  value: (string | number)[];
  style?: ArrPrimitiveValueStyles;
  onSaveButtonClick: (newValue: (string | number)[]) => void;
  menuProps: MenuProps;
}
