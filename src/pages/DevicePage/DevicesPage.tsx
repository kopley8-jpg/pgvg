import { useThemeStore } from "@/shared/hooks/useThemeStore"
import { useStyles } from "./styles"
import { usePodSeriesesStore } from "@/entities/pods/model/store/podsStore"
import { useEffect } from "react"



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

    if (loading) return (
        <div style={styles.container} onClick={toggleTheme}>
            <a>Загрузка...</a>
        </div>
    )

    return (
        <div style={styles.container} onClick={toggleTheme}>
            {podSerieses.map((podSeries, index) => (
                <a key={index}>{podSeries.ohms.join(",")}</a>
            ))}
        </div>
    )
}

