import { MdPeople } from "react-icons/md";
import styles from "./transactions.module.css";
import Image from "next/image";
import CardTable from "../card/cardTabel";

const Transactions = () => {
  return (
    <div
      className={`${styles.container} bg-[var(--bgSoft)] rounded-[10px] p-[20px] `}
    >
      <h2
        className={`${styles.title} mb-[20px] font-[200] text-[var(--softColor)] `}
      >
        Latest Transactions
      </h2>
      <table className={`${styles.table} w-[100%]`}>
        <thead>
          <tr className="*:p-[10px]">
            <td>Name</td>
            <td>Status</td>
            <td>Date</td>
            <td>Amount</td>
          </tr>
        </thead>
        <tbody className="">
          <CardTable isPositive={true} status={"pending"} />
          <CardTable isPositive={true} status={"done"}/>
          <CardTable isPositive={true} status={"cancel"}/>
          <CardTable isPositive={false} status={"pending"}/>
          <CardTable isPositive={true} status={"done"}/>
        </tbody>
      </table>
    </div>
  );
};
export default Transactions;
