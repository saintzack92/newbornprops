  "use client"
  // Make sure all your imports are correct
import { useEffect, useState } from "react";
import styles from "./transactions.module.css";
import CardTable from "../card/cardTabel";
import Pagination from "../pagination/pagination";
// import CardTable from "../card/cardTable"; // Ensure this path is correct

const Transactions = () => {
  const [formData, setFormData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/article/all?page=${currentPage}&limit=${itemsPerPage}`, // Adjust the endpoint if necessary
          {
            method: "GET",
            credentials: 'include', // Include credentials to send cookies
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setFormData(data.articles); // Adjust according to your API response
        setTotalPages(data.lastPage); // Assuming "lastPage" is provided in your response
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [currentPage]);
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(1, prevPage - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(totalPages, prevPage + 1));
  };
  return (
    <div className={`${styles.container} bg-[var(--bgSoft)] rounded-[10px] p-[20px]`}>
      <h2 className={`${styles.title} mb-[20px] font-[200] text-[var(--softColor)]`}>
        Latest Transactions
      </h2>
      <table className={`${styles.table} w-[100%]`}>
        <thead>
          <tr>
            <td>Title</td>
            <td>Category</td>
            <td>Slug</td>
            <td>isActive</td>
            <td>isHighlights</td>
          </tr>
        </thead>
        <tbody>
          {formData.map((formDatas) => (
            <CardTable
              key={formDatas.id}
              title={formDatas.title}
              category={formDatas.category}
              description={formDatas.description}
              isActive={formDatas.active}
              isHighlights={formDatas.highlights}
            />
          ))}
        </tbody>
      </table>
      {/* <div className="pagination-controls">
        <button onClick={handlePrevPage} disabled={currentPage <= 1}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={currentPage >= totalPages}>
          Next
        </button>
      </div> */}
      <div>
      <Pagination />
      </div>
      
    </div>
  );
};

export default Transactions;
