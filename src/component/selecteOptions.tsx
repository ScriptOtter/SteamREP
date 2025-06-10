import { useEffect, useState } from "react";
import { Input } from "./Input";
import { useDropDownMenu } from "@/hooks/use-drop-down-menu";
import { Check, ListChecks } from "lucide-react";
import { cn } from "@/lib/utils";

interface Option {
  key: number;
  value: string;
}

interface SelectOptionsProps {
  onChange: (selected: string[]) => void; // Пропс для функции обратного вызова
}

export const SelectOptions: React.FC<SelectOptionsProps> = ({ onChange }) => {
  const options = [
    { key: 1, value: "WALL HACKING" },
    { key: 2, value: "AIM" },
    { key: 3, value: "OTHER HACKING" },
    { key: 4, value: "GRIFFER" },
    { key: 5, value: "FARM BOT" },
    { key: 6, value: "NOT ENOUGH EVIDENCE" },
  ];
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
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
  }, [selectedOptions, onChange]);

  return (
    <>
      <div ref={menuRef} className="relative mb-3">
        <Input
          variant="forAuth"
          type="text"
          readOnly
          onClick={toggleMenu}
          value={selectedOptions.join(", ")}
          placeholder="Choose..."
          className="block w-full p-1 border border-gray-300 rounded-md cursor-pointer hover:outline-1 hover:outline-white"
        />
        <ListChecks
          size={22}
          className="absolute right-2 top-1.5 text-white cursor-pointer"
          onClick={toggleMenu}
        />
        {isMenuOpen && (
          <div className="absolute z-10 w-full shadow-white rounded-xs mt-1 shadow-xs bg-[#2F3136] text-white">
            {options.map((option: Option) => (
              <div
                key={option.key}
                onClick={() => handleOptionClick(option.value)}
                className={
                  cn(
                    selectedOptions.includes(option.value)
                      ? "bg-orange-500"
                      : "bg-[#2F3136]"
                  ) +
                  " cursor-pointer rounded-xs p-1 m-0.5 hover:outline-1 hover:outline-white"
                }
              >
                <div className="flex justify-between mx-2">
                  {option.value}{" "}
                  {selectedOptions.includes(option.value) && <Check />}
                </div>
                {selectedOptions.includes(option.value)}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
