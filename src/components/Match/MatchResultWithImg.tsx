import { cn } from "@/lib/utils";
import { background_maps } from "@/styles/bg_maps";
import { Container } from "../container";
import { IPlayerStatisticInMatch } from "../CS2MatchesPage/CS2Matches";
import { ISteamUser } from "@/models/ISteamUser";
import { TeamResultOnImg } from "./TeamResultOnImg";

interface IMatchResultWithImg {
  teamWin: IPlayerStatisticInMatch[];
  winResult: number;
  teamLose: IPlayerStatisticInMatch[];
  loseResult: number;
  type: string;
  map: string;
  participants: ISteamUser[];
}

export const MatchResultWithImg = ({ ...props }: IMatchResultWithImg) => {
  const { teamWin, winResult, teamLose, loseResult, participants, type, map } =
    props;

  return (
    <>
      <div
        className={cn(
          background_maps[map],
          `w-full sm:h-[120px] md:h-[180px] xl:h-[225px] bg-cover bg-center relative`
        )}
      >
        <div className="w-full h-full bg-gray/70">
          <div className="absolute w-full mt-16">
            <div className="xl:flex hidden justify-center">
              <Container className="max-w-[1440px]">
                <div className="flex justify-between mx-12">
                  <div className="flex space-x-8">
                    {teamWin.map((teammate) => (
                      <TeamResultOnImg
                        type={type}
                        teammate={teammate}
                        participants={participants}
                      />
                    ))}
                  </div>

                  <div className="flex items-center space-x-32 text-6xl font-mono pt-4">
                    <p
                      className={cn(
                        teamWin[0].result === "WIN" && "text-green-win-match",
                        teamWin[1].result === "WIN" && "text-green-win-match",
                        teamWin[2].result === "WIN" && "text-green-win-match",
                        teamWin[3].result === "WIN" && "text-green-win-match",
                        teamWin[4].result === "WIN" && "text-green-win-match",
                        teamWin[0].result === "DRAW" && "text-white",
                        teamWin[1].result === "DRAW" && "text-white",
                        teamWin[2].result === "DRAW" && "text-white",
                        teamWin[3].result === "DRAW" && "text-white",
                        teamWin[4].result === "DRAW" && "text-white",
                        winResult < 10 && "px-4.5",
                        "text-7xl bg-gray/50 rounded-xl"
                      )}
                    >
                      {winResult}
                    </p>

                    <p
                      className={cn(
                        teamLose[0].result === "LOSE" && "text-red-300",
                        teamLose[0].result === "DRAW" && "text-white",
                        teamLose[1].result === "DRAW" && "text-white",
                        teamLose[2].result === "DRAW" && "text-white",
                        teamLose[3].result === "DRAW" && "text-white",
                        teamLose[4].result === "DRAW" && "text-white",
                        loseResult < 10 && "px-4.5",
                        "text-7xl bg-gray/50 rounded-xl"
                      )}
                    >
                      {loseResult}
                    </p>
                  </div>

                  <div className="flex space-x-8">
                    {teamLose.map((teammate) => (
                      <TeamResultOnImg
                        type={type}
                        teammate={teammate}
                        participants={participants}
                      />
                    ))}
                  </div>
                </div>
              </Container>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
