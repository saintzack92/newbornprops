import { MdSupervisedUserCircle } from "react-icons/md";
import styles from "./card.module.css";

const Card = () => {
  return (
    <div className={`${styles.container} bg-[var(--bgSoft)] p-[20px] rounded-[10px] flex cursor-pointer w-[100%] hover:bg-[#2e374a] hover:duration-100  hover:ease-in hover:scale-[103%]`}>
      <MdSupervisedUserCircle size={24} />
      <div className={`${styles.texts} flex flex-col gap-[20px]`}>
        <span className={`${styles.title}`}> Total Users</span>
        <span className={`${styles.number} font-[24px] font-[500] `}> 10.274</span>
        <span className={`${styles.detail} font-[12px] font-[300]`}>
          <span className={`${styles.positive} text-[lime]`}>12%</span>
          more than previous week
        </span>
      </div>
    </div>
  );
};
export default Card;
