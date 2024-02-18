import React from 'react';

const Input = ({
  type,
  name,
  placeholder,
  error,
  customClasses,
  labelTxt,
  isTextArea = false,
  isSelect = false,
  isButton = false,
  rows

}) => {
  const finalClasses = `rounded-[5px]  text-[var(--text)] bg-[var(--bg)] mx-[10px] p-[20px] border-solid border-[#2e374a] border-2 ${customClasses}  `;

  return (
    <>
      <label className='font-[12px]'>{labelTxt} </label>
      {isTextArea ? (
        <textarea
          type={type}
          name={name}
          placeholder={placeholder}
          className={finalClasses}
          rows={rows}

        />
      ) : isSelect ? (
        name === 'isAdmin' ? (
          <select name='isAdmin' id='isAdmin' className={finalClasses}>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        ) : name === 'isActive' ? (
          <select name='isActive' id='isActive' className={finalClasses}>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        ) : name === 'category' ? (
          <select name='category' id='category' className={finalClasses}>
            <option value="kitchen" >kitchen</option>
            <option value="computers">computers</option>
          </select>
        ) : null
      ) : isButton ? (
        <button className={` ${finalClasses} bg-[#11665e]`}>{name}</button>
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          className={finalClasses}
        />
      )}  {error && <div className="text-red-500 py-2">{error}</div>}
    </>
  );
};

export default Input;