import { ISteamUser } from "@/models/ISteamUser";
import { textColors } from "@/styles/colors";
import { useState } from "react";
import { MdVerified } from "react-icons/md";
import { SocialLinks } from "./SocialLinks";
import { cn } from "@/lib/utils";

export const ProfileLeftSide = ({ ...props }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const user: ISteamUser = props.user;
  const viewers = props.viewers;

  return (
    <>
      <div className="ml-2 lg:w-[320px] w-[256px]">
        <div className="flex justify-center items-center">
          <img
            src={user?.avatar}
            className="inline-block h-[95%] w-[95%] rounded-full ring-1 ring-light-gray"
          />
        </div>
        <div className="md:ml-7 md:mt-2">
          <div className="flex items-center relative justify-center md:justify-start">
            <div className="text-2xl text-bold text-white mt-2 flex items-center">
              <p
                className={cn(
                  user?.personaName && user?.personaName.length > 10
                    ? "w-[40%] break-words"
                    : "w-full"
                )}
              >
                {user?.personaName != "NaN" ? user?.personaName : "Unknown"}
              </p>

              {user?.user?.role === "VERIFIED" && (
                <div className="relative">
                  <MdVerified
                    size={22}
                    className="ml-1.5 text-light-blue-2 mt-[3px] cursor-pointer"
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
          <p className={textColors.gray + "text-center md:text-left mb-2"}>
            {viewers} views
          </p>
          <SocialLinks id={props.user?.id} />
        </div>
      </div>
    </>
  );
};
