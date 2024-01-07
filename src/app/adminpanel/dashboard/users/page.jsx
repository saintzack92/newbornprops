import styles from '../../../adminpanel/ui/dashboard/search/search.module.css'
import Search from '../../ui/dashboard/search/search'

const UsersPage = () => {
    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.top}`}>
                <Search placeholder="Search for a user" />

            </div>
            <table className={`${styles.table}`}> </table>
        </div>
    )
}

export default UsersPage 