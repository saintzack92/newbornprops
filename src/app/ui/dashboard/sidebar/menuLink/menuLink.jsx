"use client"
import { usePathname } from "next/navigation";
import styles from "./menuLink.module.css";
import Link from "next/link";

const MenuLink = ({ item, className }) => {
    const pathname =usePathname()
  return (
    <Link
      href={item.path} 
      className={`${styles.container} ${pathname === item.path && styles.active} hover:bg-[#2e374a] flex p-2 hover:rounded mt-[5px] ${className}`}
    >
      <div className=" flex padding-[20px] align-center gap-[10px] ">
        <div className=" pt-[4px] mr-2">{item.icon}</div>
        <div className="">{item.title}</div>
      </div>
    </Link>
  );
};

export default MenuLink;
