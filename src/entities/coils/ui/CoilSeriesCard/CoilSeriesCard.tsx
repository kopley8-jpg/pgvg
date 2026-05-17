import { useThemeStore } from "@/shared/hooks/useThemeStore"
import { convertToNumber } from "@/shared/lib/convertToNumber"
import { createRenderConfig } from "@/shared/lib/createRenderConfig"
import type { CoilSeriesType } from "@/shared/types/coil-series"
import { ArrayPrimitiveValue } from "@/shared/ui/ArrayPrimitiveValue/ArrayPrimitiveValue"
import { ObjCard } from "@/shared/ui/ObjCard/ObjCard"
import type { ObjCardStyles } from "@/shared/ui/ObjCard/types"
import { TextValue } from "@/shared/ui/PrimitiveValue/TextValue/TextValue"

interface ICoilSeriesCard {
  coilSeries: CoilSeriesType,
  onChange: <K extends keyof CoilSeriesType>(entryName: K, value: CoilSeriesType[K]) => void
  onError?: (error: Error) => void
}

export const CoilSeriesCard = (props: ICoilSeriesCard) => {
  const { coilSeries, onChange, onError } = props
  const styles = useStyles()

  const handleOhmsChange = (newValue: (string | number)[]) => {
    // Только преобразование типа, без валидации
    const ohmsAsNumbers = newValue.map(v => Number(convertToNumber(v)));

    if (ohmsAsNumbers.some(val => isNaN(val))) {
      onError?.(new Error("Все значения должны быть числами"));
      return;
    }

    if (ohmsAsNumbers.length === 0) {
      onError?.(new Error("Хотя бы одно сопротивление обязательно"));
      return;
    }

    onChange("ohms", ohmsAsNumbers);
  };

  return (
    <ObjCard
      style={{ ...styles }}
      translatedNamesForKeys={translate}
      data={coilSeries}
      renderInHeader={() => (
        <TextValue value={coilSeries.name} onSaveButtonPress={(value) => { onChange("name", value.toString()) }} />
      )}
      renderForKeys={[
        ...createRenderConfig(coilSeries).forKeys(['ohms'], (key, value) => (
          <ArrayPrimitiveValue value={value} onChangesSaved={handleOhmsChange} />
        )),
      ]}
    />
  )
}

const useStyles = (): ObjCardStyles => {
  const { colors } = useThemeStore();
  return {
    container: {
      height: '25vh',
      width: '60vw',
      backgroundColor: colors.background,
    },
    header: {
      display: 'flex',
      flexDirection: 'row',
      paddingLeft: '4%',
      justifyContent: 'space-between',
      fontSize: '4vw',
    },
    content: {
      fontSize: '4vw',
    },
  };
};

const translate = {
  id: '',
  name: 'Название',
  ohms: 'Сопроты',
};