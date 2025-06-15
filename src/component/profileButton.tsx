import { useAuth } from "@/hooks/use-auth";
import { ChevronDown } from "lucide-react";
import React from "react";
import { MdVerified } from "react-icons/md";

interface Props {
  onToggleMenu: () => void;
}

export const ProfileButton: React.FC<Props> = ({ onToggleMenu }) => {
  const auth = useAuth();
  return (
    <div className="flex items-center cursor-pointer" onClick={onToggleMenu}>
      {auth.avatar && (
        <img
          src={auth.avatar}
          alt="Avatar"
          className="w-10 h-10 rounded-full mr-2 "
        />
      )}
      <span className="mr-1 font-semibold flex items-center-safe">
        {auth.username}{" "}
        {auth.role === "VERIFIED" && (
          <MdVerified size={20} className="ml-1 text-blue-400" />
        )}
      </span>
      <span className="text-gray-600">
        <ChevronDown />
      </span>
    </div>
  );
};
