"use client";
import styles from "../../../ui/dashboard/products/addProduct/addProduct.module.css";


import React, { useEffect, useRef, useState } from "react";
import { ReactQuil } from "../../../ui/dashboard/component/quill"; // Adjust the path as necessary
import { useRouter } from "next/router";

const AddProductPage = () => {
  
  const [formValues, setFormValues] = useState({
    title: "",
    category: "",
    slug: "",
    amountClicking: 0, // Assuming this is intended to be 'amountClicking' on the backend.
    active: false, // Initialize according to your default need, false seems logical if activation is a deliberate choice.
    highlights: false, // Same reasoning as `active`.
    file: "",
    description: "", // Changed from 'content' to 'description' to match backend DTO.
    createBy: "", // Add this if you're not automatically setting it on the backend based on user session or token.
  });
  const [userLocalStorage, setUserLocalStorage] = useState('null');
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const fileInputRef = useRef(null); // Using useRef for the file input

  const handleImageChange = (e) => {
    e.preventDefault();
    if (e.target.files.length === 0) {
      return;
    }
    let file = e.target.files[0];
    console.log(file); // Confirm the file object is captured
    let reader = new FileReader();
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
  // When handling the change event of an input field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "title") {
      const newSlug = generateSlug(value); // value is the input's current value
      setFormValues((prevState) => ({
        ...prevState,
        slug: newSlug,
      }));
    }
  };



  const generateSlug = (title) => {
    // Ensure title is a string before proceeding
    if (typeof title === 'string' && title) {
      return title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
        .replace(/-+/g, "-");
    }
    return ""; // Return empty string if no title or title is not a string
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Ensure file is selected
    const fileInput = document.getElementById("fileUpload");
    const file = fileInput.files[0];
    if (!file) {
      alert("Please upload an image.");
      return;
    }
  
    const formData = new FormData();
    formData.append("file", file);
  
    // Append all other form values to formData
    Object.keys(formValues).forEach((key) => {
      if (key !== "file") { // Don't re-append the file
        formData.append(key, formValues[key]);
      }
    });
  
    console.log("Form Values on Submit:", formValues); // Debugging
    
    const user = localStorage.getItem('token');
    console.log(user, 'userLocalStorage');
  
    try {
      const response = await fetch("http://localhost:3000/article/create", {
        method: "POST",
        credentials: 'include', // Include credentials for cookies, etc.
        headers: {
          // Don't set 'Content-Type': 'application/json',
          'Authorization': `Bearer ${user}`,
        },
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Success:", data);
      alert("Article added successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add the article.");
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
          value={formValues.category}>
          <option value="" disabled>Choose a Category</option>
          <option value="computer">Computer</option>
          <option value="tv">TV</option>
          <option value="keyboard">Keyboard</option>
          <option value="modem">Modem</option>
          <option value="hukum">Hukum</option>
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
            onClick={generateSlug}>
            Random
          </button>
        </div>

        <input
          disabled
          type="number"
          placeholder="jumlah klik"
          name="amountClicking"
          required
          className={`${styles.formChild} ${styles.formChildInput}`}
          onChange={handleChange}
        />
        <div className={` w-[45%] flex flex-col h-[50%] justify-between items-center border-none `}>
          <label className="text-left w-full text-[#8f94a1]">isActive</label>
          <select
            name="active"
            id="active"
            className={`w-full p-[30px] bg-[var(--bg)] text-[var(--text)] rounded-[5px] border-[2px] border-solid border-[#2e374a]`}
            value={formValues.active} // Controlled component approach
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
            name="highlights"
            id="highlights"
            className={`${styles.formChild} w-full`}
            value={formValues.highlights} // Controlled component approach
            onChange={handleChange} // Ensure you have a handler function to update state
          >
            <option value="" disabled>Is Active?</option>{" "}
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
            {imagePreviewUrl ? (
              // <div className="flex  bg-[blue] w-full">
              <div className={`w-[100%] h-full  gap-[20px] relative flex-col rounded-[5px]  bg-[var(--bg)] justify-center text-center items-center border-none inline-block `}
              >
                <button onClick={handleRemoveImage} className="bg-[#dc3e3edd] hover:bg-[#dc3e3e] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline right-2 z-50 absolute  ">X</button>
                <img
                  src={imagePreviewUrl}
                  alt="Image Preview"
                  style={{ width: "100%" }} // Adjust styling as needed
                  className={`z-10 flex absolute object-contain h-full `}
                />
              </div>) : <div>tidak ada gambar ditampilkan</div>}

            {!imagePreviewUrl && "Upload your main image here"}
            <input
              type="file"
              id="fileUpload"
              name="file"
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

            className={`${styles.formCreate} h-[550px] px-[30px] mb-[20px] w-full box-border`}
            onChange={(htmlContent) => {
              setFormValues((prevState) => ({
                ...prevState,
                description: htmlContent, // Directly use the string provided by ReactQuil
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
