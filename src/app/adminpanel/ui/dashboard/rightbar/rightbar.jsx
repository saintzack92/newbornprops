import styles from "./rightbar.module.css";
import Image from "next/image";
import { MdPlayCircleFilled, MdReadMore } from "react-icons/md";
import RightbarCard from "./rightbarCard";

const Rightbar = () => {
  return (
    <div className={`${styles.container} fixed`}>
    
      <RightbarCard
        title="available now"
        descHow="how to finish this in 4 second"
        descTitle="takes 4 minutes to learn"
        descThree="lorem ipsum dolor sit amet consectatur adipiscing elit. reprehenderit elus libero perspiciatis recusandae possimus."
      />
      <RightbarCard
        title="available now"
        descHow="how to finish this in 4 second"
        descTitle="takes 4 minutes to learn"
        descThree="lorem ipsum dolor sit amet consectatur adipiscing elit. reprehenderit elus libero perspiciatis recusandae possimus."
      />
    </div>
  );
};
export default Rightbar;
