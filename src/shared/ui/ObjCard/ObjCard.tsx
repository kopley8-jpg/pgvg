import { useStyles } from "./ObjCard.styles"
import type { IObjCard } from "./types"



export const ObjCard = ({ renderInHeader, renderInPropsContainer }: IObjCard) => {

  const styles = useStyles()

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        {renderInHeader()}
      </div>
      <div style={styles.content}>
        {renderInPropsContainer()}
      </div>
    </div>
  )
}

