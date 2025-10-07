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
  parsedMatch: object;
  kill_stats: object;
  date: string;
  sharedCode: string;
  demoUrl: string;

  duration: string;
  region: string;
  map: string;
  avg_rank: number;

  createdAt: string;
  updatedAt: string;
}

export const CS2Matches = ({ ...props }) => {
  const { steamid } = props;
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<"raws" | "blocks">("raws");
  const [matches, setMatches] = useState<IMatches[]>([]);
  const [loading, setLoading] = useState(true);

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
      {!loading && matches ? (
        <div className="text-white">
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
        <PageLoader />
      )}
    </>
  );
};
