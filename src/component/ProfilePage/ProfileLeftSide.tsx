import { ISteamUser } from "@/models/ISteamUser";
import { useState } from "react";
import { MdVerified } from "react-icons/md";

export const ProfileLeftSide = ({ ...props }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const user: ISteamUser = props.user;

  return (
    <>
      <div className="ml-2 lg:w-[320px] w-[256px]">
        <div className="flex justify-center items-center">
          <img
            src={user?.avatar}
            className="inline-block h-[95%] w-[95%] rounded-full ring-1 ring-gray-500"
          />
        </div>
        <div className="ml-7 mt-2">
          <div className="flex items-center relative">
            <div className="text-2xl text-bold text-white mt-2 flex items-center">
              {user?.personaName != "NaN" ? user?.personaName : "Unknown"}
              {user?.user?.role === "VERIFIED" && (
                <div className="relative">
                  <MdVerified
                    size={22}
                    className="ml-1.5 text-blue-400 mt-[3px] cursor-pointer"
                    onMouseEnter={() => {
                      setIsHovered(true);
                      console.log(isHovered);
                    }}
                    onMouseLeave={() => {
                      setIsHovered(false);
                      console.log(isHovered);
                    }}
                  />
                  {isHovered && (
                    <p className="absolute left-8 -top-2 p-1 text-sm bg-gray-700 text-white rounded-md">
                      Steam Verified
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          <p className="text-s text-bold text-white mt-1">TG </p>

          <p className="text-s text-bold text-white mt-1">Youtube</p>
        </div>
      </div>
    </>
  );
};
