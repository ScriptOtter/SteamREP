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
  onClick,
  onChange,
}: InputProps) => {
  const variantStyles = {
    default: "bg-red-400 border-red-300 focus:ring-blue-500",
    forReport:
      "w-15/16 flex-grow outline-none placeholder:text-s placeholder:italic",
    forAuth:
      "bg-gray-700 w-full outline-[0.1px] outline-gray-500 rounded-[0.5vw] p-2 text-xs text-white focus:outline-indigo-500 focus:outline-2",
  };

  return (
    <input
      disabled={disabled}
      readOnly={readOnly}
      ref={ref}
      className={variantStyles[variant] + " " + className}
      placeholder={placeholder}
      type={type}
      onClick={onClick}
      id={id}
      value={value}
      onChange={onChange}
    ></input>
  );
};
