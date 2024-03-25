"use client";
import styles from "../../../ui/dashboard/products/addProduct/addProduct.module.css";
import React, { useEffect, useRef, useState } from "react";
import { ReactQuil } from "../../../ui/dashboard/component/quill"; // Adjust the path as necessary
import { useRouter } from "next/router";
import img from '../../../../../../public/7.jpg'

const AddProductPage = () => {
  const [formValues, setFormValues] = useState({
    title: "",
    category: "",
    slug: "",
    amountClicking: 0,
    active: false,
    highlights: false,
    file: "",
    description: "",
    createBy: "",
  });
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const fileInputRef = useRef(null);
  const defaultImageUrl = '/7.jpg'
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "title") {
      const newSlug = generateSlug(value); // Ensure this function exists or is defined elsewhere
      setFormValues((prevState) => ({
        ...prevState,
        slug: newSlug,
      }));
    }
  };

  const generateSlug = (title) => {
    if (typeof title === "string" && title) {
      return title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
        .replace(/-+/g, "-");
    }
    return "";
  };

  const handleImageChange = (e) => {
    if (e.target.files.length === 0) {
      return;
    }
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);

    setFormValues((prev) => ({ ...prev, file: file }));
  };

  const handleRemoveImage = () => {
    setImagePreviewUrl(""); // Clear image preview
    setFormValues(prev => ({ ...prev, file: "" })); // Clear file value
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  

  const replaceBase64Images = async () => {
    const doc = new DOMParser().parseFromString(formValues.description, "text/html");
    const images = doc.querySelectorAll("img");
    for (let img of images) {
      if (img.src.startsWith("data:")) {
        const imageUrl = await uploadImageToAWS(await fetch(img.src).then((r) => r.blob()));
        img.src = imageUrl;
      }
    }
    const updatedDescription = doc.body.innerHTML;
    setFormValues((prev) => ({ ...prev, description: updatedDescription }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate required fields
    if (!formValues.description) {
      alert("Please fill in all required fields.");
      return; // Stop the form submission process
    }
  
    await replaceBase64Images();
    
    // Use default image if no image has been selected
    let imageUrl = formValues.file || defaultImageUrl;
  
    // Attempt to upload the file if it exists
    if (formValues.file && formValues.file instanceof File) {
      try {
        imageUrl = await uploadImageToAWS(formValues.file);
      } catch (error) {
        console.error("Failed to upload main image:", error);
        alert("Failed to upload the main image. Using default image instead.");
        imageUrl = defaultImageUrl;
      }
    }
  
    // Prepare and submit formValues, including handling of image URL
    try {
      const payload = { ...formValues, file: imageUrl };
  
      // Submit the form data
      const response = await fetch("http://localhost:3000/article/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      alert("Article added successfully!");
    } catch (error) {
      console.error("Failed to submit article:", error);
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
          value={formValues.category}
        >
          <option value="" disabled>
            Choose a Category
          </option>
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
            onClick={generateSlug}
          >
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
        <div
          className={` w-[45%] flex flex-col h-[50%] justify-between items-center border-none `}
        >
          <label className="text-left w-full text-[#8f94a1]">isActive</label>
          <select
            name="active"
            id="active"
            className={`w-full p-[30px] bg-[var(--bg)] text-[var(--text)] rounded-[5px] border-[2px] border-solid border-[#2e374a]`}
            value={formValues.active} // Controlled component approach
            onChange={handleChange} // Ensure you have a handler function to update state
          >
            <option value="" disabled>
              Is Active?
            </option>{" "}
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>
        <div
          className={`w-[45%] flex flex-col h-[50%] justify-between items-center border-none `}
        >
          <label className="text-left w-full text-[#8f94a1]">
            isHighlights
          </label>
          <select
            name="highlights"
            id="highlights"
            className={`${styles.formChild} w-full`}
            value={formValues.highlights} // Controlled component approach
            onChange={handleChange} // Ensure you have a handler function to update state
          >
            <option value="" disabled>
              Is Active?
            </option>{" "}
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
              <div
                className={`w-[100%] h-full  gap-[20px] relative flex-col rounded-[5px]  bg-[var(--bg)] justify-center text-center items-center border-none inline-block `}
              >
                <button
                type="button"
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
            ) : (
              <div>tidak ada gambar ditampilkan</div>
            )}

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
