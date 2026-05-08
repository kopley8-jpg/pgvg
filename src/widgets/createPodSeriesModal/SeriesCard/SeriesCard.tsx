import type { PodSeriesType } from "@/entities/pods/model/types";
import { useThemeStore } from "@/shared/hooks/useThemeStore";
import { createRenderConfig } from "@/shared/lib/createRenderConfig";
import { createStyles } from "@/shared/lib/createStyles";
import { ArrayPrimitiveValue } from "@/shared/ui/ArrayPrimitiveValue/ArrayPrimitiveValue";
import { ObjCard } from "@/shared/ui/ObjCard/ObjCard"
import { TextValue } from "@/shared/ui/PrimitiveValue/TextValue/TextValue";
import { Cancel, Save } from "@mui/icons-material";
import { IconButton } from "@mui/material";

interface ISeriesCard {
  podSeries: Omit<PodSeriesType, "id">
}

export const SeriesCard = (props: ISeriesCard) => {

  const { podSeries } = props

  const styles = useStyles();

  const podSeriesConfig = createRenderConfig(podSeries)

  return (
    <ObjCard
      style={{
        container: styles.objCardContainer,
        header: styles.objCardHeader,
      }}
      data={podSeries}
      translatedNamesForKeys={translate}
      renderInHeader={() => (
        <>
          <TextValue value={podSeries.name} />
          <div style={styles.objCardHeaderButtons}>
            <IconButton>
              <Cancel />
            </IconButton>
            <IconButton>
              <Save />
            </IconButton>
          </div>
        </>
      )}
      renderForKeys={[
        ...podSeriesConfig.forKeys(['capacity', 'ohms'], (key, value) => (
          <ArrayPrimitiveValue value={value} onChangesSaved={() => { }} />
        )),
      ]}
    />
  )
}

const translate = {
  name: 'Название',
  capacity: 'Емкости',
  ohms: 'Сопроты',
};

const useStyles = () => {
  const { colors } = useThemeStore();
  return createStyles({
    modal: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    objCardContainer: {
      width: '50vw',
      height: '25vh',
      backgroundColor: colors.background,
    },
    objCardHeader: {
      display: 'flex',
      flexDirection: 'row',
      paddingLeft: '4%',
      justifyContent: 'space-between',
    },
    objCardHeaderButtons: {
      display: 'flex',
      flexDirection: 'row',
    },
  });
};