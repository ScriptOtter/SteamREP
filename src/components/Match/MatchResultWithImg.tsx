import { cn } from "@/lib/utils";
import { background_maps } from "@/styles/bg_maps";
import { Container } from "../container";
import { IPlayerStatisticInMatch } from "../CS2MatchesPage/CS2Matches";
import { ISteamUser } from "@/models/ISteamUser";
import { TeamResultOnImg } from "./TeamResultOnImg";

interface IMatchResultWithImg {
  map: string;
  teams: IPlayerStatisticInMatch[];
  participants: ISteamUser[];
}
const findMaxSumObject = (arr: IPlayerStatisticInMatch[]) => {
  return arr.reduce((maxObj, currentObj) => {
    const currentSum =
      currentObj.team_score_first_half + currentObj.team_score_second_half;
    const maxSum = maxObj.team_score_first_half + maxObj.team_score_second_half;

    return currentSum > maxSum ? currentObj : maxObj;
  });
};
export const MatchResultWithImg = ({
  map,
  teams,
  participants,
}: IMatchResultWithImg) => {
  let teamWin: IPlayerStatisticInMatch[] = [];
  let teamLose: IPlayerStatisticInMatch[] = [];
  const team1: IPlayerStatisticInMatch[] = [];
  const team2: IPlayerStatisticInMatch[] = [];
  const team_id = teams[0].team;
  teams.forEach((item) => {
    if (team_id === item.team) team1.push(item);
    else team2.push(item);
  });
  console.log("team1", team1, team2);

  let team1Result = "LOSE";
  if (team1.some((item) => item.result === "WIN")) team1Result = "WIN";
  if (team1.some((item) => item.result === "DRAW")) team1Result = "DRAW";

  let team2Result = "LOSE";
  if (team2.some((item) => item.result === "WIN")) team2Result = "WIN";
  if (team2.some((item) => item.result === "DRAW")) team2Result = "DRAW";

  console.log(team1Result, team2Result);
  if (team1Result === "WIN" || team1Result === "DRAW") {
    teamWin = team1;
    teamLose = team2;
  } else if (team1Result === "LOSE") {
    teamWin = team2;
    teamLose = team1;
  }
  const winResult =
    findMaxSumObject(teamWin).team_score_first_half +
    findMaxSumObject(teamWin).team_score_second_half;
  console.log(winResult);
  const loseResult =
    findMaxSumObject(teamLose).team_score_first_half +
    findMaxSumObject(teamLose).team_score_second_half;

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
                        teammate={teammate}
                        participants={participants}
                      />
                    ))}
                  </div>
                  <div className="flex items-center space-x-32 text-6xl font-mono pt-4">
                    <p
                      className={cn(
                        teamWin[0].result === "WIN" && "text-green-win-match",
                        teamWin[0].result === "DRAW" && "text-white",
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
