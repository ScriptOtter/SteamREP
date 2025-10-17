import { cn } from "@/lib/utils";
import { Lightbulb } from "lucide-react";
import { useState } from "react";
import { FaCrosshairs } from "react-icons/fa";
import { IPlayerStatisticInMatch } from "../CS2MatchesPage/CS2Matches";
import { ISteamUser } from "@/models/ISteamUser";
import { playerColors } from "@/lib/playerColors";
import { ToastSuccess } from "../Toasts/ToastSuccess";
import { IScoreboard } from "@/pages/MatchPage";
import { PremierForMatch } from "../PremierRating";
import { useNavigate } from "react-router-dom";

interface IPlayerStatsItem {
  player: IScoreboard;
  matchScore: string;
  participants: ISteamUser[];
  className?: string;
  team: IPlayerStatisticInMatch[];
  type: string;
}

export const PlayerStatsItem = ({ ...props }: IPlayerStatsItem) => {
  const { player, participants, team, className, type } = props;
  const {
    ace_rounds_total,
    assists_total,
    clutchV2,
    clutchV3,
    clutchV4,
    clutchV5,
    //comp_wins,
    crosshair_code,
    //damage_total,
    deaths_total,
    //headshot_kills_total,
    isSuspicious,
    k3_rounds_total,
    k4_rounds_total,
    kills_total,
    mvps,
    name,
    player_color,
    rank,
    score,
    //team_score_first_half,
    //team_score_second_half,
    utility_damage_total,
    result,
    steamid,
    diff_kd,
    adr,
    kd,
    matchHS,
  } = player;
  const [lightbulbDesc, setLightbulbDesc] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <div className={className}>
      <div
        className={cn(
          type !== "WINGMAN" ? "grid-cols-24" : "grid-cols-17",
          "grid  mt-4"
        )}
      >
        <div className="col-start-1 col-end-4">
          <div className="flex items-center space-x-2">
            {isSuspicious && (
              <div className="relative">
                <Lightbulb
                  size={20}
                  className="cursor-pointer text-red-600"
                  onMouseEnter={() => setLightbulbDesc(true)}
                  onMouseLeave={() => setLightbulbDesc(false)}
                />
                {lightbulbDesc && (
                  <div className="absolute top-0 left-7 text-xs bg-gray outline-1 outline-light-gray-2 p-1 rounded-md">
                    Suspicious
                  </div>
                )}
              </div>
            )}

            <img
              onClick={() => navigate(`/profile/${steamid}`)}
              className={cn(
                player_color && `outline-1 ${playerColors[player_color]}`,
                !isSuspicious && "ml-7",
                "w-7 h-7 rounded-full cursor-pointer hover:outline-2"
              )}
              src={
                participants.find((i) => i.id === steamid)?.avatar ||
                "https://avatars.steamstatic.com/600a54e62405d2696730eabca74233adfd9aea7e_full.jpg"
              }
            />
            <p className={cn("line-clamp-1 break-words")}>{name}</p>
            {team[0].result === "WIN" && result === "LOSE" && (
              <p className={cn("font-mono text-red-500")}>LEFT</p>
            )}
          </div>
        </div>
        <div className="col-start-5 col-end-6">
          {type === "MATCHMAKING" && (
            <img
              className="size-10 pb-3"
              src={`/ranks/skillgroup${rank}.svg`}
            />
          )}
          {type === "WINGMAN" && (
            <div className="">
              <img
                className="size-10 pb-3"
                src={`/wingman_ranks/wingman${rank}.svg`}
              />
            </div>
          )}
          {type === "PREMIER" && (
            <div className="">
              <PremierForMatch rating={rank} />
            </div>
          )}
        </div>
        <div className="col-start-6 col-end-7">
          <div
            onClick={() => {
              navigator.clipboard.writeText(crosshair_code || "");
              ToastSuccess(`Crosshair code copied`);
            }}
            className="flex justify-center mt-1 items-center relative cursor-pointer"
          >
            <FaCrosshairs size={17} />
          </div>
        </div>
        <div className="col-start-7 col-end-8">
          <p>{kills_total}</p>
        </div>
        <div className="col-start-8 col-end-9">
          <p>{deaths_total}</p>
        </div>
        <div className="col-start-9 col-end-10">
          <p>{assists_total}</p>
        </div>
        <div className="col-start-10 col-end-11 ml-1">
          <p
            className={cn(
              diff_kd > 0 && "text-green-400",
              diff_kd < 0 && "text-red-400"
            )}
          >
            {diff_kd}
          </p>
        </div>
        <div className="ml-1">
          <p>{mvps}</p>
        </div>
        <div className="ml-2.5">
          <p>{score}</p>
        </div>
        <div className="">
          <p>{kd}</p>
        </div>
        <div className="ml-1">
          <p>{adr}</p>
        </div>
        <div className="ml-1">
          <p>{utility_damage_total}</p>
        </div>
        <div className="ml-2">
          <p>{matchHS}</p>
        </div>
        {type !== "WINGMAN" && (
          <>
            <div className="ml-2">
              <p>{k3_rounds_total}</p>
            </div>
            <div className="ml-2">
              <p>{k4_rounds_total}</p>
            </div>
            <div className="ml-3">
              <p>{ace_rounds_total}</p>
            </div>
            <div className="ml-3">
              <p>{clutchV2}</p>
            </div>
            <div className="ml-3">
              <p>{clutchV3}</p>
            </div>
            <div className="ml-4">
              <p>{clutchV4}</p>
            </div>
            <div className="ml-4">
              <p>{clutchV5}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
