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
  checked,
  onChange,
}) => {

  const stripHtmlAndTruncate = (html, length = 50) => {
    if (html === null || html === undefined) return ""; // Return empty string if input is null or undefined
    const text = html.replace(/<\/?[^>]+(>|$)/g, ""); // Strip HTML tags
    return text.length > length ? text.substr(0, length) + "..." : text; // Truncate
  };
  // Inside CardTable component
  const deleteButtonHandler = () => {
    onClick(id);
  };
  // CardTable Component
const changeToggleHandler = () => {
  const newActiveState = !isActive; // Toggle the current state
  if (typeof onChange === 'function') {
    onChange(id, newActiveState); // Pass the toggled state
  }
};


  const processedDescription = stripHtmlAndTruncate(description);

  const highlightsText = isHighlights ? "On" : "Off";
  // Determine icon color

  return (
    <tr className="items-center *:p-[10px]">
      <td className={`flex items-center gap-[10px] ${classTd}`}>
        <MdPeople
          size={40}
          className={` text-[red] bg-green-300 rounded-full p-[3px] object-cover ${className}`}
        />
        <div>{title}</div>
      </td>
      <td className={`${classTd}`}>
        <span className={`${styles.status}`}>{category}</span>
      </td>
      <td className={`${classTd}`}>{processedDescription}</td>
      <td className={`${classTd}`}>
        <Toggle
          id={id}
          checked={isActive} // Assuming `isActive` reflects the current state
          onChange={() => changeToggleHandler()} // Adapt as needed, may pass `e` or specific data
        />
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
