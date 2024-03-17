"use client"
import React, { useEffect, useState } from 'react'
import styles from '../../../ui/dashboard/users/addUser/singleUser/singleUser.module.css'
import Input from '../../../ui/dashboard/input/input'
import img from '../../../../../../public/7.jpg'
import Image from 'next/image'
import { ReactQuil } from '@/app/adminpanel/ui/dashboard/component/quill'
import { usePathname } from 'next/navigation'



const SingleProductPage = () => {
    const searchParams = usePathname();
    const slug = searchParams.split("/").pop();
    const [editorContent, setEditorContent] = useState('')
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        price: '',
        stock: '',
        color: '',
        desc: '',
        isAdmin: false,
        active: false,
        amountClicking: 0
        // Add other fields as necessary
    });
    const allCategories = [
        { value: 'category1', label: 'Category 1' },
        { value: 'category2', label: 'Category 2' },
        { value: 'hukum', label: 'Hukum' },
        { value: 'nasional', label: 'Nasional' },
        { value: 'keluarga', label: 'Keluarga' },
        // Include other categories as needed
    ];
    const activeCategories = [
        { value: false, label: 'Tidak Aktif ' },
        { value: true, label: 'Aktif' }
        // Include other categories as needed
    ];
    const categoryOptions = () => {
        let options = allCategories.slice(); // Clone the allCategories array
        if (formData.category && !options.some(option => option.value === formData.category)) {
            // If formData.category exists and is not in the options list, add it
            options.unshift({ value: formData.category, label: formData.category.charAt(0).toUpperCase() + formData.category.slice(1) }); // Capitalize the first letter
        }
        return options;
    };
    const activeOptions = () => {
        let options = activeCategories.slice(); // Clone the allCategories array
        if (formData.active && !options.some(option => option.value === formData.active)) {
            // If formData.category exists and is not in the options list, add it
            options.unshift({ value: formData.active, label: formData.active.charAt(0).toUpperCase() + formData.active.slice(1) }); // Capitalize the first letter
        }
        return options;
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Special handling for boolean values (like "active" field)
        const newValue = name === 'active' ? value === 'true' : value;
        setFormData(prevState => ({
            ...prevState,
            [name]: newValue,
        }));
    };

    useEffect(() => {
        if (!slug) {
            console.log('slug is :', null)
            return
        };

        const userToken = localStorage.getItem('token'); // Retrieve token from localStorage
        console.log(userToken, 'userToken');

        if (!userToken) {
            console.log('No user token found');
            return; // Early return if token is not available
        }

        const fetchData = async () => {
            const response = await fetch(`http://localhost:3000/article/slug/${slug}`, {
                method: "GET",
                credentials: 'include', // Include credentials for cookies, etc.
                headers: {
                    'Authorization': `Bearer ${userToken}`, // Use userToken directly here
                },
            });
            if (response.ok) {
                const data = await response.json();
                setFormData(currentData => ({
                    ...currentData,
                    ...data,
                    category: data.category || 'defaultCategoryValue', // Good practice
                }));
                setEditorContent(data.description || '');
            } else {
                console.error("Failed to fetch data:", response.statusText);
            }
        };

        fetchData();
    }, [slug]); // The dependency array is empty, meaning this effect runs once on mount


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
        useEffect(() => {
            const user = localStorage.getItem('token');
            console.log(user, 'userLocalStorage');
            setUserLocalStorage(user);
            const fetchData = async () => {
                try {
                    const response = await fetch("http://localhost:3000/article/create", {
                        method: "POST",
                        credentials: 'include', // Include credentials for cookies, etc.
                        headers: {
                            // Don't set 'Content-Type': 'application/json',
                            'Authorization': `Bearer ${userLocalStorage}`,
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
            }
            fetchData()
        }, [])

    };
    return (
        <div className={`${styles.container}  gap-[50px] mt-[20px]`}>
            <div className={`${styles.infoContainer} flex-[1] text-[var(--textSoft)] font-[500] h-max bg-[var(--bgSoft)] p-[20px] rounded-[10px] text-center`}>
                <div className={`${styles.imgContainer} w-[100%] h-[300px] relative rounded-[10px] mb-[20px] overflow-hidden`}>
                    <Image src={img} alt='' fill className='object-contain' />
                </div>
                John Doe
            </div>
            <div className={`${styles.formContainer} flex-[3] text-[var(--textSoft)] p-[20px] rounded-[10px] bg-[var(--bgSoft)]`}>
                <form onSubmit={handleSubmit} className='flex flex-col'>


                    <Input
                        type='text'
                        name='title'
                        placeholder='title'
                        customClasses={`${styles}`}
                        labelTxt='Title'
                        value={formData.title}
                        onChange={handleChange}

                    />
                    <Input
                        isSelect={true}
                        name='category'
                        customClasses={`${styles}`}
                        labelTxt='Category'
                        value={formData.category} // Set the selected option based on formData.category
                        onChange={handleChange} // Update formData state when a new option is selected
                        options={categoryOptions()}
                    />
                    <Input
                        type='text'
                        name='slug'
                        placeholder='slug'
                        customClasses={`${styles}`}
                        labelTxt='slug'
                        value={formData.slug}
                        onChange={handleChange}
                    />
                    <Input
                        type='text'
                        name='amountClicking'
                        placeholder='jumlah klik'
                        customClasses={`${styles}`}
                        labelTxt='jumlah klik'
                        value={formData.amountClicking}
                        disabled={true}
                    />
                    <Input
                        isSelect={true}
                        name='active'
                        customClasses={styles}
                        labelTxt='Active?'
                        value={String(formData.active)} // Convert boolean to string for select
                        onChange={handleChange}
                        options={activeOptions()}
                    />
                    <Input
                        isSelect={true}
                        name='highlights'
                        customClasses={`${styles}`}
                        labelTxt='highlights?'
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
                        name={'Update'}
                    />
                </form>


            </div>
        </div>
    )
}

export default SingleProductPage