import { useEffect, useRef } from "react";
import { useAuth } from "@/hooks/use-auth";
import React from "react";

interface DropdownMenuProps {
  onProfile: () => void;
  onLogout: () => void;
  onClose: () => void; // Функция для закрытия меню
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  onProfile,
  onLogout,
  onClose,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      console.log("adas");
      onClose(); // Закрыть меню, если клик был вне него
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={menuRef}
      className="absolute right-0 top-8 mt-2 w-48 bg-white shadow-lg rounded-b-xl rounded-b-none z-10"
    >
      <button
        onClick={onProfile}
        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
      >
        Профиль
      </button>
      <button
        onClick={onLogout}
        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-b-xl"
      >
        Выйти
      </button>
    </div>
  );
};

export default DropdownMenu;
