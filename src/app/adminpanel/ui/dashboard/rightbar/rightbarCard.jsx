import Image from "next/image";
import { MdPlayCircleFilled } from "react-icons/md";
import styles from "./rightbar.module.css";
import balap from "../../../../../../public/7.jpg";

const RightbarCard = ({ title, descHow, descTitle, descThree }) => {
  return (
    <>
      <div 
      className={`${styles.item} relative px-[20px] py-[24px] rounded-[10px] mb-[20px] `}
      style={{background:'linear-gradient(to top, #182237, #253352)'}}
      >
        <div
          className={`${styles.bgContainer} absolute w-[50%] h-[50%] right-0 bottom-0 `}
        >
          <Image
            src={balap}
            alt="balap euy"
            fill
            className="object-contain opacity-20"
          />
        </div>
        <div className={`${styles.texts} flex flex-col gap-[24px]`}>
          <span className={`${styles.notification} font-bold`}>{title}</span>
          <h3 className={`${styles.title}font-500 font-[12px] text-[var(--textSoft)]`}>{descHow}</h3>
          <span className={`${styles.subtitle}`}>{descTitle}</span>
          <p className={`${styles.desc}`}>{descThree}</p>
          <button className={`${styles.button} p-[10px]  flex items-center gap-[10px] bg-[#5d57c9] text-[white] border-none rounded-[5px] cursor-pointer w-max`}>
            <MdPlayCircleFilled />
            <span>Watch</span>
          </button>
        </div>
      </div>
    </>
  );
};
export default RightbarCard;
