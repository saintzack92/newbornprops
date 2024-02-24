import Sidebar from "./ui/dashboard/sidebar/sidebar"
import Navbar from "./ui/dashboard/navbar/navbar"
import styles from '../adminpanel/ui/dashboard/dashboard.module.css'


const Layout =({children})=>{
    return(
        <div className={`${styles.container} bg-[var(--bg)] text-[var(--text)]`}>
            <div className={styles.menu}>
                <Sidebar />
            </div>
            <div className={styles.content}>
                <Navbar />
                {children}
            </div>
        </div>
    )
}


export default Layout