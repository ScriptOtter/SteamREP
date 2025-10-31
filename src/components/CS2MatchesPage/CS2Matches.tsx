import { useNavigate } from "react-router-dom";
import { CS2HeaderTable } from "./CS2HeaderTable";
import { ItemMatch } from "./ItemMatch";
import { MobileItemMatch } from "./MobileItemMatch";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import axios, { AxiosResponse } from "axios";
import { API_ENDPOINTS } from "@/services/apiService";
import { PageLoader } from "../Loader";
import { ISteamUser } from "@/models/ISteamUser";
import { useAuth } from "@/hooks/use-auth";
import { ArrowRight } from "lucide-react";

export interface IPlayerStatisticInMatch {
  id: string;
  match: string;
  matchId: string;
  steamid: string;
  name: string;
  kills_total: number;
  deaths_total: number;
  assists_total: number;
  headshot_kills_total: number;
  ace_rounds_total: number;
  k4_rounds_total: number;
  k3_rounds_total: number;
  "3k_rounds_total"?: number;
  "4k_rounds_total"?: number;
  damage_total: number;
  mvps: number;
  crosshair_code: string;
  player_color: string;
  team: number;
  result: string;
  clutchV2: number;
  clutchV3: number;
  clutchV4: number;
  clutchV5: number;

  utility_damage_total: number;

  rank: number;
  score: string;
  comp_wins: number;
  team_surrendered: boolean;
  team_score_first_half: number;
  team_score_second_half: number;
  isSuspicious: boolean;

  createdAt: string;
  updatedAt: string;
}

export interface IMatches {
  id: string;
  type: string;
  playersStatistic: IPlayerStatisticInMatch[];
  participants: ISteamUser[];
  score: string;
  parsedMatch: { [key: number]: IPlayerStatisticInMatch[] };
  kill_stats: object;
  date: string;
  sharedCode: string;
  demoUrl: string;

  duration: string;
  region: string;
  map: string;
  avg_rank: number;
  dateUnix?: number;
  createdAt: string;
  updatedAt: string;
}

export const CS2Matches = ({ ...props }) => {
  const { steamid } = props;
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<"raws" | "blocks">("raws");
  const [matches, setMatches] = useState<IMatches[]>([]);
  const [loading, setLoading] = useState(true);
  const auth = useAuth();
  useEffect(() => {
    const getMatches = async () => {
      try {
        const res: AxiosResponse<IMatches[]> = await axios.get(
          API_ENDPOINTS.getMatches + steamid
        );
        setMatches(res.data);
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    };
    getMatches();
    //return () => setMatches([]);
  }, [props?.steamid]);
  useEffect(() => {
    setLoading(true);
  }, [location.pathname]);

  return (
    <>
      {!loading ? (
        <div className="text-white">
          {matches.length > 0 ? (
            <div>
              <CS2HeaderTable
                currentView={currentView}
                setCurrentView={setCurrentView}
              />
              <div>
                {matches.map((match) => (
                  <div
                    onClick={() => navigate(`/match/${match.id}`)}
                    className={cn(
                      currentView == "raws"
                        ? "hidden xl:grid grid-cols-31 gap-4 mx-4 mb-0.5 items-center hover:bg-gray cursor-pointer"
                        : "hidden"
                    )}
                  >
                    <ItemMatch match={match} key={match.id} />
                  </div>
                ))}
              </div>
              <div
                className={cn(
                  currentView == "blocks"
                    ? "text-xs xl:grid-cols-4 grid grid-cols-1 sm:grid-cols-2 gap-4 mx-4 "
                    : "hidden"
                )}
              >
                {matches.map((match) => (
                  <MobileItemMatch match={match} key={match.id} />
                ))}
              </div>
            </div>
          ) : (
            <>
              {auth.steamid !== steamid ? (
                <div className="w-full h-full py-13">
                  <div className="flex flex-col items-center font-mono space-y-2 ml-6">
                    <p className="text-white text-4xl sm:text-5xl mb-8">
                      There are no matches played.
                    </p>
                    <p className="text-md md:text-xl">
                      If this is someone you know, tell them about the ability
                      to track their CS2 game statistics on our website.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full py-13">
                  <div className="flex flex-col items-center font-mono space-y-2 ml-6">
                    <p className="text-white text-4xl sm:text-5xl mb-8">
                      There are no matches played
                    </p>
                    <p className="text-md md:text-2xl text-light-blue-3">
                      Start tracking your matches now
                    </p>
                    <p className="text-2xl">Go to the following path:</p>
                    <p
                      onClick={() => navigate("/settings")}
                      className="flex text-light-blue text-xl hover:underline cursor-pointer"
                    >
                      Settings <ArrowRight /> CS Tracker
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        <PageLoader />
      )}
    </>
  );
};
