import { MdPeople } from "react-icons/md";
import styles from "./card.module.css";

const CardTable = ({ isPositive, className, classTd, status }) => {
    // Function to generate a random Tailwind CSS color class
    const getRandomColor = () => {
        const colors = [ 'bg-blue-500', 'bg-yellow-500', 'bg-indigo-500', 'bg-purple-500'];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    // Check if status is defined
    const isStatusDefined = status !== undefined && status !== null;

    // Determine the color based on the status
    const statusColor = isStatusDefined ? (status === 'cancel' ? 'text-indigo-500' 
                       : status === 'done' ? 'text-green-500' 
                       : status === 'pending' ? 'text-red-500' : 'text-yellow-200')
                       : '';

    // Handle status text display
    const statusText = isStatusDefined ? status.charAt(0).toUpperCase() + status.slice(1) : '';

    // Determine icon color
    const iconColorClass = isPositive ? getRandomColor() : "bg-green-500";

    return (
      <tr className="items-center *:p-[10px]">
        <td className={`flex items-center gap-[10px] ${classTd}`}>
          <MdPeople
            size={40}
            className={`${iconColorClass} text-[red] bg-green-300 rounded-full p-[3px] object-cover ${className}`}
          />
          <div>Mukidi</div>
        </td>
        <td className={`${classTd}`}>
          <span className={`${styles.status} ${statusColor}`}>{statusText}</span>
        </td>
        <td className={`${classTd}`}>14.04.2024</td>
        <td className={`${classTd}`}>$32.000</td>
      </tr>
    );
};
  
export default CardTable;
