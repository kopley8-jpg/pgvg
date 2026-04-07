import { useThemeStore } from "@/shared/hooks/useThemeStore"
import { useStyles } from "./styles"
import { usePodSeriesesStore } from "@/entities/pods/model/store/podsStore"
import { useEffect } from "react"
import { PodSeriesCard } from "@/widgets/PodSeriesCard/PodSeriesCard.component"



export const DevicesPage = () => {
  const styles = useStyles()
  const { toggleTheme } = useThemeStore()

  const { podSerieses, loading, subscribeToPods, unsubscribeFromPods } = usePodSeriesesStore()

  useEffect(() => {
    subscribeToPods()

    return () => {
      unsubscribeFromPods()
    }
  }, [])

  if (loading || (!podSerieses || podSerieses.length === 0)) return (
    <a>Загрузка...</a>
  )


  return (
    <div style={styles.container} >
      <PodSeriesCard podSeries={podSerieses[0]} />
    </div>
  )
}

