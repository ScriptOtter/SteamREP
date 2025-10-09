import { Time } from "@/data/time";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { PremierRating } from "../PremierRating";
import { PageLoader } from "../Loader";
import { API_ENDPOINTS } from "@/services/apiService";
import { ICS2Stats } from "@/models/ICS2Stats";

const getLeefityStats = async (steamid: string): Promise<ICS2Stats> => {
  const res: AxiosResponse<ICS2Stats> = await axios.get(
    API_ENDPOINTS.getCS2Stats + steamid
  );

  return res.data;
};
export const CS2Stats = ({ ...props }) => {
  const [cs2Stats, setCs2Stats] = useState<ICS2Stats>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, showError] = useState<string>("");
  useEffect(() => {
    const fetchData = async (steamid: string) => {
      try {
        const res = await getLeefityStats(steamid);
        if (res) {
          setCs2Stats(res);
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
                  <p>{cs2Stats?.TotalMatches}</p>
                </div>
                <div className="flex space-x-1">
                  <p className="text-gray-500 lg:w-[30%] w-[40%] ">Winrate:</p>
                  {cs2Stats?.winrate && cs2Stats?.winrate > 0.49 ? (
                    <p className="text-emerald-400">
                      {(cs2Stats?.winrate * 100).toFixed(2) + "%"}
                    </p>
                  ) : (
                    <p className="text-red-400">
                      {cs2Stats?.winrate &&
                        (cs2Stats?.winrate * 100).toFixed(2) + "%"}
                    </p>
                  )}
                </div>
                <div className="flex space-x-1">
                  <p className="text-gray-500 lg:w-[30%] w-[40%] ">
                    In the game since:
                  </p>
                  <p>{cs2Stats?.inGameSinse && Time(cs2Stats?.inGameSinse)}</p>
                </div>
                {cs2Stats?.premier && (
                  <div className="flex space-x-1">
                    <p className="text-gray-500 lg:w-[30%] w-[40%] ">
                      Premier Rating:
                    </p>
                    <PremierRating rating={cs2Stats?.premier} />
                  </div>
                )}
                <div className="flex space-x-1 mb-3">
                  <p className="text-gray-500 lg:w-[30%] w-[40%] ">
                    Wingman Rank:
                  </p>
                  {cs2Stats?.wingman && (
                    <img
                      className="w-[60px]"
                      src={
                        "/wingman_ranks/wingman" + cs2Stats?.wingman + ".svg"
                      }
                    />
                  )}
                </div>
                <div className="mb-3">MAP RANKS:</div>
                {cs2Stats?.MapRanks.filter(
                  (match) => match.rank && match.rank > 0
                ).map((match) => (
                  <div
                    key={match.name}
                    className="flex items-center space-x-1.5"
                  >
                    <img src={"/map_icons/map_icon_" + match.name + ".svg"} />
                    <p className="text-gray-500 lg:w-[17%] w-[40%] ">
                      {match.name}
                    </p>
                    <img
                      className="size-12"
                      src={"/ranks/skillgroup" + match.rank + ".svg"}
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
