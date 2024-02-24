import Card from "../ui/dashboard/component/card";
import RightBar from "../ui/dashboard/rightbar/rightbar";
import Transactions from "../ui/dashboard/transactions/transactions";
import Chart from "../ui/dashboard/chart/chart";
import styles from "../ui/dashboard/dashboard.module.css";

const Dashboard = () => {
  return (
    <div className={`${styles.wrapper} flex gap-[20px] mt-[20px] justify-between  bg-[var(--bg)] text-[var(--text)] `}>
      <div className={`${styles.main} flex-[3] flex flex-col gap-[20px] `}>
        <div className={`${styles.card} flex gap-[20px] justify-between`}>
          <Card />
          <Card />
          <Card />
        </div>
        <Transactions />
        <Chart />
      </div>
      <div className={`${styles.side} flex-[1] right-0`}>
        <RightBar />
      </div>
    </div>
  );
};

export default Dashboard;
