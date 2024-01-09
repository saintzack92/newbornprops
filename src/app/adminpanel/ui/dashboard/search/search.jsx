import styles from './search.module.css'
import { MdSearch } from "react-icons/md"

const Search =({placeholder})=>{
    return (
        <div className={`${styles.container} flex items-center gap-[10px] bg-[#2e374a] p-[10px] max-w-max focus:outline-none rounded-[10px]`}>
            <MdSearch />
            <input type="text" placeholder={placeholder} className={`${styles.input} bg-transparent border-none text-[var(--text) focus:outline-none outline-none]`} />
            
            </div>
    )
}

export default Search