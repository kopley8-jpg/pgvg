import { Box, Typography } from '@mui/material';
import { createStyles } from '../../../lib';
import type { PlatformType } from '../../../model';
import { PlatformCard } from './PlatformCard';

interface IPlatformsEntry {
  platforms: PlatformType[];
}

export const PlatformsEntry = ({ platforms }: IPlatformsEntry) => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.header}>
        <Typography fontWeight={600}>{'Платформа '}</Typography>
      </Box>
      <Box sx={styles.platformsListCointainer}>
        {platforms.map((platform, index) => (
          <PlatformCard key={index} platform={platform} />
        ))}
      </Box>
    </Box>
  );
};

const styles = createStyles({
  container: {
    width: '90%',
    maxHeight: '30vh',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexShrink: 0,
    flexWrap: 'nowrap',
    boxSizing: 'border-box',

    paddingTop: '5px',
    borderRadius: '20px',
    border: '2px solid #cecece',
    backgroundColor: '#d6d6d6',
    color: '#1a1a1a',
  },
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  platformsListCointainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    pt: '5px',
    gap: '10px',
    borderRadius: '20px',
  },
});
