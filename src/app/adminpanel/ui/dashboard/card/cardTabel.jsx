import { MdPeople } from "react-icons/md";
import styles from "./card.module.css";
import Link from "next/link";
import Toggle from "../component/switch";

const CardTable = ({
  isPositive,
  className,
  classTd,
  status,
  title,
  category,
  description,
  isActive,
  isHighlights,
  slug,
  onClick,
  id,
}) => {
  // Function to generate a random Tailwind CSS color class
  const getRandomColor = () => {
    const colors = [
      "bg-blue-500",
      "bg-yellow-500",
      "bg-indigo-500",
      "bg-purple-500",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Check if status is defined
  const isStatusDefined = status !== undefined && status !== null;

  // Determine the color based on the status
  const statusColor = isStatusDefined
    ? status === "cancel"
      ? "text-indigo-500"
      : status === "done"
      ? "text-green-500"
      : status === "pending"
      ? "text-red-500"
      : "text-yellow-200"
    : "";

  // Handle status text display
  const stripHtmlAndTruncate = (html, length = 50) => {
    if (html === null || html === undefined) return ""; // Return empty string if input is null or undefined
    const text = html.replace(/<\/?[^>]+(>|$)/g, ""); // Strip HTML tags
    return text.length > length ? text.substr(0, length) + "..." : text; // Truncate
  };
  // Inside CardTable component
  const deleteButtonHandler = () => {
    // Call the passed handleDelete function with the article's ID
    onClick(id); // Assuming 'slug' uniquely identifies an article
  };

  // In the JSX of CardTable

  const processedDescription = stripHtmlAndTruncate(description);

  const statusText = isStatusDefined
    ? status.charAt(0).toUpperCase() + status.slice(1)
    : "";
  const activeText = isActive ? "On" : "Off";
  const highlightsText = isHighlights ? "On" : "Off";
  // Determine icon color
  const iconColorClass = isPositive ? getRandomColor() : "bg-green-500";

  return (
    <tr className="items-center *:p-[10px]">
      <td className={`flex items-center gap-[10px] ${classTd}`}>
        <MdPeople
          size={40}
          className={`${iconColorClass} text-[red] bg-green-300 rounded-full p-[3px] object-cover ${className}`}
        />
        <div>{title}</div>
      </td>
      <td className={`${classTd}`}>
        <span className={`${styles.status} ${statusColor}`}>{category}</span>
      </td>
      <td className={`${classTd}`}>{processedDescription}</td>
      <td className={`${classTd}`}>
        <Toggle checked={isActive} />
      </td>
      <td className={`${classTd}`}>{highlightsText}</td>
      <td>
        <div className={`${styles.button} flex gap-[10px]`}>
          <Link href={`articles/${slug}`}>
            <button
              className={`${styles.button} py-[5px] px-[10px] rounded-[5px] text-[var(--text)] border-none cursor-pointer bg-[teal]`}
            >
              View
            </button>
          </Link>
          <button
            onClick={deleteButtonHandler}
            className={`${styles.button} py-[5px] px-[10px] rounded-[5px] text-[var(--text)] border-none cursor-pointer bg-[crimson]`}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CardTable;
