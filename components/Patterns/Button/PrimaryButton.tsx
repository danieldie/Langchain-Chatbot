import React from "react";

const PrimaryButton = ({ text, className }: {text: String, className: String }) => {
  return (
    <button
      className={`${
        className && className
      } bg-gradient-to-r from-violet-800 to-fuchsia-500 w-full rounded-xl p-2 flex justify-center items-center text-white font-bold`}
    >
      {text}
    </button>
  );
};

export default PrimaryButton;