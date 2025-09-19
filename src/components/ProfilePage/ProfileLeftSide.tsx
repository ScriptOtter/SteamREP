import { ISteamUser } from "@/models/ISteamUser";
import { textColors } from "@/styles/colors";
import { useEffect, useState } from "react";
import { MdVerified } from "react-icons/md";
import { SocialLinks } from "./SocialLinks";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { createApi } from "@/services/axios";
import { API_ENDPOINTS } from "@/services/apiService";
import { ITrackingUser } from "@/models/ITrackingUsers";
import { useAuth } from "@/hooks/use-auth";

export const ProfileLeftSide = ({ ...props }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const user: ISteamUser = props.user;
  const viewers = props.viewers;
  const dispatch = useDispatch();
  const api = createApi(dispatch);
  const auth = useAuth();

  const [isFollowed, setFollowed] = useState<boolean>();
  const getTrackingUsers = async () => {
    const res = await api.get(API_ENDPOINTS.getTrackingUsers, {
      withCredentials: true,
    });

    if (res.data.toString() != "") {
      const follow = res.data.some(
        (el: ITrackingUser) => el.steamid == user.id
      );
      setFollowed(follow);
    }
  };

  useEffect(() => {
    getTrackingUsers();
  }, []);

  return (
    <>
      <div className={"ml-2 lg:w-[320px] w-[256px]"}>
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
                    ? "w-[70%] break-words text-xl"
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
                    }}
                    onMouseLeave={() => {
                      setIsHovered(false);
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
          {!isFollowed && auth.steamid != user?.id && auth.isAuth && (
            <button
              className="bg-gray hover:bg-light-gray-4 w-full px-2 py-1 rounded-md text-white outline-1 outline-light-gray cursor-pointer"
              onClick={async () => {
                api.post(
                  API_ENDPOINTS.addTrackingUser,
                  { steamid: user.id },
                  { withCredentials: true }
                );
                setFollowed(true);
              }}
            >
              Follow
            </button>
          )}
          {isFollowed && auth.steamid != user?.id && auth.isAuth && (
            <button
              className="bg-gray hover:bg-light-gray-4 w-full px-2 py-1 rounded-md text-white outline-1 outline-light-gray cursor-pointer"
              onClick={async () => {
                api.delete(API_ENDPOINTS.deleteTrackingUser + user.id, {
                  withCredentials: true,
                });
                setFollowed(false);
              }}
            >
              Unfollow
            </button>
          )}
          <SocialLinks id={props.user?.id} />
        </div>
      </div>
    </>
  );
};
