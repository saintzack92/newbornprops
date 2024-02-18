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
                const range = quillRef.current.getEditor().getSelection(true);
                const img = `<img src="${reader.result}" style="max-width: 100%; height: auto;">`; // Example styling for responsive images
                quillRef.current.getEditor().insertEmbed(range.index, 'html', img);
            };
            reader.readAsDataURL(file);
        };
    };

    useEffect(() => {
        if (quillRef.current) {
            quillRef.current.getEditor().getModule('toolbar').addHandler('image', imageHandler);
        }
    }, []);

    const handleEditorChange = (content) => {
        setValue(content);
        onChange(content);
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
