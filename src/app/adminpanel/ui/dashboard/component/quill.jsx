import React, { useEffect, useRef, useState } from "react";
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
const ReactQuillNoSSR = dynamic(() => import('react-quill'), { ssr: false });

export const ReactQuil = ({ className, onChange }) => {
    const [value, setValue] = useState('');
    const quillRef = useRef(null);

    const imageHandler = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();
    
        input.onchange = async () => {
            const file = input.files[0];
            const reader = new FileReader();
            
            reader.onloadend = () => {
                // Create a temporary image to read dimensions
                const img = new Image();
                img.src = reader.result;
                img.onload = () => {
                    // Log the dimensions of the image
                    console.log(`Image dimensions: ${img.width}x${img.height}`);
                    
                    // Continue with inserting the image into the editor
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
        // This function updates the component's state with the editor's content.
        setValue(html);
        if (onChange) {
            onChange(html);
        }
    
        // Add basic inline resizing functionality via CSS (for demonstration purposes).
        // Note: For a production-level feature, consider a more robust implementation.
        const images = document.querySelectorAll('.ql-editor img');
        images.forEach(img => {
            img.style.cssText = 'max-width: 50%; height: 50%; cursor: nwse-resize;';
            // Allow basic resizing via CSS. This does not provide UI handles, but lets images be responsive.
            // Implementing draggable resize handles would require additional JavaScript.
        });
    };
    


    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction
            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['clean'],                                         // remove formatting button
            ['link', 'image', 'video']                         // link and image, video
        ],
    };

    return (
        <ReactQuillNoSSR 
        ref={quillRef}
        theme="snow" 
        value={value}
        onChange={handleEditorChange}
        modules={modules}
        className={className}
    />
    );
};
