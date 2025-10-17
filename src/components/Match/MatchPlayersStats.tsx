import { MatchHeader } from "./MatchHeader";
import { PlayerStatsItem } from "./PlayerStatsItem";
import { cn } from "@/lib/utils";
import { ISteamUser } from "@/models/ISteamUser";
import { useEffect, useState } from "react";
import { IScoreboard } from "@/pages/MatchPage";

export interface IMatchPlayersStats {
  teamName: string;
  team: IScoreboard[];
  matchResult: string;
  matchScore: string;
  participants: ISteamUser[];
  type: string;
}
export const MatchPlayersStats = ({ ...props }: IMatchPlayersStats) => {
  const { teamName, team, matchResult, participants, matchScore, type } = props;

  const [filter, setFilter] = useState<keyof IScoreboard>("damage_total");

  const [sortedTeam, setSortedTeam] = useState<IScoreboard[]>(team);
  useEffect(() => {
    function sortByField() {
      const sorted = [...sortedTeam].sort((a, b) => {
        const aValue = a[filter];
        const bValue = b[filter];

        return (bValue as any) - (aValue as any);
      });

      setSortedTeam(sorted);
    }
    sortByField();
  }, [filter]);

  return (
    <>
      <div className="px-2">
        <div className="space-y-2 mb-4">
          <MatchHeader
            teamName={teamName}
            matchResult={matchResult}
            className={""}
            type={type}
            sort={setFilter}
          />
          <div
            className={cn(
              matchResult === "WIN" && "border-green-win-match",
              matchResult === "DRAW" && "border-light-gray-2",
              matchResult === "LOSE" && "border-red-lose-match",
              "rounded-2xl pt-1 pb-2 px-2 outline-1 border-l-4"
            )}
          >
            {sortedTeam &&
              sortedTeam.map((player) => (
                <PlayerStatsItem
                  team={sortedTeam}
                  player={player}
                  matchScore={matchScore}
                  key={player.steamid}
                  participants={participants}
                  type={type}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};
