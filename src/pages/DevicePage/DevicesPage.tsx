import { useThemeStore } from "@/shared/hooks/useThemeStore"
import { useStyles } from "./styles"



export const DevicesPage = () => {
    const styles = useStyles()
    const { toggleTheme } = useThemeStore()
    return (
        <div style={styles.container} onClick={toggleTheme}>

        </div>
    )
}

