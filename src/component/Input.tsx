import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "forReport" | "forAuth";
  type?: "text" | "email" | "password" | "checkbox";
  ref?: React.Ref<HTMLInputElement>;
  id?: string;
}

export const Input = ({
  ref,
  className,
  placeholder,
  variant = "default",
  type = "text",
  id,
  readOnly,
  value,
  disabled,
  maxLength,
  onClick,
  onChange,
}: InputProps) => {
  const variantStyles = {
    default: "bg-red-400 border-red-300 focus:ring-blue-500",
    forReport:
      "w-15/16 flex-grow outline-none placeholder:text-s placeholder:italic",
    forAuth:
      "w-full px-2 py-2 bg-light-gray outline-1 outline-gray-shadow rounded-md text-md text-white hover:outline-2 hover:outline-blue focus:outline-blue-active focus:outline-2 cursor-pointer duration-100",
  };

  return (
    <input
      disabled={disabled}
      readOnly={readOnly}
      ref={ref}
      className={variantStyles[variant] + " " + className}
      placeholder={placeholder}
      type={type}
      maxLength={maxLength}
      onClick={onClick}
      id={id}
      value={value}
      onChange={onChange}
    ></input>
  );
};
