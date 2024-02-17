import React from 'react';

const Input = ({
  type,
  name,
  placeholder,
  error,
  customClasses,
  labelTxt,
  isTextArea = false,
  isSelect=false
  
}) => {
  const finalClasses = ` ${customClasses}`;

  return (
    <>
    <label>{labelTxt} </label>
    {isTextArea ?(
      <textarea
        type={type}
        name={name}
        placeholder={placeholder}
        className={finalClasses}
        
      />
    ): isSelect ?(
      name === 'isAdmin' ? (
        <select name='isAdmin' id='isAdmin' className={customClasses}>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
      ) : name === 'isActive' ? (
        <select name='isActive' id='isActive' className={customClasses}>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
      ) : null
    ) : (
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