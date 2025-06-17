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
  }: ISteamUser = user?.user || {};

  return (
    <div className="mx-4 my-4 text-xl text-white">
      {" "}
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
          <p>{profileUrl}</p>
        </div>
      </div>
      <div className="mb-3">GENERAL:</div>
      <div className="mb-3">
        <div className="flex space-x-1">
          <p className="text-gray-500 lg:w-[20%] w-[30%]"> Real Name:</p>
          <p>{realname}</p>
        </div>
        <div className="flex space-x-1">
          <p className="text-gray-500 lg:w-[20%] w-[30%]"> Steam Level:</p>
          <p>{level}</p>
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
          <p>{timeCreated}</p>
        </div>
      </div>
      <div className="mb-3">Steam Bans & Restrictions:</div>
      <div className="mb-3">
        <div className="flex space-x-1">
          <p className="text-gray-500 lg:w-[20%] w-[30%]"> Game Bans:</p>
          <p className="text-red-500">Banned</p>
        </div>
        <div className="flex space-x-1">
          <p className="text-gray-500 lg:w-[20%] w-[30%]"> VAC Bans:</p>
          <p className="text-emerald-400">In Good Standing</p>
        </div>
        <div className="flex space-x-1">
          <p className="text-gray-500 lg:w-[20%] w-[30%]"> Community Bans:</p>
          <p className="text-emerald-400">In Good Standing</p>
        </div>
        <div className="flex space-x-1">
          <p className="text-gray-500 lg:w-[20%] w-[30%]"> Trade Bans:</p>
          <p className="text-emerald-400">In Good Standing</p>
        </div>
      </div>
    </div>
  );
};
