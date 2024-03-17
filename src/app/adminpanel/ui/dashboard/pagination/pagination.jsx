"use client"
import styles from "./pagination.module.css";

const Pagination = ({ nextFunc, prevPage, currentPage, totalPages }) => {
  return (
    <div className={`${styles.container} p-[10px] flex justify-between`}>
      <button
        onClick={prevPage} // Corrected from "disabledonClick"
        disabled={currentPage <= 1}
        className={`${styles.prev} py-[5px] px-[10px] cursor-pointer disabled:cursor-not-allowed bg-[grey] rounded-[5px]`}
      >
        Previous
      </button>
      <button 
        onClick={nextFunc}
        disabled={currentPage >= totalPages}
        className={`${styles.next} py-[5px] px-[10px] cursor-pointer bg-[white] text-[black] rounded-[5px]`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;