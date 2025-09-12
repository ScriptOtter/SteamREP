import { useDropDownMenu } from "@/hooks/use-drop-down-menu";
import { cn } from "@/lib/utils";
import { ITrackingUser } from "@/models/ITrackingUsers";
import { API_ENDPOINTS } from "@/services/apiService";
import { createApi } from "@/services/axios";
import { EllipsisVertical } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const TrackingUser = ({ ...props }) => {
  const { avatar, name, steamid, isBanned }: ITrackingUser = props.user;
  const { getTrackingUsers } = props;
  const { isMenuOpen, toggleMenu, menuRef } = useDropDownMenu();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const api = createApi(dispatch);

  return (
    <div
      className={cn(
        isBanned ? "bg-red-500/40 rounded-xs" : "bg-light-gray-3/20",
        "flex items-center space-x-2 "
      )}
    >
      {avatar && (
        <img
          src={avatar}
          className="size-8 rounded-2xl cursor-pointer"
          onClick={() => navigate(`/profile/${steamid}`)}
        />
      )}
      <div className="w-full">
        <p className="break-words">
          {name.length <= 12 ? name : name.slice(0, 12)}
        </p>

        <p className="text-xs">{isBanned ? `Banned: ${isBanned}` : steamid}</p>
      </div>
      <div ref={menuRef} className="relative">
        {!isMenuOpen ? (
          <EllipsisVertical
            className="cursor-pointer z-999"
            size={18}
            onClick={() => toggleMenu()}
          />
        ) : (
          <div
            onClick={async () => {
              await api.delete(API_ENDPOINTS.deleteTrackingUser + steamid, {
                withCredentials: true,
              });
              await getTrackingUsers();
            }}
            className="absolute bg-secondary/60 px-2 py-1 -top-5 right-0 w-[245px] h-[41px] cursor-pointer hover:bg-secondary/80"
          >
            <p className="text-center mt-1">Delete?</p>
          </div>
        )}
      </div>
    </div>
  );
};
