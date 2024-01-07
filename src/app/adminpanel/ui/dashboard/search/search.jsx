import styles from './search.module.css'
import { MdSearch } from "react-icons/md"

const Search =(placeholder)=>{
    return (
        <div className={`${styles.container} flex items-center gap-[10px] bg-[#2e374a] p-[10px] max-w-max`}>
            <MdSearch />
            <input type="text" placeholder={placeholder} className={`${styles.input}`} />
            
            </div>
    )
}

export default Search