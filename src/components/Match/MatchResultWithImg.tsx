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
  currentPage: "Scoreboard" | "WeaponsPlayerStatistic" | "TimeLapse";
  setCurrentPage: (
    string: "Scoreboard" | "WeaponsPlayerStatistic" | "TimeLapse"
  ) => void;
}

export const MatchResultWithImg = ({ ...props }: IMatchResultWithImg) => {
  const {
    teamWin,
    winResult,
    teamLose,
    loseResult,
    participants,
    type,
    map,
    currentPage,
  } = props;
  const { setCurrentPage } = props;
  const isWin = teamWin.some((team) => team.result === "WIN");
  const isDraw = teamWin.some((team) => team.result === "DRAW");

  return (
    <>
      <div
        className={cn(
          background_maps[map],
          `w-full sm:h-[120px] md:h-[180px] xl:h-[225px] bg-cover bg-center relative`
        )}
      >
        <div className="md:absolute mt-1 sm:mt-0 bottom-0  w-full sm:bg-secondary/25 bg-secondary/75">
          <div className="sm:ml-[16.5%] ml-3 font-semibold text-md md:text-xl text-white flex space-x-8 py-1">
            <p
              className={cn(
                currentPage === "Scoreboard" && "text-light-blue",
                "cursor-pointer hover:text-light-blue-2 duration-150"
              )}
              onClick={() => setCurrentPage("Scoreboard")}
            >
              Scoreboard
            </p>
            <p
              className={cn(
                currentPage === "WeaponsPlayerStatistic" && "text-light-blue",
                "cursor-pointer hover:text-light-blue-2 duration-150"
              )}
              onClick={() => setCurrentPage("WeaponsPlayerStatistic")}
            >
              Weapons Statistic
            </p>
            <p
              className={cn(
                currentPage === "TimeLapse" && "text-light-blue",
                "cursor-pointer hover:text-light-blue-2 duration-150"
              )}
              onClick={() => setCurrentPage("TimeLapse")}
            >
              Time Lapse
            </p>
          </div>
        </div>
        <div className="w-full h-full bg-gray/70">
          <div className="absolute w-full mt-14">
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
                        isWin && "text-green-win-match",
                        isDraw && "text-white",
                        winResult < 10 && "px-4.5",
                        "text-7xl bg-gray/50 rounded-xl"
                      )}
                    >
                      {winResult}
                    </p>

                    <p
                      className={cn(
                        isWin && "text-red-lose-match",
                        isDraw && "text-white",
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
