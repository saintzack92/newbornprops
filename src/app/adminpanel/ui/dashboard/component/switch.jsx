import React from "react";

function Toggle({ id, checked, onChange }) {
  const checkboxId = `check-${id}`; // Ensure unique ID for the label's htmlFor attribute

  return (
    <label htmlFor={checkboxId} className="bg-[grey] px-[1.8rem] py-[0.45rem] rounded-full relative">
      <input
        type="checkbox"
        id={checkboxId}
        className="sr-only peer"
        checked={checked}
        onChange={onChange} // Delegate handling to the parent component
      />
      <span className="px-[0.85rem] py-[0.85rem] bg-[blue] absolute rounded-full left-1 top-1 peer-checked:bg-rose-600 peer-checked:left-7 transition-all duration-500"/>
    </label>
  );
}

export default Toggle;
