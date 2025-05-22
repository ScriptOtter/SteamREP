import { Skeleton } from "@/components/ui/skeleton";
import { ISteamUser } from "../models/ISteamUser";
import { useEffect, useState } from "react";

export const SteamInformation = (user: ISteamUser) => {
  return (
    <div className="mx-4 my-4 text-xl text-white">
      {user?.user?.realname ? (
        <div className="font-semibold">
          Realname: {" " + user?.user?.realname}
        </div>
      ) : (
        <></>
      )}

      <div className="font-semibold">
        Joined Steam: {user?.user?.timeCreated}
      </div>
      <div className="flex">
        <p className="font-semibold mr-2">Custom URL: </p>
        <a href={user?.user?.profileUrl} className="hover:text-indigo-500">
          {" " + user?.user?.profileUrl}
        </a>
      </div>
      <div className="font-semibold flex">
        <p className="mr-2">SteamID: </p> <p> {" " + user?.user?.id}</p>
      </div>
    </div>
  );
};
