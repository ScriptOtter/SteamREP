import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "forSearch" | "forAuth";
  type?: "text" | "email" | "password" | "checkbox";
  id?: string;
}

export const Input = ({
  className,
  placeholder,
  variant = "default",
  type = "text",
  id,
  value,
  onChange,
}: InputProps) => {
  const variantStyles = {
    default: "bg-red-400 border-red-300 focus:ring-blue-500",
    forSearch:
      "w-15/16 flex-grow outline-none placeholder:text-s placeholder:italic",
    forAuth:
      "bg-gray-700 w-full outline-[0.1px] outline-gray-500 rounded-[0.5vw] p-2 text-xs text-white focus:outline-indigo-500 focus:outline-2",
  };

  return (
    <input
      className={variantStyles[variant] + " " + className}
      placeholder={placeholder}
      type={type}
      id={id}
      value={value}
      onChange={onChange}
    ></input>
  );
};
