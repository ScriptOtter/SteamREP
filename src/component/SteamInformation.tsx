import { ISteamUser } from "../models/ISteamUser";

export const SteamInformation = (user: ISteamUser) => {
  const { realname, timeCreated, profileUrl, id }: ISteamUser =
    user?.user || {};

  return (
    <div className="mx-4 my-4 text-xl text-white">
      {realname ? (
        <div className="font-semibold">Realname: {" " + realname}</div>
      ) : (
        <></>
      )}

      <div className="font-semibold">Joined Steam: {timeCreated}</div>
      <div className="flex">
        <p className="font-semibold mr-2">Custom URL: </p>
        <a href={profileUrl} className="hover:text-indigo-500">
          {" " + profileUrl}
        </a>
      </div>
      <div className="font-semibold flex">
        <p className="mr-2">SteamID: </p> <p> {" " + id}</p>
      </div>
    </div>
  );
};
