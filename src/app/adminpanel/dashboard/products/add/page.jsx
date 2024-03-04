"use client"
import styles from "../../../ui/dashboard/products/addProduct/addProduct.module.css";
import img from "../../../../../../public/7.jpg";
import Image from "next/image";
import React, { useState, } from 'react';
import { ReactQuil } from '../../../ui/dashboard/component/quill'; // Adjust the path as necessary


const AddProductPage = () => {
  const [formValues, setFormValues] = useState({
    title: '',
    cat: 'general', // Assuming 'general' is a default value
    slug: '',
    stock: '',
    color: '',
    size: '',
    isActive: '',
    content: { html: '' },
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleContentChange = (contentHtml) => {
    console.log('Editor Content:', contentHtml);

    const parser = new DOMParser();
    const doc = parser.parseFromString(contentHtml, 'text/html');
    const images = doc.querySelectorAll('img');

    images.forEach((img, index) => {
      fetch(img.src)
        .then(response => {
          const size = response.headers.get('content-length');
          console.log(`Image ${index + 1} size: ${size ? size + ' bytes' : 'Unknown'}`);
          return response.blob();
        })
        .then(blob => {
          const imgURL = URL.createObjectURL(blob);
          const tempImg = new window.Image(); // Use the native Image constructor explicitly
          tempImg.onload = function () {
            console.log(`Image ${index + 1} dimensions: ${tempImg.naturalWidth}x${tempImg.naturalHeight}`);
            URL.revokeObjectURL(imgURL);
          };
          tempImg.src = imgURL;
        })
        .catch(error => console.error(`Failed to fetch image ${index + 1}:`, error));
    });


    // Update your form values or state as needed
    setFormValues(prevState => ({
      ...prevState,
      content: { html: contentHtml },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log('Form Values:', formValues);
    // Here you can also send formValues to your backend or perform other actions
  };
  const generateSlug = () => {
    const { title } = formValues;

    if (title) {
      const slug = title
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
        .replace(/-+/g, '-');

      setFormValues(prevValues => ({
        ...prevValues,
        slug: slug
      }));
    }
  };



  return (
    <div
      className={`${styles.container} bg-[var(--bgSoft)] p-[20px] rounded-[10px] mt-[20px] `}
    >
      <form className={`${styles.form} flex flex-wrap justify-between`} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="title"
          name="title"
          required
          className={`${styles.formChild} ${styles.formChildInput} `}
          onChange={handleChange}
        />
        <select name="cat" id="cat" className={`${styles.formChild} ${styles.formChildInput}`}
          onChange={handleChange}>
          <option value="general">Choose a Category</option>
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
          <option value="">Is Active?</option> {/* No value for placeholder option */}
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>

        <div className={`w-full gap-[20px] flex flex-col rounded-[5px] py-[80px] mb-[20px] bg-[var(--bg)] justify-center text-center items-center border-solid border-[#2e374a] border-2`}>
          <h1 className="">input your article here</h1>
          <ReactQuil className={` h-[550px] px-[30px] mb-[20px] w-full `} onChange={handleContentChange} />
        </div>

        <button type="submit" className={` w-[100%] p-[30px] !bg-[teal] !text-[var(--text)] rounded-[5px] cursor-pointer ${styles.formChild}`}>
          Publish
        </button>
      </form>
      <ul role="list">
        <li className="group/item hover:bg-indigo-100 ...">
          <Image src={img} alt="" width={40} height={40} />
          <div className="text-[green]">
            <a href="{person.url}">{`person.name`}</a>
            <p>{`person.title`}</p>
          </div>
          <a
            className="group/edit invisible hover:bg-indigo-200 group-hover/item:visible group-hover/item:rounded-[50px] flex group-hover/item:scale-[80%] group-hover/item:duration-[2000ms] group-hover/item:ease-out group-hover/item:infinite"
            href="tel:bambang"
          >
            <span className="group-hover/edit:text-yellow-700 group-hover/edit:font-bold">
              Call
            </span>
            <svg className="group-hover/edit:translate-x-0.5 group-hover/edit:text-red-500 group-hover/edit:bg-[yellow]"></svg>
          </a>
        </li>
        {`/each`}
      </ul>
    </div>
  );
};

export default AddProductPage;
