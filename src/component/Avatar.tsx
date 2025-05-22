import React from "react";

interface AvatarProps {
  avatarUrl: string;
  nickname: string;
  onToggleMenu: () => void;
}

const Avatar: React.FC<AvatarProps> = ({
  avatarUrl,
  nickname,
  onToggleMenu,
}) => {
  return (
    <div className="flex items-center cursor-pointer" onClick={onToggleMenu}>
      <img
        src={avatarUrl}
        alt="Avatar"
        className="w-10 h-10 rounded-full mr-2"
      />
      <span className="mr-1 font-semibold">{nickname}</span>
      <span className="text-gray-600">▼</span>
    </div>
  );
};

export default Avatar;
