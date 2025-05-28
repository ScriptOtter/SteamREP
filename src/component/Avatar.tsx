import { useAuth } from "@/hooks/use-auth";
import { ChevronDown } from "lucide-react";
import React from "react";

interface AvatarProps {
  onToggleMenu: () => void;
}

const Avatar: React.FC<AvatarProps> = ({ onToggleMenu }) => {
  const auth = useAuth();
  return (
    <div className="flex items-center cursor-pointer" onClick={onToggleMenu}>
      <img
        src={auth.avatar || ""}
        alt="Avatar"
        className="w-10 h-10 rounded-full mr-2 "
      />
      <span className="mr-1 font-semibold">{auth.username}</span>
      <span className="text-gray-600">
        <ChevronDown />
      </span>
    </div>
  );
};

export default Avatar;
