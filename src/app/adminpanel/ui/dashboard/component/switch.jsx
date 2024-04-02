import React from "react";

const Toggle = ({ checked, onChange }) => {
    return (
      <label htmlFor="check" className="bg-[grey] px-[1.8rem] py-[0.45rem] rounded-full relative">
        <input
          type="checkbox"
          id="check"
          className="sr-only peer"
          checked={checked}
          onChange={onChange} // This will call the function passed to Toggle when the input changes
        />
        <span className="px-[0.85rem] py-[0.85rem] bg-[blue] absolute rounded-full left-1 top-1 peer-checked:bg-rose-600 peer-checked:left-7 transition-all duration-500"/>
      </label>
    );
  };
  export default Toggle;
  
