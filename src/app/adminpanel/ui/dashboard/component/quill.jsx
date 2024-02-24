import React, { useState, forwardRef } from "react";
import 'react-quill/dist/quill.snow.css';
import ReactQuillWrapper from "./wrapper";


export const ReactQuil = React.forwardRef(({ className, onChange }, ref) => {
    const [value, setValue] = useState('');

    const handleEditorChange = (html) => {
        // This function updates the component's state with the editor's content.
        setValue(html);
        if (onChange) {
            onChange(html);
        }
    
        // Add basic inline resizing functionality via CSS (for demonstration purposes).
        // Note: For a production-level feature, consider a more robust implementation.
        // const images = document.querySelectorAll('.ql-editor img');
        // images.forEach(img => {
        //     img.style.cssText = 'max-width: 50%; height: 50%; cursor: nwse-resize;';
        //     // Allow basic resizing via CSS. This does not provide UI handles, but lets images be responsive.
        //     // Implementing draggable resize handles would require additional JavaScript.
        // });
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
        // value={value}
        onChange={handleEditorChange}
        modules={modules}
        className={className}
        />
    );
});
