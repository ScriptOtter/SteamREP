import { useEffect, useState } from "react";
import { useDropDownMenu } from "@/hooks/use-drop-down-menu";
import { ListChecks } from "lucide-react";
import { cn } from "@/lib/utils";

interface Option {
  key: number;
  value: string;
}

interface SelectOptionsProps {
  onChange: (selected: string[]) => void; // Пропс для функции обратного вызова
  className?: string;
  value: string[];
  resetTrigger: boolean;
  error: boolean;
}

export const SelectOptions: React.FC<SelectOptionsProps> = ({
  error,
  value,
  onChange,
  className,
  resetTrigger,
}) => {
  const options = [
    { key: 1, value: "WALL HACKING" },
    { key: 2, value: "AIM" },
    { key: 3, value: "OTHER HACKING" },
    { key: 4, value: "GRIFFER" },
    { key: 5, value: "FARM BOT" },
    { key: 6, value: "NOT ENOUGH EVIDENCE" },
  ];
  const [selectedOptions, setSelectedOptions] = useState<string[]>(value);
  const { isMenuOpen, toggleMenu, menuRef } = useDropDownMenu();

  const handleOptionClick = (value: string) => {
    setSelectedOptions((prevSelectedOptions) => {
      const newSelectedOptions = prevSelectedOptions.includes(value)
        ? prevSelectedOptions.filter((word) => word !== value) // Убираем слово
        : [...prevSelectedOptions, value]; // Добавляем слово
      //onChange(newSelectedOptions);
      return newSelectedOptions; // Возвращаем новое состояние
    });

    return selectedOptions;
  };

  useEffect(() => {
    onChange(selectedOptions);
  }, [selectedOptions, setSelectedOptions]);

  useEffect(() => {
    setSelectedOptions([]);
  }, [resetTrigger]);

  return (
    <>
      <div ref={menuRef} className={cn("relative", className)}>
        <p className="absolute text-xs bg-secondary text-light-gray-3 px-1 -top-2 left-4">
          Verdicts
        </p>
        <input
          type="text"
          readOnly
          onClick={toggleMenu}
          value={selectedOptions.join(", ")}
          placeholder="Choose..."
          className={cn(
            error && selectedOptions.length === 0
              ? "outline-red"
              : "outline-light-gray-2",
            "w-full pl-4.5 py-2 text-white placeholder:text-light-gray  outline-1  rounded-md cursor-pointer hover:outline-light-gray-3 focus:outline-light-blue"
          )}
        />
        <ListChecks
          size={20}
          className="absolute top-2.5 right-3 text-white cursor-pointer"
          onClick={toggleMenu}
        />
        {isMenuOpen && (
          <div className="z-10 w-full mt-1 bg-gray text-white ">
            {options.map((option: Option) => (
              <div
                key={option.key}
                onClick={() => handleOptionClick(option.value)}
                className={
                  cn(
                    selectedOptions.includes(option.value)
                      ? "bg-light-blue-3"
                      : "bg-light-gray"
                  ) +
                  " cursor-pointer rounded-xs px-2 py-1 m-0.5 hover:outline-1 hover:outline-white"
                }
              >
                {option.value}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
