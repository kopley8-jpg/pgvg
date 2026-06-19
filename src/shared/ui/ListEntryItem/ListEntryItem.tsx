import { Delete } from '@mui/icons-material';
import { IconButton, MenuItem } from '@mui/material';

export const ListEntryItem = (props: {
  onClick?: React.MouseEventHandler<HTMLLIElement>;
  onDelete?: () => void;
  label: string;
}) => {
  const { label, onClick, onDelete } = props;

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <MenuItem
        sx={{
          py: 1,
          px: 1,
          minHeight: 'auto',
          fontSize: '1rem',
          '@media (max-width: 386px)': {
            fontSize: '3.5vw',
          },
          whiteSpace: 'normal',
        }}
        onClick={onClick}
      >
        {label}
      </MenuItem>
      <IconButton size="small" onClick={onDelete}>
        <Delete fontSize="small" />
      </IconButton>
    </div>
  );
};
