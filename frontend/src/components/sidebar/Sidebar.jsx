import Links from "./links/Links"
import styles from "./sidebar.module.css"

const Sidebar = () => {
    return (
      <div className={styles.container}>
        <Links />
      </div>
    )
  }
  
export default Sidebar
