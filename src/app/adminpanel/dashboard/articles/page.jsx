"use client";
import styles from "../../../adminpanel/ui/dashboard/products/products.module.css";
import Search from "../../ui/dashboard/search/search";
import Link from "next/link";
import Pagination from "../../ui/dashboard/pagination/pagination";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CardTable from "../../ui/dashboard/card/cardTabel";

const ProductsPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
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
        // Consider redirecting to login if unauthorized
        if (error.message.includes("401")) {
          router.push("/login");
        }
      }
    };

    fetchData();
  }, [currentPage, router]);
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(1, prevPage - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(totalPages, prevPage + 1));
  };
  const handleViewProduct = (slug) => {
    router.push(`articles/${slug}`); // Navigate to the single product page
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
              />
            ))
          ) : (
            <tr>
              <th colspan="12">
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
