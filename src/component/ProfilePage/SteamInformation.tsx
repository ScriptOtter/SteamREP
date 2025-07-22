import { ISteamUser } from "../../models/ISteamUser";
import ReactCountryFlag from "react-country-flag";

export const SteamInformation = (user: ISteamUser) => {
  const {
    realname,
    timeCreated,
    profileUrl,
    id,
    level,
    steamId2,
    steamId3,
    steamIdHex,
    countryCode,
    steamUserBans,
  }: ISteamUser = user?.user || {};
  console.log(steamUserBans);
  return (
    <div className="mx-4 my-4 text-xl text-white">
      <div className="mb-3">STEAM ID’S:</div>
      <div className="space-y-1.5 mb-3">
        <div className="flex space-x-1">
          <p className="text-gray-500 lg:w-[20%] md:w-[30%] ">SteamID:</p>
          <p>{id}</p>
        </div>
        <div className="flex space-x-1">
          <p className="text-gray-500 lg:w-[20%] w-[30%]">SteamID2:</p>
          <p>{steamId2}</p>
        </div>
        <div className="flex space-x-1">
          <p className="text-gray-500 lg:w-[20%] w-[30%]">SteamID3:</p>
          <p>{steamId3}</p>
        </div>
        <div className="flex space-x-1">
          <p className="text-gray-500 lg:w-[20%] w-[30%]">SteamID64 (Hex):</p>
          <p>{steamIdHex}</p>
        </div>
        <div className="flex space-x-1">
          <p className="text-gray-500 lg:w-[20%] w-[30%]"> Custom URL:</p>
          <p className="">{profileUrl}</p>
        </div>
      </div>
      <div className="mb-3">GENERAL:</div>
      <div className="mb-3">
        <div className="flex space-x-1">
          <p className="text-gray-500 lg:w-[20%] w-[30%]"> Real Name:</p>
          <p>{realname ? realname : "NOT STATED"}</p>
        </div>
        <div className="flex space-x-1">
          <p className="text-gray-500 lg:w-[20%] w-[30%]"> Steam Level:</p>
          <p>{level != "N/A" ? level : "0"}</p>
        </div>
        {countryCode && (
          <div className="flex space-x-1">
            <p className="text-gray-500 lg:w-[20%] w-[30%]"> Country:</p>
            <div className="flex space-x-1">
              {" "}
              <ReactCountryFlag
                countryCode={countryCode}
                svg
                style={{
                  width: "1em",
                  height: "1.5em",
                }}
                aria-label="United States"
              />
              <p>{countryCode}</p>
            </div>
          </div>
        )}
        <div className="flex space-x-1">
          <p className="text-gray-500 lg:w-[20%] w-[30%]"> Joined Steam:</p>
          <p>{timeCreated != "undefined NaN NaN" ? timeCreated : "Unknown"}</p>
        </div>
      </div>
      <div className="mb-3">Steam Bans & Restrictions:</div>
      <div className="mb-3">
        <div className="flex space-x-1">
          <p className="text-gray-500 lg:w-[20%] w-[30%]"> Game Bans:</p>

          {steamUserBans?.gameBans ? (
            <div className="flex space-x-1">
              <p className="text-red-500"> Banned </p>{" "}
              <p className="text-red-500"> ({steamUserBans.gameBans} game) </p>{" "}
            </div>
          ) : (
            <p className="text-emerald-400"> In Good Standing </p>
          )}
        </div>

        <div className="flex space-x-1">
          <p className="text-gray-500 lg:w-[20%] w-[30%]"> VAC Bans:</p>
          {steamUserBans?.vacBanned ? (
            <div className="flex space-x-1">
              <p className="text-red-500"> Banned </p>{" "}
              <p className="text-red-500"> ({steamUserBans.vacBans} game) </p>{" "}
            </div>
          ) : (
            <p className="text-emerald-400"> In Good Standing </p>
          )}
        </div>
        <div className="flex space-x-1">
          <p className="text-gray-500 lg:w-[20%] w-[30%]"> Community Bans:</p>
          {steamUserBans?.communityBanned ? (
            <p className="text-red-500"> Banned </p>
          ) : (
            <p className="text-emerald-400"> In Good Standing </p>
          )}
        </div>
        <div className="flex space-x-1">
          <p className="text-gray-500 lg:w-[20%] w-[30%]"> Trade Bans:</p>
          {steamUserBans?.economyBan != "none" ? (
            <p className="text-red-500"> Banned </p>
          ) : (
            <p className="text-emerald-400"> In Good Standing </p>
          )}
        </div>
      </div>
    </div>
  );
};
