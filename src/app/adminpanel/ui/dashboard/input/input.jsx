import React from 'react';

const Input = ({
  type,
  name,
  placeholder,
  error,
  customClasses,
  labelTxt,
  isTextArea = false
  
}) => {
//   const finalClasses = `w-full ${customClasses}`;

  return (
    <>
    <label>{labelTxt} </label>
    {isTextArea ?(
      <textarea
        type={type}
        name={name}
        placeholder={placeholder}
        className={customClasses}
        
      />
    ):(
        <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={customClasses}
      /> 
    )}  {error && <div className="text-red-500 py-2">{error}</div>}
    </>
  );
};

export default Input;