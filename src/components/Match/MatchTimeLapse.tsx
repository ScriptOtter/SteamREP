import { useState } from "react";
import {
  IMatches,
  IPlayerStatisticInMatch,
} from "../CS2MatchesPage/CS2Matches";
import { MatchPlayersStats } from "./MatchPlayersStats";

interface IProps {
  teamWin: IPlayerStatisticInMatch[];
  match: IMatches;
  teamLose: IPlayerStatisticInMatch[];
}
export const MatchTimeLapse = ({ ...props }: IProps) => {
  const { teamWin, match, teamLose } = props;

  const [round, setRound] = useState(1);

  const maxRound =
    Number(match.score.split(":")[0]) + Number(match.score.split(":")[1]);

  const winIds: string[] = teamWin.map((player) => player.steamid);
  const loseIds: string[] = teamLose.map((player) => player.steamid);

  const teamLoseScoreboard = match.parsedMatch[round].filter((player) =>
    loseIds.includes(player.steamid)
  );

  const teamWinScoreboard = match.parsedMatch[round].filter((player) =>
    winIds.includes(player.steamid)
  );
  const finalWinScoreboard = teamWinScoreboard.map((item) => {
    let { rank, crosshair_code } = match.playersStatistic.filter((i) => {
      return i.steamid === item.steamid;
    })[0];

    return {
      ...item,
      rank,
      crosshair_code,
      diff_kd: item.kills_total - item.deaths_total,
      kd:
        item.deaths_total > 0
          ? (item.kills_total / item.deaths_total).toFixed(0)
          : item.kills_total,
      adr: (item.damage_total / round).toFixed(0),
      utility_damage_total: "-",
      matchHS: (
        (Number(item.headshot_kills_total) / Number(item.kills_total)) * 100 ||
        0
      ).toFixed(0),
      k3_rounds_total: item["3k_rounds_total"],
      k4_rounds_total: item["4k_rounds_total"],
      clutchV2: "-",
      clutchV3: "-",
      clutchV4: "-",
      clutchV5: "-",
    };
  });

  const finalLoseScoreboard = teamLoseScoreboard.map((item) => {
    let { rank, crosshair_code } = match.playersStatistic.filter((i) => {
      return i.steamid === item.steamid;
    })[0];

    return {
      ...item,
      rank,
      crosshair_code,
      diff_kd: item.kills_total - item.deaths_total,
      kd:
        item.deaths_total > 0
          ? (item.kills_total / item.deaths_total).toFixed(0)
          : item.kills_total,
      adr: (item.damage_total / round).toFixed(0),
      utility_damage_total: "-",
      matchHS: (
        (Number(item.headshot_kills_total) / Number(item.kills_total)) * 100 ||
        0
      ).toFixed(0),
      k3_rounds_total: item["3k_rounds_total"],
      k4_rounds_total: item["4k_rounds_total"],
      clutchV2: "-",
      clutchV3: "-",
      clutchV4: "-",
      clutchV5: "-",
    };
  });
  // const scoreA = teamWinScoreboard.reduce((acc, item) => {
  //   return (acc += Number(item.score));
  // }, 0);
  // setScore((prev) => ({ ...prev, scoreA }));
  return (
    <>
      <div>
        <div className="flex items-center space-x-8 ml-2">
          <button
            className="bg-primary/25 px-2 py-1 rounded-md font-semibold cursor-pointer hover:bg-primary/50"
            onClick={() => {
              round > 1 && setRound((prev) => prev - 1);
            }}
          >
            Previous round
          </button>
          <p className="font-bold">Current Round {round}</p>

          <button
            className="bg-primary/25 px-2 py-1 rounded-md font-semibold cursor-pointer hover:bg-primary/50"
            onClick={() => round !== maxRound && setRound((prev) => prev + 1)}
          >
            Next round
          </button>
        </div>

        <MatchPlayersStats
          key={Math.random()}
          teamName={"A"}
          matchResult={teamWin[0].result}
          team={finalWinScoreboard as any}
          matchScore={match.score}
          participants={match.participants}
          type={match.type}
        />

        <MatchPlayersStats
          key={Math.random()}
          teamName={"B"}
          matchResult={teamLose[0].result}
          team={finalLoseScoreboard as any}
          matchScore={match.score}
          participants={match.participants}
          type={match.type}
        />
      </div>
    </>
  );
};
