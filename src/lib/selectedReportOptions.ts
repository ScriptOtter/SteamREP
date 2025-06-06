import { useState } from "react";

export const handleOptionClick = (value: string) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  setSelectedOptions((prevSelectedOptions) => {
    const newSelectedOptions = prevSelectedOptions.includes(value)
      ? prevSelectedOptions.filter((word) => word !== value) // Убираем слово
      : [...prevSelectedOptions, value]; // Добавляем слово

    return newSelectedOptions; // Возвращаем новое состояние
  });

  return selectedOptions;
};
