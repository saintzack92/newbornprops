"use client";
import styles from "../../../adminpanel/ui/dashboard/products/products.module.css";
import Search from "../../ui/dashboard/search/search";
import Link from "next/link";
import Pagination from "../../ui/dashboard/pagination/pagination";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import CardTable from "../../ui/dashboard/card/cardTabel";
import useAuthCheck from "@/app/application/components/refreshToken";

const ProductsPage = () => {
  
  const router = useRouter();

  const [formData, setFormData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 10;

  // Make fetchData a standalone function that can be called
  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/article/all?page=${currentPage}&limit=${itemsPerPage}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setFormData(data.articles);
      setTotalPages(data.lastPage);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      if (error.message.includes("401")) {
        router.push("/login");
      }
    }
  };
  useEffect(() => {
    // Read the current page number from localStorage when the component mounts
    const savedPage = parseInt(localStorage.getItem('currentPage'), 10);
    
    if (savedPage && !isNaN(savedPage) && savedPage >= 1) {
      setCurrentPage(savedPage);
    } else {
      setCurrentPage(1);
    }
    
    fetchData();
  }, []); // This effect should run once on mount
  
  useEffect(() => {
    fetchData();
  }, [currentPage]); // Removed router from dependencies to avoid re-fetching on router change

  const handlePrevPage = () => {
    const newPage = Math.max(1, currentPage - 1);
    setCurrentPage(newPage);
    localStorage.setItem('currentPage', newPage.toString());
  };
  
  const handleNextPage = () => {
    const newPage = Math.min(totalPages, currentPage + 1);
    setCurrentPage(newPage);
    localStorage.setItem('currentPage', newPage.toString());
  };
  
  const handleDelete = async (articleId) => {
    console.log(articleId, 'Attempting to delete article with ID');
    if (!articleId) {
      alert('Article ID is missing.');
      return;
    }

    try {
      console.log('In delete button for ID:', articleId);
      const response = await fetch(`http://localhost:3000/article/delete/${articleId}`, {
        method: 'DELETE', // Specify the request method
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error('Failed to delete the article');
      }

      // Handle success response
      alert('Article deleted successfully');
      // After deletion, you might want to refresh the list of articles
      // This could be a direct call to your fetchData function or another mechanism
      // to ensure the UI reflects the current state of your data
      // const newFormData = formData.filter(article => article.id !== articleId);
      // setFormData(newFormData);
      fetchData();
      // Optionally, redirect or update UI upon successful deletion
    } catch (error) {
      console.error('Error deleting the article:', error);
      alert('Error deleting the article');
    }
  };


  return (
    <div
      className={`${styles.container} p-[20px] bg-[var(--bgSoft)] rounded-[10px] mt-[20px]`}
    >
      <div
        className={`${styles.top} flex items-center justify-between py-[10px]`}
      >
        <Search placeholder="Search for a user" />
        <Link href={"articles/add"}>
          <button
            className={`${styles.addButton} p-[10px] bg-[#5d57c9] text-[var(--text) rounded-[10px] border-none cursor-pointer`}
          >
            {" "}
            Add New
          </button>
        </Link>
      </div>
      <table className={`${styles.table} w-[100%]`}>
        <thead className="">
          <tr>
            <td>Title</td>
            <td>Category</td>
            <td>Description</td>
            <td>Active</td>
            <td>Highlights</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {formData.length > 0 ? (
            formData.map((formDatas) => (
              <CardTable
                key={formDatas.id}
                title={formDatas.title}
                category={formDatas.category}
                description={formDatas.description}
                isActive={formDatas.active}
                isHighlights={formDatas.highlights}
                slug={formDatas.slug} // Ensure this is correctly passed
                onClick={() => handleDelete(formDatas.id)}
              />
            ))
          ) : (
            <tr>
              <th colSpan="12">
                <div className="text-center m-3 p-3">
                  - Data tidak ditemukan -
                </div>
              </th>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination
        nextFunc={handleNextPage}
        prevPage={handlePrevPage}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default ProductsPage;
