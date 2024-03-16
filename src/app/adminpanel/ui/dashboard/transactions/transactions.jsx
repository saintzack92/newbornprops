"use client"
import { MdPeople } from "react-icons/md";
import styles from "./transactions.module.css";
import Image from "next/image";
import CardTable from "../card/cardTabel";
import { useEffect, useState } from "react";

const Transactions = () => {
  const [formData, setFormData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0); // Assuming you know total pages or calculate based on total items
  const itemsPerPage = 10; // Assuming each page shows 10 items
  useEffect(() => {
    const userToken = localStorage.getItem('token');
    if (!userToken) {
      console.log('No user token found');
      return;
    }

    // Check if currentPage is not a number or is less than 1
    const validCurrentPage = isNaN(currentPage) || currentPage < 1 ? 1 : currentPage;

    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/article/all?page=${validCurrentPage}&limit=${itemsPerPage}`, {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${userToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setFormData(data.articles);
        setTotalPages(Math.ceil(data.totalItems / itemsPerPage));
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [currentPage, itemsPerPage]); // itemsPerPage is included to keep the dependencies array consistent

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages, prev + 1));
  };
  
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
          <tr className="*:p-[10px] ">
            <td>Title</td>
            <td>Category</td>
            <td>Slug</td>
            <td>isActive</td>
            <td>isHighlights</td>
          </tr>
        </thead>
        <tbody className="">
          {formData.map((formDatas) => (
            <CardTable
              key={formDatas.id} // Assuming each transaction has a unique id
              title={formDatas.title} // Assuming API provides this or you define the logic
              category={formDatas.category}
              description={formDatas.description} // Format the date as needed
              isActive={formDatas.active} // Format the amount as needed
              isHighlights={formDatas.highlights} // Use this to toggle On/Off
            />
          ))}
        </tbody>
      </table>
      <div className="pagination-controls">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};
export default Transactions;
