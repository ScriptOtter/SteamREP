import { ISteamUser } from "../models/ISteamUser";
import { Comment } from "./Comment";

export const SteamInformation = (user: ISteamUser) => {
  return (
    <>
      <div className="mx-4 my-4 text-xl text-white">
        <div className="font-semibold">
          Realname: {" " + user?.user?.realname}
        </div>
        <div className="font-semibold">
          Joined Steam: {user?.user?.timeCreated}
        </div>
        <div className="flex">
          <p className="font-semibold mr-2">Custom URL: </p>
          <a href={user?.user?.profileUrl} className="hover:text-indigo-500">
            {" " + user?.user?.profileUrl}
          </a>
        </div>
        <div className="font-semibold">SteamID64: {" " + user?.user?.id}</div>
      </div>
    </>
  );
};
