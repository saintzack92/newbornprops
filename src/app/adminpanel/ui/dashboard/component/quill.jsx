import React, { useState, forwardRef, useEffect } from "react";
import 'react-quill/dist/quill.snow.css';
import ReactQuillWrapper from "./wrapper";


export const ReactQuil = React.forwardRef(({ className, onChange ,value: initialValue}, ref) => {
    const [value, setValue] = useState('');

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

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
        imageCompressor: {
            quality:0.15,
            maxWidth: 1000, // default
            maxHeight: 1000, // default
            imageType: 'image/jpeg'
          }
        
        
            
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
