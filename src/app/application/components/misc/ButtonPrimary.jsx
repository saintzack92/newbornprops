import React from "react";

const ButtonPrimary = ({ children, addClass }) => {
  return (
    <button
      className={
        "py-3 lg:py-4 px-12 lg:px-16 text-white font-semibold rounded-lg bg-orange-500 hover:shadow-orange-400 shadow-2xl transition-all outline-none " +
        addClass
      }
    >
      {children}
    </button>
  );
};

export default ButtonPrimary;
