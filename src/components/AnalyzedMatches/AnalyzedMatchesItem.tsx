import { timeAgo } from "@/lib/timeAgo";
import {
  IMatches,
  IPlayerStatisticInMatch,
} from "../CS2MatchesPage/CS2Matches";
import { PremierForAnalyzedMatches } from "../PremierRating";
import { getTeamScore, parseTeams } from "@/pages/MatchPage";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const typeMatch: Record<string, string> = {
  MATCHMAKING: "cs2",
  WINGMAN: "cs2",
  PREMIER: "cs2",
  FACEIT: "faceit",
};
const sumStats = (playersStatistic: IPlayerStatisticInMatch[]) => {
  const initialObject = {
    kills_total: 0,
    deaths_total: 0,
    assists_total: 0,
    ace_rounds_total: 0,
    k4_rounds_total: 0,
    k3_rounds_total: 0,
    clutchV5: 0,
    clutchV4: 0,
    clutchV3: 0,
  };
  return playersStatistic.reduce((acc, item) => {
    acc.kills_total += item.kills_total;
    acc.deaths_total += item.deaths_total;
    acc.assists_total += item.assists_total;
    acc.ace_rounds_total += item.ace_rounds_total;
    acc.k4_rounds_total += item.k4_rounds_total;
    acc.k3_rounds_total += item.k3_rounds_total;
    acc.clutchV5 += item.clutchV5;
    acc.clutchV4 += item.clutchV4;
    acc.clutchV3 += item.clutchV3;
    return acc;
  }, initialObject);
};
const AnalyzedMatchesItem = ({ match }: { match: IMatches }) => {
  const { avg_rank, dateUnix, type, map, participants, playersStatistic, id } =
    match;
  const { teamWin, teamLose } = parseTeams(match);
  const winResult = getTeamScore(teamWin);
  const loseResult = getTeamScore(teamLose);
  const isWin = teamWin.some((team) => team.result === "WIN");
  const isDraw = teamWin.some((team) => team.result === "DRAW");
  const stats = sumStats(playersStatistic);
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/match/${id}`)}
      className=" text-white grid grid-cols-9 py-1 cursor-pointer hover:bg-gray"
    >
      <div className="w-full flex items-center justify-center">
        <img
          src={`/match_type/${typeMatch[type]}.png`}
          alt="Match_type"
          width={50}
        />{" "}
      </div>
      <div className="flex items-center justify-center">
        {type === "MATCHMAKING" && (
          <img
            className="ml-0.5"
            src={`/ranks/skillgroup${avg_rank}.svg`}
            width={50}
          />
        )}
        {type === "WINGMAN" && (
          <img
            className="ml-0.5"
            src={`/wingman_ranks/wingman${avg_rank}.svg`}
            width={50}
          />
        )}
        {type === "PREMIER" && (
          <div className="mr-6">
            <PremierForAnalyzedMatches rating={avg_rank} />
          </div>
        )}
      </div>
      <div className="flex items-center justify-center">
        {dateUnix && timeAgo(dateUnix)}
      </div>
      <div className="flex ml-12 space-x-1">
        <img src={`/map_icons/map_icon_${map}.svg`} alt="map_icon" width={24} />

        <p>{map}</p>
      </div>
      <div
        className={cn(
          type === "WINGMAN" && "w-full ml-17",
          "flex space-x-0.5 size-5 items-center"
        )}
      >
        {teamWin.map((item) => (
          <img
            onClick={(event) => {
              event.stopPropagation();
              navigate(`/profile/${item.steamid}`);
            }}
            className="rounded-full size-5 cursor-pointer hover:outline-1 hover:outline-light-gray"
            src={participants.find((i) => i.id === item.steamid)?.avatar}
          />
        ))}
        <p
          className={cn(
            isWin && "text-green-win-match",
            isDraw && "text-white",
            winResult < 10 && "px-1",
            "text-xs ml-1"
          )}
        >
          {winResult}
        </p>
      </div>
      <div className="flex space-x-0.5 size-5 items-center">
        <p
          className={cn(
            isWin && "text-red-lose-match",
            isDraw && "text-white",
            loseResult < 10 && "px-0.5",
            "text-xs ml-1"
          )}
        >
          {loseResult}
        </p>
        {teamLose.map((item) => (
          <img
            onClick={(event) => {
              event.stopPropagation();
              navigate(`/profile/${item.steamid}`);
            }}
            className="rounded-full cursor-pointer hover:outline-1 hover:outline-light-gray"
            src={participants.find((i) => i.id === item.steamid)?.avatar}
          />
        ))}
      </div>
      <div className="text-xs grid grid-cols-3">
        <p>{stats.kills_total}</p>
        <p>{stats.deaths_total}</p>
        <p>{stats.assists_total}</p>
      </div>

      <div className="text-xs grid grid-cols-3 ml-2">
        <p>{stats.ace_rounds_total}</p>
        <p>{stats.k4_rounds_total}</p>
        <p>{stats.k3_rounds_total}</p>
      </div>

      <div className="text-xs grid grid-cols-3 ml-2">
        <p>{stats.clutchV5}</p>
        <p>{stats.clutchV4}</p>
        <p>{stats.clutchV3}</p>
      </div>
    </div>
  );
};

export default AnalyzedMatchesItem;
