import { useDropDownMenu } from "@/hooks/use-drop-down-menu";
import { cn } from "@/lib/utils";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface PropsUser {
  imageUrl: string;
  name: string;
  steamid: string;
  dateBanned?: string;
}

export const TrackingUser = ({ ...props }) => {
  const { imageUrl, name, steamid, dateBanned }: PropsUser = props.user;
  const { isMenuOpen, toggleMenu, menuRef } = useDropDownMenu();
  const navigate = useNavigate();
  return (
    <div
      className={cn(
        dateBanned ? "bg-red-500/40 rounded-xs" : "bg-light-gray-3/20",
        "flex items-center space-x-2 "
      )}
    >
      {imageUrl && (
        <img
          src={imageUrl}
          className="size-8 rounded-2xl cursor-pointer"
          onClick={() => navigate(`/profile/${steamid}`)}
        />
      )}
      <div className="w-full">
        <p className="break-words">
          {name.length <= 12 ? name : name.slice(0, 12)}
        </p>

        <p className="text-xs">
          {dateBanned ? `Banned: ${dateBanned}` : steamid}
        </p>
      </div>
      <div ref={menuRef} className="relative">
        {!isMenuOpen ? (
          <EllipsisVertical
            className="cursor-pointer z-999"
            size={18}
            onClick={() => toggleMenu()}
          />
        ) : (
          <div className="absolute bg-secondary/60 px-2 py-1 -top-5 right-0 w-[185px] h-[41px] cursor-pointer hover:bg-secondary/80">
            <p className="text-center mt-1">Delete?</p>
          </div>
        )}
      </div>
    </div>
  );
};
