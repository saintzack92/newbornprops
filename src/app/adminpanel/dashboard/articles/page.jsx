"use client";
import styles from "../../../adminpanel/ui/dashboard/products/products.module.css";
import Search from "../../ui/dashboard/search/search";
import Link from "next/link";
import Pagination from "../../ui/dashboard/pagination/pagination";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import CardTable from "../../ui/dashboard/card/cardTabel";
import useAuthCheck from "@/app/application/components/refreshToken";
import Dialog from "../../ui/dashboard/component/dialogModal";

const ProductsPage = () => {
  useAuthCheck();
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
    }
  };
  useEffect(() => {
    // Read the current page number from localStorage when the component mounts

    const savedPage = parseInt(localStorage.getItem('currentPage'), 10);

    if (savedPage) {
      setCurrentPage(parseInt(savedPage, 10));
    } else {
      setCurrentPage(1);
      localStorage.setItem("currentPage", "1"); // Initialize if not present
    }

    fetchData();
  }, []); // This effect should run once on mount

  useEffect(() => {
    fetchData(); // Call fetchData whenever currentPage changes
    localStorage.setItem("currentPage", currentPage.toString()); // Update localStorage with the new current page
  }, [currentPage]); // Removed router from dependencies to avoid re-fetching on router change
  //==

  const [dialogContent, setDialogContent] = useState({
    message: "",
    nameProduct: "",
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // const idTargetRef = useRef();

  const [confirmDialogContext, setConfirmDialogContext] = useState(null);


  const handlePrevPage = () => {
    const newPage = Math.max(1, currentPage - 1);
    setCurrentPage(newPage);
    localStorage.setItem("currentPage", newPage.toString());
  };

  const handleNextPage = () => {
    const newPage = Math.min(totalPages, currentPage + 1);
    setCurrentPage(newPage);
    localStorage.setItem("currentPage", newPage.toString());
  };

  const handleDelete = async (articleId) => {
    console.log(articleId, "Attempting to delete article with ID");
    if (!articleId) {
      alert("Article ID is missing.");
      return;
    }

    try {
      console.log("In delete button for ID:", articleId);
      const response = await fetch(
        `http://localhost:3000/article/delete/${articleId}`,
        {
          method: "DELETE", // Specify the request method
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete the article");
      }
      alert('Article deleted successfully');
      fetchData();
    } catch (error) {
      console.error("Error deleting the article:", error);
      alert("Error deleting the article");
    }
  };

  const handleToggleActive = (articleId, newActiveState) => {
    console.log(`handleToggleActive called for ID: ${articleId}, newActiveState: ${newActiveState}`);
    setConfirmDialogContext({ articleId, newActiveState });
    console.log(setConfirmDialogContext({ articleId, newActiveState }));
    setDialogContent({
      message: `Are you sure you want to change active state to ${newActiveState ? "true" : "false"}?`,
      nameProduct: `Product ID: ${articleId}`,
    });
    console.log(`Setting confirmDialogContext:`, { articleId, newActiveState });

    setIsDialogOpen(true);
    console.log(`Executing areUSureConfirm with context:`, confirmDialogContext);

  };
  const areUSureConfirm = async (choose) => {
    setIsDialogOpen(false); // Close the dialog
    if (choose && confirmDialogContext) {
      const { articleId, newActiveState } = confirmDialogContext;
      console.log(`Confirming active state toggle for ID: ${articleId}, New State: ${newActiveState}`);


      try {
        const response = await fetch(
          `http://localhost:3000/article/update/${articleId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ active: newActiveState }),
            credentials: "include", // Ensure credentials are included if needed for authentication
          }
        );

        if (!response.ok)
          throw new Error(
            `Failed to update the article: ${response.statusText}`
          );

        fetchData(); // Reload your articles to reflect the change
        setConfirmDialogContext(null);
      } catch (error) {
        console.error("Error updating the article:", error);
        alert("Error updating the article");
      }
    } else {
      console.error("ID is undefined:", idTargetRef.current);
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
                id={formDatas.id}
                key={formDatas.id}
                title={formDatas.title}
                category={formDatas.category}
                description={formDatas.description}
                isActive={formDatas.active}
                isHighlights={formDatas.highlights}
                slug={formDatas.slug}
                onClick={() => handleDelete(formDatas.id)}
                onChange={handleToggleActive}
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
      {isDialogOpen && (
        <Dialog

          message={dialogContent.message}
          nameTarget={dialogContent.nameProduct}
          onDialog={(choice) => {
            setIsDialogOpen(false);
            if (choice) {
              areUSureConfirm(true);
            }
          }}
          yesConfirmation="Yes"
          noConfirmation="No"
        />
      )}
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
