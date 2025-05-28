import { useAuth } from "@/hooks/use-auth";
import { LogOut, Settings, User } from "lucide-react";
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
    <div className="absolute right-0 top-8 mt-2 w-48 bg-[#363636] shadow-lg rounded-b-xl z-10 shadow-gray-600 shadow-s">
      <div className="block w-full px-4 py-2 text-white">Role: {auth.role}</div>

      <div className="bg-gray-600 p-[0.5px]"></div>
      <div>
        <button
          onClick={onProfile}
          className="block w-full text-left px-4 py-2 text-white cursor-pointer hover:bg-gray-800"
        >
          <div className="flex items-center space-x-1 -mx-2">
            <User size={17} /> <p className="text-[16px]">Profile</p>
          </div>
        </button>
        <button
          onClick
          className="block w-full text-left px-4 py-2 text-white cursor-pointer hover:bg-gray-800"
        >
          <div className="flex items-center space-x-1 -mx-2">
            <Settings size={17} />
            <p className="text-[16px]">Settings</p>
          </div>
        </button>
        <button
          onClick={onLogout}
          className="block w-full text-left px-4 py-2 text-white rounded-b-xl cursor-pointer hover:bg-gray-800"
        >
          <div className="flex items-center space-x-1 -mx-2">
            <LogOut size={17} />
            <p className="text-[16px]">Logout</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default DropdownMenu;
