"use client";
import { usePathname } from "next/navigation";
import styles from "./navbar.module.css";
import {
  MdNotifications,
  MdOutlineChat,
  MdPublic,
  MdSearch,
} from "react-icons/md";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <div className={`${styles.container} flex justify-between items-center bg-[var(--bgSoft)] p-[20px] rounded-[10px] `}>
      <div className={`${styles.title} text-[var(--textSoft)]  font-bold capitalize `}>{pathname.split("/").pop()}</div>
      <div className={`${styles.menu} flex justify-center`}>
        <div className={`${styles.search} flex  items-center gap-[10px] bg-[#2e374a] p-[10px] rounded-[10px]`}>          
            <MdSearch />
            <input
              type="text"
              placeholder="search ..."
              className={`${styles.input} bg-transparent border-pink-500 focus:outline-none text-[var(--textSoft)]`}
            />         
        </div>
        <div className={`${styles.icons} flex gap-[20px] items-center pl-[1rem]`}>
            <MdOutlineChat size={20} />        
            <MdNotifications size={20} />       
            <MdPublic size={20} />
         
        </div>
      </div>
    </div>
  );
};

export default Navbar;
