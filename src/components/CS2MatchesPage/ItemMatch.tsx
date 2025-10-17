import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { IMatches, IPlayerStatisticInMatch } from "./CS2Matches";
import { Lightbulb } from "lucide-react";
import { useState } from "react";
import { PremierRatingInMatch } from "../PremierRating";

export const ItemMatch = ({ ...props }) => {
  const [lightbulbDesc, setLightbulbDesc] = useState<boolean>(false);

  const {
    date,
    id,
    map,
    score,
    type,
    playersStatistic,
  }: //matchURL,
  IMatches = props.match;

  const {
    assists_total,
    ace_rounds_total,
    damage_total,
    deaths_total,
    headshot_kills_total,
    isSuspicious,
    k3_rounds_total,
    k4_rounds_total,
    kills_total,
    mvps,
    rank,
    result,
  }: IPlayerStatisticInMatch = playersStatistic[0];
  const matchDate =
    date.split(" ")[0] + " " + date.split(" ")[1] + " " + date.split(" ")[2];
  let displayedScore = score;
  if (
    result === "WIN" &&
    Number(score.split(":")[0]) > Number(score.split(":")[1])
  ) {
    displayedScore = score; // отображаем как есть
  } else displayedScore = score.split(":").reverse().join(":"); // переворачиваем

  if (
    result === "LOSE" &&
    Number(score.split(":")[1]) > Number(score.split(":")[0])
  ) {
    displayedScore = score; // отображаем как есть
  }

  const navigate = useNavigate();
  const matchHS = (
    (Number(headshot_kills_total) / Number(kills_total) || 0) * 100
  ).toFixed(0);

  return (
    <>
      {type !== "ERROR" && (
        <>
          <div className="flex items-center space-x-2 py-1 col-start-1">
            {isSuspicious && (
              <div className="relative">
                <Lightbulb
                  size={20}
                  className="cursor-pointer text-red-600"
                  onMouseEnter={() => setLightbulbDesc(true)}
                  onMouseLeave={() => setLightbulbDesc(false)}
                />
                {lightbulbDesc && (
                  <div className="absolute top-0 right-6 text-xs bg-gray outline-1 outline-light-gray-2 p-1 rounded-md">
                    Suspicious
                  </div>
                )}
              </div>
            )}
            <img src={`/map_icons/map_icon_${map}.svg`} />
            <p className="text-[10px] md:text-[12px] xl:text-[16px]">{map}</p>
          </div>

          <p className="col-span-4 col-start-6 text-md">{matchDate}</p>
          <div
            className={cn(
              result === "WIN" &&
                "bg-green-win-match hover:bg-green-win-match-hover",
              result === "LOSE" &&
                "bg-red-lose-match hover:bg-red-lose-match-hover",
              result === "DRAW" &&
                "bg-gray-draw-match hover:bg-gray-match-hover",
              "col-span-3 col-start-11 text-center w-8 md:w-13 rounded-md"
            )}
          >
            <p>{displayedScore}</p>
          </div>

          <div className="col-span-3 col-start-14">
            {type === "MATCHMAKING" && (
              <img className="w-16 ml-2" src={`/ranks/skillgroup${rank}.svg`} />
            )}
            {type === "WINGMAN" && (
              <img
                className="w-16 ml-2"
                src={`/wingman_ranks/wingman${rank}.svg`}
              />
            )}
            {type === "PREMIER" && <PremierRatingInMatch rating={rank} />}
          </div>

          <p
            className={cn(kills_total < 9 && "ml-1", "col-span-1 col-start-17")}
          >
            {kills_total}
          </p>

          <p
            className={cn(
              deaths_total > 9 && "mr-0.5",
              "col-span-1 col-start-18"
            )}
          >
            {deaths_total}
          </p>

          <p className="col-span-1 col-start-19">{assists_total}</p>
          <p className="col-span-2 col-start-21 ml-1">{mvps}</p>
          <p className="col-span-2 col-start-23">{matchHS}%</p>
          <p
            className={cn(
              damage_total < 1000 && "ml-1",
              "col-span-2 col-start-25"
            )}
          >
            {damage_total}
          </p>

          <p className="col-span-1 col-start-27">{ace_rounds_total}</p>
          <p className="col-span-1 col-start-28">{k4_rounds_total}</p>
          <p className="col-span-1 col-start-29">{k3_rounds_total}</p>

          <p
            onClick={() => navigate(`/match/${id}`)}
            className="col-span-2 col-start-30 text-xs cursor-pointer hover:underline hover:underline-offset-2"
          >
            Open Match
          </p>
        </>
      )}
    </>
  );
};
