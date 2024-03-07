"use client";
import styles from "../../../ui/dashboard/products/addProduct/addProduct.module.css";
import img from "../../../../../../public/7.jpg";
import Image from "next/image";
import React, { useState } from "react";
import { ReactQuil } from "../../../ui/dashboard/component/quill"; // Adjust the path as necessary

const AddProductPage = () => {
  const [formValues, setFormValues] = useState({
    title: "",
    category: "", // Assuming 'general' is a default value
    slug: "",
    click: "",
    isActive: "",
    content: { html: "" },
  });
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  const handleImageChange = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
    };

    reader.readAsDataURL(file);
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
        <select
          name="isActive"
          id="isActive"
          className={`${styles.formChild} ${styles.formChildInput}`}
          value={formValues.isActive} // Controlled component approach
          onChange={handleChange} // Ensure you have a handler function to update state
        >
          <option value="">Is Active?</option>{" "}
          {/* No value for placeholder option */}
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>

        <div
          className={`w-full gap-[20px] flex flex-col rounded-[5px] py-[80px] mb-[20px] bg-[var(--bg)] justify-center text-center items-center border-solid border-[#2e374a] border-2`}
        >
          <div
            className={`w-[95%] px-[20px] gap-[20px] flex flex-col rounded-[5px] py-[80px] mb-[20px] bg-[var(--bg)] justify-center text-center items-center border-solid border-[#2e374a] border-2`}
          >
            {imagePreviewUrl && (
              <img
                src={imagePreviewUrl}
                alt="Image Preview"
                style={{ width: "100%", height: "100px" }} // Adjust styling as needed
              />
            )}

            {!imagePreviewUrl && "Upload your main image here"}
            <input
              type="file"
              id="fileUpload"
              name="myFile"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <label
              htmlFor="fileUpload"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Select File
            </label>
          </div>
          <h1>Input your article here</h1>
          <ReactQuil
            className="h-[550px] px-[30px] mb-[20px] w-full"
            // onChange={handleContentChange}
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
