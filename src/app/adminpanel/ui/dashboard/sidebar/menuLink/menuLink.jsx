"use client"
import { usePathname } from "next/navigation";
import styles from "./menuLink.module.css";
import Link from "next/link";

const MenuLink = ({ item, className }) => {
    const pathname =usePathname()
  return (
    <Link
      href={item.path} 
      className={` ${pathname === item.path && styles.active} flex  hover:bg-[#2e374a] p-[20px] align-center gap-[10px] hover:rounded-[10px] mt-[5px]  ${className}`}>
      
        <div className=" pt-[4px]">{item.icon}</div>
        <div className="">{item.title}</div>
      
    </Link>
  );
};

export default MenuLink;
