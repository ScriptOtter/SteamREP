import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "forSearch" | "forAuth";
}

export const Input = ({ placeholder, variant = "default" }: InputProps) => {
  const variantStyles = {
    default: "bg-red-400 border-red-300 focus:ring-blue-500",
    forSearch:
      "w-15/16 flex-grow outline-none placeholder:text-s placeholder:italic",
    forAuth:
      "bg-gray-700 w-full outline-[0.1px] outline-gray-500 rounded-[0.5vw] p-2 text-xs text-white focus:outline-indigo-500 focus:outline-2",
  };

  return (
    <input className={variantStyles[variant]} placeholder={placeholder}></input>
  );
};
