"use client"
import styles from "../../../adminpanel/ui/dashboard/products/products.module.css";
import Search from "../../ui/dashboard/search/search";
import Link from "next/link";
import Pagination from "../../ui/dashboard/pagination/pagination";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CardTable from "../../ui/dashboard/card/cardTabel";
  

const ProductsPage = ()=>{
  const router = useRouter()
  
  const [formData, setFormData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const userToken = localStorage.getItem('token');
    if (!userToken) {
      console.log('No user token found');
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/article/all?page=${currentPage}&limit=${itemsPerPage}`, {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${userToken}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data.articles); // Check if articles contain a 'slug' property
        setFormData(data.articles);
        // Set totalPages based on the response, assuming "lastPage" is the total number of pages
        setTotalPages(data.lastPage); // Adjusted to use the lastPage from the response
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [currentPage]); // Removed itemsPerPage from dependencies since it's a constant

  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(1, prevPage - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(totalPages, prevPage + 1));
  };
  const handleViewProduct = (slug) => {
    router.push(`articles/${slug}`); // Navigate to the single product page
  };

    return (
        <div
      className={`${styles.container} p-[20px] bg-[var(--bgSoft)] rounded-[10px] mt-[20px]`}
    >
      <div className={`${styles.top} flex items-center justify-between py-[10px]`}>
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
            <td>Description</td>
            <td>Price</td>
            <td>Created At</td>
            <td>Stock</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody >
        {formData.map((formDatas) => (
          
            <CardTable
              key={formDatas.id}
              title={formDatas.title}
              category={formDatas.category}
              description={formDatas.description}
              isActive={formDatas.active}
              isHighlights={formDatas.highlights}
              slug={formDatas.slug} // Ensure this is correctly passed

            />
            
          ))}
        </tbody>
      </table>
      <Pagination 
      nextFunc={handleNextPage}
      prevPage={handlePrevPage}
      currentPage={currentPage}
      totalPages={totalPages}
      />
    </div>
    )
}

export default ProductsPage