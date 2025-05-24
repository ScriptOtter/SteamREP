import { useAuth } from "@/hooks/use-auth";
import React from "react";

interface DropdownMenuProps {
  onProfile: () => void;
  onLogout: () => void;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  onProfile,
  onLogout,
}) => {
  const auth = useAuth();

  return (
    <div className="absolute right-0 top-8 mt-2 w-48 bg-[#363636] shadow-lg rounded-b-xl z-10">
      <div className="block w-full px-4 py-2 text-white">Role: {auth.role}</div>

      <div className="bg-gray-600 p-[0.5px]"></div>
      <button
        onClick={onProfile}
        className="block w-full text-left px-4 py-2 text-white"
      >
        Профиль
      </button>
      <button
        onClick={onLogout}
        className="block w-full text-left px-4 py-2 text-white rounded-b-xl"
      >
        Выйти
      </button>
    </div>
  );
};

export default DropdownMenu;
