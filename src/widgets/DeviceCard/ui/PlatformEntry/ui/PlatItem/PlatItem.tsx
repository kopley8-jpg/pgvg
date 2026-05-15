import type { CompactiblePlatType } from '@/entities/devices/model/types';
import { useThemeStore } from '@/shared/hooks/useThemeStore';
import { createStyles } from '@/shared/lib/createStyles';
import { Delete } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';

interface IPlatItem {
  platform: CompactiblePlatType;
  onClick: () => void;
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
        onClick={() => onClick()}
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
      width: "100%",
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: "space-between"
    },
    text: {
      color: colors.primary,
    },
    button: {
      color: colors.primary,
    },
  });
};
