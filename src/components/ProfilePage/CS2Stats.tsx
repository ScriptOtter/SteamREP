import { Time } from "@/data/time";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { PremierRating } from "../PremierRating";
import { PageLoader } from "../Loader";
import { API_ENDPOINTS } from "@/services/apiService";
import { ICS2Stats } from "@/models/ICS2Stats";
import { CS2WeaponsStatistics } from "./CS2WeaponsStatistics";

export const CS2Stats = ({ ...props }) => {
  const [cs2Stats, setCs2Stats] = useState<ICS2Stats>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, showError] = useState<string>("");
  useEffect(() => {
    const fetchData = async (steamid: string) => {
      try {
        const res = await axios.get(API_ENDPOINTS.getCS2Stats + steamid);
        if (res) {
          setCs2Stats(res.data);
          setLoading(false);
          return;
        }
      } catch (e: unknown) {
        if (e instanceof AxiosError) {
          showError(e.message);
          setLoading(false);

          return;
        }
        showError("Reload page!");
        setLoading(false);
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
              <div className="flex justify-between ml-4 mb-4 ">
                <div className="space-y-2 mb-3 flex flex-col flex-1/2 ">
                  <div className="mb-4 text-xs md:text-xl">
                    GENERAL STATISTICS:
                  </div>
                  <div className="grid grid-cols-2 w-full xl:w-2/3 gap-y-2 text-xs md:text-xl items-center ">
                    <p className="text-light-gray-3">Matches Tracked:</p>
                    <p>{cs2Stats?.TotalMatches || 0}</p>
                    {cs2Stats?.wins && (
                      <p className="text-light-gray-3">Matches Won:</p>
                    )}
                    {cs2Stats?.wins && <p>{cs2Stats?.wins}</p>}
                    <p className="text-gray-500 ">In the game since:</p>
                    <p>
                      {(cs2Stats?.inGameSinse &&
                        Time(cs2Stats?.inGameSinse).split(" ")[0]) ||
                        "Not Found"}
                    </p>

                    {cs2Stats?.premier && (
                      <p className="text-gray-500 ">Premier Rating:</p>
                    )}
                    {cs2Stats?.premier && (
                      <div className="text-xl">
                        <PremierRating rating={cs2Stats?.premier} />
                      </div>
                    )}
                    {cs2Stats?.wingmanMathes && (
                      <p className="text-light-gray-3">Wingmans Matches :</p>
                    )}
                    {cs2Stats?.wingmanMathes && (
                      <p>{cs2Stats?.wingmanMathes}</p>
                    )}
                    {cs2Stats?.wingmanWins && (
                      <p className="text-light-gray-3">Wingmans Won:</p>
                    )}
                    {cs2Stats?.wingmanWins && <p>{cs2Stats?.wingmanWins}</p>}
                    {cs2Stats?.wingman && (
                      <p className="text-gray-500 ">Wingman Rank:</p>
                    )}

                    {cs2Stats?.wingman && (
                      <img
                        className="w-[60px]"
                        src={
                          "/wingman_ranks/wingman" + cs2Stats?.wingman + ".svg"
                        }
                      />
                    )}
                    {cs2Stats?.faceit && (
                      <p className="text-light-gray-3">Faceit level:</p>
                    )}
                    {cs2Stats?.faceit && <p>{cs2Stats?.faceit}</p>}

                    {cs2Stats?.faceit_elo && (
                      <p className="text-light-gray-3">Faceit elo:</p>
                    )}
                    {cs2Stats?.faceit_elo && <p>{cs2Stats?.faceit_elo}</p>}
                  </div>
                </div>
                <div className="flex flex-col flex-1/2">
                  <div className="mb-1.5 text-xs md:text-xl">MAP RANKS:</div>

                  {cs2Stats?.MapRanks.toString() === "" && (
                    <div className="font-mono text-xs md:text-xl">
                      <p>The player probably doesn't play Matchmaking</p>
                    </div>
                  )}

                  <div className="grid grid-cols-2">
                    {cs2Stats?.MapRanks.filter(
                      (match) => match.rank && match.rank > 0
                    ).map((match) => (
                      <div
                        key={match.name}
                        className="grid grid-cols-2 w-full xl:w-2/3 xl:gap-16"
                      >
                        <div className="flex items-center space-x-2">
                          <img
                            className="w-8 h-8"
                            src={"/map_icons/map_icon_" + match.name + ".svg"}
                          />
                          <p className="hidden 2xl:block text-light-gray-3 text-[16px]">
                            {match.name}
                          </p>
                        </div>
                        <img
                          className="size-12"
                          src={"/ranks/skillgroup" + match.rank + ".svg"}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {cs2Stats?.WeaponStats.toString() === "" && (
                <div className="overflow-x-auto overflow-y-hidden xl:overflow-hidden">
                  <div className="">
                    <CS2WeaponsStatistics weapons={cs2Stats.WeaponStats} />
                  </div>
                </div>
              )}
            </>
          ) : (
            <p>{error}</p>
          )}
        </div>
      )}
    </>
  );
};
