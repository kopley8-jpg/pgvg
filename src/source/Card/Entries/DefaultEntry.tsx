import { Box, Typography } from '@mui/material';
import { createStyles } from '../../lib';

export const DefaultEntry = ({
  keyy,
  value,
}: {
  keyy: string;
  value: string | number;
}) => {
  return (
    <Box sx={styles.container}>
      <Typography fontWeight={600}>{keyy + value}</Typography>
    </Box>
  );
};

const styles = createStyles({
  container: {
    width: '90%',

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '0 10px',

    flexShrink: 0,
    flexWrap: 'nowrap',
    boxSizing: 'border-box',

    borderRadius: '20px',
    border: '2px solid #cecece',
    backgroundColor: '#d6d6d6',
    color: '#1a1a1a',
  },
});
