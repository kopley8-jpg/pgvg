import { useThemeStore } from '@/shared/hooks/useThemeStore';
import { createStyles } from '@/shared/lib/createStyles';
import { Delete } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import type { compactiblePlat } from '../CompatiblePlatsEntry/model/types';

interface IPlatItem {
  platform: compactiblePlat;
  onClick: (type: 'pod' | 'tank', id: string) => void;
  onDeleteButtonClick: (id: string) => void;
}

export const PlatItem = ({
  platform,
  onClick,
  onDeleteButtonClick,
}: IPlatItem) => {
  const styles = useStyles();

  return (
    <div style={styles.container}>
      <Button
        sx={styles.text}
        onClick={() => onClick(platform.type, platform.idFromPlatforms)}
      >
        <span style={styles.text}>{platform.name}</span>
      </Button>
      <IconButton
        sx={styles.button}
        onClick={() => onDeleteButtonClick(platform.idFromPlatforms)}
      >
        <Delete />
      </IconButton>
    </div>
  );
};

const useStyles = () => {
  const { colors } = useThemeStore();

  return createStyles({
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    text: {
      color: colors.primary,
    },
    button: {
      color: colors.primary,
    },
  });
};
