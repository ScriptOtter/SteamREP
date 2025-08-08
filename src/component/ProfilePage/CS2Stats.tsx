import { Time } from "@/data/time";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { PremierRating } from "../PremierRating";
import { PageLoader } from "../Loader";

interface bans {
  platform: string;
  platform_nickname: string;
  banned_since: string;
}

interface competitive {
  map_name: string;
  rank: number;
}

interface ranks {
  leetify: number;
  premier: number;
  faceit: number;
  faceit_elo: number;
  wingman: number;
  renown: number;
  competitive: Array<competitive>;
}

interface Profile {
  winrate: number;
  total_matches: number;
  first_match_date: string;
  name: string;
  bans: Array<bans>;
  ranks: ranks;
}

const getLeefityStats = async (steamid: string): Promise<Profile> => {
  console.log(steamid);
  const res: AxiosResponse<Profile> = await axios.get(
    "https://api-public.cs-prod.leetify.com/v3/profile?steam64_id=" + steamid
  );
  console.log(res);
  return res.data;
};
export const CS2Stats = ({ ...props }) => {
  const [leetify, setLeetify] = useState<Profile>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, showError] = useState<string>("");
  useEffect(() => {
    const fetchData = async (steamid: string) => {
      try {
        const res = await getLeefityStats(steamid);
        if (res) {
          setLeetify(res);
          setLoading(false);
          return;
        }
      } catch (e: unknown) {
        if (e instanceof AxiosError) {
          showError(e.message);
          setLoading(false);
          console.log(e);
          return;
        }
        showError("Reload page!");
        setLoading(false);
        console.log(e);
      }
    };
    if (props.steamid) fetchData(props?.steamid);
  }, [props?.steamid]);

  useEffect(() => {
    setLoading(true);
  }, [location.pathname]);

  return (
    <>
      {loading ? (
        <PageLoader />
      ) : (
        <div className="mx-4 my-4 text-xl text-white">
          {!error ? (
            <>
              <div className="mb-3">GENERAL:</div>
              <div className="space-y-2 mb-3">
                <div className="flex space-x-1">
                  <p className="text-gray-500 lg:w-[30%] w-[40%] ">
                    Total Matches:
                  </p>
                  <p>{leetify?.total_matches}</p>
                </div>
                <div className="flex space-x-1">
                  <p className="text-gray-500 lg:w-[30%] w-[40%] ">Winrate:</p>
                  {leetify?.winrate && leetify?.winrate > 0.49 ? (
                    <p className="text-emerald-400">
                      {(leetify?.winrate * 100).toFixed(2) + "%"}
                    </p>
                  ) : (
                    <p className="text-red-400">
                      {leetify?.winrate &&
                        (leetify?.winrate * 100).toFixed(2) + "%"}
                    </p>
                  )}
                </div>
                <div className="flex space-x-1">
                  <p className="text-gray-500 lg:w-[30%] w-[40%] ">
                    In the game since:
                  </p>
                  <p>
                    {leetify?.first_match_date &&
                      Time(leetify?.first_match_date)}
                  </p>
                </div>
                <div className="flex space-x-1">
                  <p className="text-gray-500 lg:w-[30%] w-[40%] ">
                    Premier Rating:
                  </p>
                  <PremierRating rating={leetify?.ranks.premier} />
                </div>
                <div className="flex space-x-1 mb-3">
                  <p className="text-gray-500 lg:w-[30%] w-[40%] ">
                    Wingman Rank:
                  </p>
                  {leetify?.ranks?.wingman && (
                    <img
                      className="w-[60px]"
                      src={
                        "/public/wingman_ranks/wingman" +
                        leetify?.ranks?.wingman +
                        ".svg"
                      }
                    />
                  )}
                </div>
                <div className="mb-3">MAP RANKS:</div>
                {leetify?.ranks.competitive
                  .filter((match) => match.rank > 0)
                  .sort((a, b) => b.rank - a.rank)
                  .map((match) => (
                    <div
                      key={match.map_name}
                      className="flex items-center space-x-1.5"
                    >
                      <img
                        src={
                          "/public/map_icons/map_icon_" +
                          match.map_name +
                          ".svg"
                        }
                      />
                      <p className="text-gray-500 lg:w-[17%] w-[40%] ">
                        {match.map_name}
                      </p>
                      <img
                        className="size-12"
                        src={"/public/ranks/skillgroup" + match.rank + ".svg"}
                      />
                    </div>
                  ))}
              </div>
            </>
          ) : (
            <p>{error}</p>
          )}
        </div>
      )}
    </>
  );
};
