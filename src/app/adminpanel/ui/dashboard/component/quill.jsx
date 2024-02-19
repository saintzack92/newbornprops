import React, { forwardRef, useEffect, useRef, useState } from "react";
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';

// Import ReactQuill using dynamic import with SSR disabled
const ReactQuillNoSSR = dynamic(() => import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading...</p>,
  });
  
  const ReactQuillWrapper = forwardRef((props, ref) => (
    <ReactQuillNoSSR ref={ref} {...props} />
  ));
  
// Modify the ReactQuil component to use React.forwardRef
export const ReactQuil = React.forwardRef(({ className, onChange }, ref) => {
    const [value, setValue] = useState('');
    const quillRef = useRef(null); // Use this ref internally

    const imageHandler = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                const img = new Image();
                img.src = reader.result;
                img.onload = () => {
                    console.log(`Image dimensions: ${img.width}x${img.height}`);
                    const range = quillRef.current.getEditor().getSelection(true);
                    quillRef.current.getEditor().insertEmbed(range.index, 'image', reader.result);
                };
            };
            reader.readAsDataURL(file);
        };
    };

    useEffect(() => {
        if (quillRef.current) {
            const editor = quillRef.current.getEditor();
            editor.getModule('toolbar').addHandler('image', imageHandler);
        }
    }, []);

    const handleEditorChange = (html) => {
        setValue(html);
        if (onChange) {
            onChange(html);
        }
    };

    // Define the Quill editor modules and formats
    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],
            [{ 'indent': '-1'}, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['clean'],
            ['link', 'image', 'video']
        ],
    };

    return (
        <ReactQuillWrapper  
        ref={ref} // Now forwarding the ref correctly
        theme="snow"
        value={value}
        onChange={handleEditorChange}
        modules={modules}
        className={className}
        />
    );
});
