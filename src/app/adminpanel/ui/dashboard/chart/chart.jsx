"use client"
import styles from "./chart.module.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Mon",
    visit: 3000,
    click: 1390,
  },
  {
    name: "Tue",
    visit: 5000,
    click: 2390,
  },
  {
    name: "Wed",
    visit: 3500,
    click: 2190,
  },
  {
    name: "Thu",
    visit: 1500,
    click: 1000,
  },
  {
    name: "Fri",
    visit: 5000,
    click: 8590,
  },
  {
    name: "Sat",
    visit: 6000,
    click: 3590,
  }
];

const Chart = () => {
  return (
    <div className={`${styles.container} h-[450px] bg-[var(--bgSoft)]`}>
      <h2 className={`font-200 text-[var(--textSoft)] mb-[20px]`}> Weekly Capitulation</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30, 
            left: 20,
            bottom: 5,
          }}
          
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip contentStyle={{background:'#151c2c', border:'none'}}/>
          <Legend />
          <Line
            type="monotone"
            dataKey="visit"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="click" stroke="#82ca9d" activeDot={{r:8}} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
export default Chart;
