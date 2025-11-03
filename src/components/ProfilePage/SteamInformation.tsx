import { Copy } from "lucide-react";
import { ISteamUser } from "../../models/ISteamUser";
import ReactCountryFlag from "react-country-flag";
interface ISteamInformation {
  user: ISteamUser;
}
export const SteamInformation = ({ user }: ISteamInformation) => {
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
  } = user || {};

  return (
    <div className="mx-4 my-4 text-xl text-white">
      <div className="mb-3">STEAM ID’S:</div>
      <div className="space-y-1.5 mb-3">
        <div className="flex space-x-1">
          <p className="text-light-gray-2 lg:w-[20%] w-[30%] ">SteamID:</p>
          <p
            className="cursor-pointer"
            onClick={() =>
              (window.location.href = `https://steamcommunity.com/profiles/${id}`)
            }
          >
            {id}
          </p>
          <Copy
            onClick={() => navigator.clipboard.writeText(id || "")}
            size={17}
            className="mt-1.5 cursor-pointer hover:text-light-blue-2"
          />
        </div>
        <div className="flex space-x-1">
          <p className="text-light-gray-2 lg:w-[20%] w-[30%]">SteamID2:</p>
          <p>{steamId2}</p>
          <Copy
            onClick={() => navigator.clipboard.writeText(steamId2 || "")}
            size={17}
            className="mt-1.5 cursor-pointer hover:text-light-blue-2"
          />
        </div>
        <div className="flex space-x-1">
          <p className="text-light-gray-2 lg:w-[20%] w-[30%]">SteamID3:</p>
          <p>{steamId3}</p>
          <Copy
            onClick={() => navigator.clipboard.writeText(steamId3 || "")}
            size={17}
            className="mt-1.5 cursor-pointer hover:text-light-blue-2"
          />
        </div>
        <div className="flex space-x-1">
          <p className="text-light-gray-2 lg:w-[20%] w-[30%]">
            SteamID64 (Hex):
          </p>
          <p>{steamIdHex}</p>
          <Copy
            onClick={() => navigator.clipboard.writeText(steamIdHex || "")}
            size={17}
            className="mt-1.5 cursor-pointer hover:text-light-blue-2"
          />
        </div>
        <div className="flex space-x-1">
          <p className="text-light-gray-2 lg:w-[20%] w-[30%]"> Custom URL:</p>
          <p>{profileUrl && profileUrl.split("/")[4]}</p>
          <Copy
            onClick={() => navigator.clipboard.writeText(profileUrl || "")}
            size={17}
            className="mt-1.5 cursor-pointer hover:text-light-blue-2"
          />
        </div>
      </div>
      <div className="mb-3">GENERAL:</div>
      <div className="mb-3">
        <div className="flex space-x-1">
          <p className="text-light-gray-2 lg:w-[20%] w-[30%]"> Real Name:</p>
          <p>{realname ? realname : "NOT STATED"}</p>
        </div>
        <div className="flex space-x-1">
          <p className="text-light-gray-2 lg:w-[20%] w-[30%]"> Steam Level:</p>
          <p>{level != "N/A" ? level : "0"}</p>
        </div>
        {countryCode && (
          <div className="flex space-x-1">
            <p className="text-light-gray-2 lg:w-[20%] w-[30%]"> Country:</p>
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
          <p className="text-light-gray-2 lg:w-[20%] w-[30%]"> Joined Steam:</p>
          <p>{timeCreated != "undefined NaN NaN" ? timeCreated : "Unknown"}</p>
        </div>
      </div>
      <div className="mb-3">Steam Bans & Restrictions:</div>
      <div className="mb-3">
        <div className="flex space-x-1">
          <p className="text-light-gray-2 lg:w-[20%] w-[30%]"> Game Bans:</p>

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
          <p className="text-light-gray-2 lg:w-[20%] w-[30%]"> VAC Bans:</p>
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
          <p className="text-light-gray-2 lg:w-[20%] w-[30%]">
            {" "}
            Community Bans:
          </p>
          {steamUserBans?.communityBanned ? (
            <p className="text-red-500"> Banned </p>
          ) : (
            <p className="text-emerald-400"> In Good Standing </p>
          )}
        </div>
        <div className="flex space-x-1">
          <p className="text-light-gray-2 lg:w-[20%] w-[30%]"> Trade Bans:</p>
          {steamUserBans?.economyBan == "banned" ? (
            <p className="text-red-500"> Banned </p>
          ) : (
            <p className="text-emerald-400"> In Good Standing </p>
          )}
        </div>
      </div>
    </div>
  );
};
