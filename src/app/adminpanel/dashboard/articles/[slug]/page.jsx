"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "../../../ui/dashboard/users/addUser/singleUser/singleUser.module.css";
import Input from "../../../ui/dashboard/input/input";
import Image from "next/image";
import { ReactQuil } from "@/app/adminpanel/ui/dashboard/component/quill";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import useAuthCheck from "@/app/application/components/refreshToken";

const SingleProductPage = () => {
  useAuthCheck()
  const router = useRouter();
  const searchParams = usePathname();
  const slug = searchParams.split("/").pop();
  const [editorContent, setEditorContent] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    highlights: false,
    active: false,
    amountClicking: 0,
    description: "",
    slug: "",
    file: "",
    // Add other fields as necessary
  });
  const [fileObject, setFileObject] = useState(null); // Add this state to store the file object
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [isImageMarkedForRemoval, setIsImageMarkedForRemoval] = useState(false);
  const fileInputRef = useRef(null);
  const [imageKey, setImageKey] = useState("");

  const allCategories = [
    { value: "category1", label: "Category 1" },
    { value: "category2", label: "Category 2" },
    { value: "hukum", label: "Hukum" },
    { value: "nasional", label: "Nasional" },
    { value: "keluarga", label: "Keluarga" },
    // Include other categories as needed
  ];
  const activeCategories = [
    { value: false, label: "Tidak Aktif " },
    { value: true, label: "Aktif" },
    // Include other categories as needed
  ];
  const categoryOptions = () => {
    let options = allCategories.slice(); // Clone the allCategories array
    if (
      formData.category &&
      !options.some((option) => option.value === formData.category)
    ) {
      // If formData.category exists and is not in the options list, add it
      options.unshift({
        value: formData.category,
        label:
          formData.category.charAt(0).toUpperCase() +
          formData.category.slice(1),
      }); // Capitalize the first letter
    }
    return options;
  };
  const activeOptions = () => {
    let options = activeCategories.slice(); // Clone the allCategories array
    if (
      formData.active &&
      !options.some((option) => option.value === formData.active)
    ) {
      // If formData.category exists and is not in the options list, add it
      options.unshift({
        value: formData.active,
        label:
          formData.active.charAt(0).toUpperCase() + formData.active.slice(1),
      }); // Capitalize the first letter
    }
    return options;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Special handling for boolean values (like "active" and "highlights" fields)
    let newValue;
    if (name === "active" || name === "highlights") {
      newValue = value === "true";
    } else {
      newValue = value;
    }
    setFormData((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };
  const uploadImageToAWS = async (file) => {
    console.log("Uploading image to AWS", file);
    const formData = new FormData();
    formData.append("file", file);

    const uploadResponse = await fetch("http://localhost:3000/upload/single", {
      method: "POST",
      body: formData,
    });

    if (!uploadResponse.ok) {
      console.error("Failed to upload image to AWS");
      throw new Error("Failed to upload image to AWS");
    }

    const uploadData = await uploadResponse.json();
    console.log("Image uploaded to AWS, URL:", uploadData.url);
    return uploadData.url; // The AWS URL for the uploaded image
  };
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result); // Preview URL
      };
      reader.readAsDataURL(file);
      setFileObject(file);
      setFormData((prevFormData) => ({
        ...prevFormData,
        file: file, // Consider storing the file object directly if you plan to upload it on form submission
      }));
      setIsImageMarkedForRemoval(false); // Reset removal flag
    } else {
      // Handle cases where file selection is cleared
      setImagePreviewUrl("");
      setFileObject(null);
      setFormData((prevFormData) => ({
        ...prevFormData,
        file: "", // Clear the file in formData
      }));
    }
  };
  const deleteImage = async () => {
    if (!formData.file) {
      console.error("No file to delete");
      return;
    }

    // Extract the file key from the URL
    const fileKey = formData.file.split("amazonaws.com/")[1];

    try {
      const response = await fetch("http://localhost:3000/upload/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileKey }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete image");
      }

      const result = await response.json();
      console.log("Image deleted successfully:", result);
      // Update state or perform further actions as needed
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const handleRemoveImage = () => {
    setImagePreviewUrl("");
    setIsImageMarkedForRemoval(true); // Mark for removal
    setFileObject(null);// Mark for removal
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  useEffect(() => {
    if (!slug) {
      console.log("slug is :", null);
      return;
    }

    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:3000/article/slug/${slug}`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data, "data from get article");
        setFormData((currentData) => ({
          ...currentData,
          ...data,
          category: data.category || "defaultCategoryValue", // Good practice
        }));
        setEditorContent(data.description || "");
        setImagePreviewUrl(data.file || "");
      } else {
        console.error("Failed to fetch data:", response.statusText);
      }
    };

    fetchData();
  }, [slug]); // The dependency array is empty, meaning this effect runs once on mount

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    

    // Ensure formData is not directly mutated, create a copy instead
    let updatedFormData = { ...formData };

    if (imagePreviewUrl && fileObject) {
      // New image selected for upload
      const newImageURL = await uploadImageToAWS(fileObject);
      if (newImageURL) {
        // Successfully uploaded to AWS and received the new image URL
        updatedFormData.file = newImageURL; // Update formData copy with new image URL
      }
    } else if (!imagePreviewUrl && updatedFormData.file) {
      // No image preview and file exists, indicating a removal
      await deleteImage(updatedFormData.file); // Assume this function deletes the image from AWS
      updatedFormData.file = ""; // Clear the file URL in formData copya
    }

    if (isImageMarkedForRemoval && imageKey) {
      // An existing image is marked for removal
      await deleteImage(imageKey);
    }

    updatedFormData.description = editorContent;

    // Submit the updatedFormData to your backend
    try {
      const response = await fetch(`http://localhost:3000/article/update/${formData.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updatedFormData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log("Article updated successfully!");
      alert("Article updated successfully!");
    } catch (error) {
      console.error("Failed to update the article:", error);
      alert("Failed to update the article.");
    }
  };

  const handleDelete = async () => {
    // Assuming `id` is stored in `formData.id`
    const articleId = formData.id;
    if (!articleId) {
      alert('Article ID is missing.');
      return;
    }

    try {
      console.log('in delete button');
      const response = await fetch(`http://localhost:3000/article/delete/${articleId}`, {
        method: 'DELETE', // Specify the request method
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error('Failed to delete the article');
      }

      // Handle success response
      alert('Article deleted successfully');
      router.push('/adminpanel/dashboard/articles')
      // Optionally, redirect or update UI upon successful deletion
    } catch (error) {
      console.error('Error deleting the article:', error);
      alert('Error deleting the article');
    }
  };


  return (
    <div className={`${styles.container}  gap-[50px] mt-[20px]`}>
      <div
        className={`${styles.infoContainer} flex-[1] text-[var(--textSoft)] font-[500] h-max bg-[var(--bgSoft)] p-[20px] rounded-[10px] text-center`}
      >
        <div
          className={`${styles.imgContainer} w-[100%] h-[300px] relative rounded-[10px] mb-[20px] overflow-hidden z-0 flex items-center justify-center bg-[var(--bg)]`}
        >
          {imagePreviewUrl ? (
            // <div className="flex  bg-[blue] w-full">
            <div
              className={`w-[100%] h-full  gap-[20px] relative flex-col rounded-[5px]  bg-[var(--bg)] justify-center text-center items-center border-none z-0`}
            >
              <div
                className={`w-[100%] h-full  gap-[20px] relative flex-col rounded-[5px]  bg-[var(--bg)] justify-center text-center items-center border-none inline-block `}
              >
                <button
                  onClick={handleRemoveImage}
                  className="bg-[#dc3e3edd] hover:bg-[#dc3e3e] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline right-2 z-50 absolute  "
                >
                  X
                </button>
                <img
                  src={imagePreviewUrl}
                  alt="Single Image"
                  style={{ width: "100%" }} // Adjust styling as needed
                  className={`z-10 flex absolute object-contain h-full `}
                />
              </div>
            </div>
          ) : (
            <div>tidak ada gambar ditampilkan</div>
          )}
          <input
            type="file"
            id="fileUpload"
            name="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <label
            htmlFor="fileUpload"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline bottom-1 absolute  z-100"
          >
            Select File
          </label>
        </div>
        John Doe
      </div>
      <div
        className={`${styles.formContainer} flex-[3] text-[var(--textSoft)] p-[20px] rounded-[10px] bg-[var(--bgSoft)]`}
      >
        <form onSubmit={handleSubmit} className="flex flex-col">
          <Input
            type="text"
            name="title"
            placeholder="title"
            customClasses={`${styles}`}
            labelTxt="Title"
            value={formData.title}
            onChange={handleChange}
          />
          <Input
            isSelect={true}
            name="category"
            customClasses={`${styles}`}
            labelTxt="Category"
            value={formData.category} // Set the selected option based on formData.category
            onChange={handleChange} // Update formData state when a new option is selected
            options={categoryOptions()}
          />
          <Input
            type="text"
            name="slug"
            placeholder="slug"
            customClasses={`${styles}`}
            labelTxt="slug"
            value={formData.slug}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="amountClicking"
            placeholder="jumlah klik"
            customClasses={`${styles}`}
            labelTxt="jumlah klik"
            value={formData.amountClicking}
            disabled={true}
          />
          <Input
            isSelect={true}
            name="active"
            customClasses={styles}
            labelTxt="Active?"
            value={String(formData.active)} // Convert boolean to string for select
            onChange={handleChange}
            options={activeOptions()}
          />
          <Input
            isSelect={true}
            name="highlights"
            customClasses={`${styles}`}
            labelTxt="highlights?"
            value={String(formData.highlights)} // Convert boolean to string for select
            onChange={handleChange}
            options={activeOptions()}
          />
          <ReactQuil
            className={`${styles.formCreate} h-[400px] p-[20px] mb-[50px] w-full box-border`}
            onChange={(htmlContent) => {
              setEditorContent(htmlContent); // This might not be necessary if you're not doing anything else with the content outside of submitting it.
            }}
            value={editorContent} // This ensures the editor is initialized with the content from the API
          />
          <Input
            isButton={true}
            customClasses={`mt-[20px] border-none p-[20px]  `}
            name={"Update"}
            labelTxt={"Update"}
          />


        </form>
        <div className="flex flex-col">
          <Input
            onClick={handleDelete}
            isButton={true}
            customClasses={`mt-[20px] border-none p-[20px]  `}
            name={"Delete"}
            labelTxt={"Delete"}
          />
        </div>

      </div>
    </div>
  );
};

export default SingleProductPage;
