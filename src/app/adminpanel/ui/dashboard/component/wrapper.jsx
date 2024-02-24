import dynamic from 'next/dynamic';
import React, { forwardRef } from "react";

const loadReactQuill = () => import('react-quill').then(({ default: ReactQuill }) => {
    return import('quill-image-compress').then(imageCompressModule => {
      if (ReactQuill && imageCompressModule.imageCompressor) {
        ReactQuill.Quill.register('modules/imageCompressor', imageCompressModule.imageCompressor);
        return ({ modules, ...props }) => <ReactQuill modules={modules} {...props} />;
      } else {
        console.error('Quill or imageCompressModule not found.');
        return () => <p>Error loading editor</p>;
      }
    });
  });
  
  const ReactQuillNoSSR = dynamic(loadReactQuill, { ssr: false, loading: () => <p>Loading...</p> });

// Update ReactQuillWrapper to forward all props including `modules`
const ReactQuillWrapper = forwardRef((props, ref) => (
  <ReactQuillNoSSR ref={ref} {...props} />
));

export default ReactQuillWrapper;
