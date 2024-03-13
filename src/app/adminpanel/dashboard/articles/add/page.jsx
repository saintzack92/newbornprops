"use client";
import styles from "../../../ui/dashboard/products/addProduct/addProduct.module.css";
import img from "../../../../../../public/7.jpg";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { ReactQuil } from "../../../ui/dashboard/component/quill"; // Adjust the path as necessary

const AddProductPage = () => {
  const [formValues, setFormValues] = useState({
    title: "",
    category: "",
    slug: "",
    click: 0, // If this is meant to be a number, you might initialize it as null or 0.
    isActive: true, // Initialize as false rather than an empty string.
    isHighlights: false, // Initialize as false rather than an empty string.
    fileUrl: "", // This is okay, but ensure you're using it as intended.
    content: { html: "" },
  });
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const fileInputRef = useRef(null); // Using useRef for the file input

  const handleImageChange = (e) => {
    e.preventDefault();
    if (e.target.files.length === 0) {
      // No file was selected (user clicked cancel)
      return; // Simply return without doing anything
    }

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
    };

    reader.readAsDataURL(file);
  };
  const handleRemoveImage = () => {
    setImagePreviewUrl(''); // Use setImagePreviewUrl to update state
    // Reset the file input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for category selection and file selection
    if (!formValues.category) {
      alert("Please select a valid category");
      return;
    }

    const fileInput = document.getElementById("fileUpload");
    const file = fileInput.files[0];
    if (!file) {
      alert("Please upload an image.");
      return;
    }

    const formData = new FormData();

    // Append the file
    formData.append("image", file);

    // Append other form data
    for (const key in formValues) {
      if (key === "content") {
        formData.append(key, JSON.stringify(formValues[key])); // Assuming content needs to be stringified
      } else {
        formData.append(key, formValues[key]);
      }
    }

    try {
      const response = await fetch("/api/upload", {
        // Adjust the endpoint as needed
        method: "POST",
        body: formData, // No Content-Type header needed; fetch adds it automatically with the correct boundary
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      console.log("Success:", data);
      alert("Product added successfully!");
      // Here, you might want to reset form state or redirect the user
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add the product.");
    }
  };

  const generateSlug = () => {
    const { title } = formValues;

    if (title) {
      const slug = title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
        .replace(/-+/g, "-");

      setFormValues((prevValues) => ({
        ...prevValues,
        slug: slug,
      }));
    }
  };

  return (
    <div
      className={`${styles.container} bg-[var(--bgSoft)] p-[20px] rounded-[10px] mt-[20px] `}
    >
      <form
        className={`${styles.form} flex flex-wrap justify-between`}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="title"
          name="title"
          required
          className={`${styles.formChild} ${styles.formChildInput} `}
          onChange={handleChange}
        />
        <select
          name="category"
          id="category"
          className={`${styles.formChild} ${styles.formChildInput}`}
          onChange={handleChange}
          value={formValues.category}
        >
          <option value="" disabled>
            Choose a Category
          </option>
          <option value="computer">Computer</option>
          <option value="tv">TV</option>
          <option value="keyboard">Keyboard</option>
          <option value="modem">Modem</option>
        </select>

        <div className={`${styles.slugParent} w-[45%] gap-1`}>
          <input
            type="text"
            placeholder="slug"
            name="slug"
            value={formValues.slug} // Bind input value to formValues.slug
            required
            className={`flex-1 p-[30px] bg-[var(--bg)] text-[var(--text)] ${styles.formChildInput}`}
            onChange={handleChange}
          />

          <button
            type="button"
            className={`p-[25px] text-[var(--text)] rounded-[5px] border-none transition  bg-[teal] hover:bg-[#257272]`} // You will need to create this class
            onClick={generateSlug}
          >
            Random
          </button>
        </div>

        <input
          disabled
          type="number"
          placeholder="click"
          name="click"
          required
          className={`${styles.formChild} ${styles.formChildInput}`}
          onChange={handleChange}
        />
        <div className={` w-[45%] flex flex-col h-[50%] justify-between items-center border-none `}>
          <label className="text-left w-full text-[#8f94a1]">isActive</label>
          <select
            name="isActive"
            id="isActive"
            className={`w-full p-[30px] bg-[var(--bg)] text-[var(--text)] rounded-[5px] border-[2px] border-solid border-[#2e374a]`}
            value={formValues.isActive} // Controlled component approach
            onChange={handleChange} // Ensure you have a handler function to update state
          >
            <option value="" disabled>Is Active?</option>{" "}
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>
        <div className={`w-[45%] flex flex-col h-[50%] justify-between items-center border-none `}>
          <label className="text-left w-full text-[#8f94a1]">isHighlights</label>
          <select
            name="isHighlights"
            id="isHighlights"
            className={`${styles.formChild} w-full`}
            value={formValues.isHighlights} // Controlled component approach
            onChange={handleChange} // Ensure you have a handler function to update state
          >
            <option value="" disabled>Is Active?</option>{" "}
            {/* No value for placeholder option */}
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>


        <div
          className={`w-full gap-[20px] flex flex-col rounded-[5px] py-[80px] mb-[20px] bg-[var(--bg)] justify-center text-center items-center border-solid border-[#2e374a] border-2`}
        >
           
          <div
            className={`w-[95%] gap-[20px] flex flex-col rounded-[5px]  mb-[20px] bg-[var(--bg)] justify-center text-center items-center border-solid border-[#2e374a] border-2 relative z-0 h-[400px]`}
          >
            {imagePreviewUrl && (
          // <div className="flex  bg-[blue] w-full">
          <div className={`w-[100%] h-full px-[20px] gap-[20px] relative flex-col rounded-[5px]  bg-[var(--bg)] justify-center text-center items-center border-none inline-block `}
          >
            <button onClick={handleRemoveImage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline right-2 z-50 absolute  ">X</button> 
            <img
              src={imagePreviewUrl}
              alt="Image Preview"
              style={{ width: "100%" }} // Adjust styling as needed
              className={`z-10 flex absolute object-contain h-full`}
            />
          </div>
            
            
        )}

            {!imagePreviewUrl && "Upload your main image here"}
            <input
              type="file"
              id="fileUpload"
              name="fileUrl"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <label
              htmlFor="fileUpload"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline absolute bottom-2 z-50"
            >
              Select File
            </label>
          </div>
          <h1>Input your article here</h1>
          <ReactQuil
            className="h-[550px] px-[30px] mb-[20px] w-full "
            onChange={(htmlContent) => {
              setFormValues((prevState) => ({
                ...prevState,
                content: { html: htmlContent },
              }));
            }}
          />
        </div>

        <button
          type="submit"
          className={` w-[100%] p-[30px] !bg-[teal] !text-[var(--text)] rounded-[5px] cursor-pointer ${styles.formChild}`}
        >
          Publish
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;
