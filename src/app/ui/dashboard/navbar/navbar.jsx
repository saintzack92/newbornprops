"use client"
import { usePathname } from 'next/navigation'
import styles from './navbar.module.css'
import {MdNotification, MdOutlineChat, MdPublic, MdSearch} from 'react-icons'

const Navbar = ()=>{
    const pathname = usePathname()
    return (
        <div className={styles.container}>
        <div className={styles.title}>{pathname}</div>
        </div>
    )
}

export default Navbar