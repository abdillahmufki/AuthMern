import React from "react";

const Button = ({ children, style, onClick, className }) => {
  return (
    <button
      style={style}
      onClick={onClick}
      className={`${className} bg-blue-800 rounded-md p-3 hover:opacity-80 text-white font-semibold`}
    >
      {children}
    </button>
  );
};

export default Button;
