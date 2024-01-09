import styles from "./pagination.module.css";

const Pagination = () => {
  return (
    <div className={`${styles.container} p-[10px] flex justify-between`}>
      <button
        disabled
        className={`${styles.prev} py-[5px] px-[10px] cursor-pointer disabled:cursor-not-allowed bg-[grey] rounded-[5px]`}
      >
        Previous
      </button>
      <button className={`${styles.next} py-[5px] px-[10px] cursor-pointer bg-[white] text-[black] rounded-[5px]`}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
