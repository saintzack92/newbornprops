import React from 'react';

// Add options to your props
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
  rows,
  value,
  onChange,
  disabled = false,
  options = [], // New prop for select options
}) => {
  const finalClasses = `rounded-[5px] text-[var(--text)] bg-[var(--bg)] mx-[10px] p-[20px] border-solid border-[#2e374a] border-2 ${customClasses}`;

  return (
    <>
      <label className='font-[12px]'>{labelTxt}</label>
      {isTextArea ? (
        <textarea {...{name, placeholder, value, onChange, className: finalClasses, rows}} />
      ) : isSelect ? (
        <select {...{name, id: name, value, onChange, className: finalClasses}}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      ) : isButton ? (
        <button className={finalClasses + " bg-[#11665e]"}>{labelTxt}</button>
      ) : (
        <input {...{type, name, placeholder, value, onChange, disabled, className: finalClasses}} />
      )}
      {error && <div className="text-red-500 py-2">{error}</div>}
    </>
  );
};

export default Input;