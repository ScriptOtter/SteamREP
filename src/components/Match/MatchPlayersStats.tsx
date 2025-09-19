import { IMatchPlayer } from "@/models/IMatchPlayer";
import { MatchHeader } from "./MatchHeader";
import { PlayerStatsItem } from "./PlayerStatsItem";
import { cn } from "@/lib/utils";

export const MatchPlayersStats = ({
  teamName,
  matchResult,
  team,
}: {
  teamName: string;
  matchResult: number;
  team: IMatchPlayer[];
}) => {
  return (
    <>
      <div className="space-y-2 mb-4 ">
        <MatchHeader teamName={teamName} matchResult={matchResult} />
        <div
          className={cn(
            matchResult == 1 && "border-green-win-match",
            matchResult == 0 && "border-light-gray-2",
            matchResult == -1 && "border-red-lose-match",
            "rounded-2xl pt-1 pb-2 px-2 outline-1 border-l-4"
          )}
        >
          {team &&
            team.map((player: IMatchPlayer, index: number) => (
              <PlayerStatsItem player={player} key={index} />
            ))}
        </div>
      </div>
    </>
  );
};
