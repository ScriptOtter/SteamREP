import {
  IMatches,
  IPlayerStatisticInMatch,
} from "@/components/CS2MatchesPage/CS2Matches";
import { MatchInformation } from "@/components/Match/MatchInformation";
import { MatchResultWithImg } from "@/components/Match/MatchResultWithImg";
import { API_ENDPOINTS } from "@/services/apiService";
import { Header } from "@/views/Header";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RouteParams } from "./ProfilePage";
import { PageLoader } from "@/components/Loader";
import { Container } from "@/components/container";
import { WeaponsPlayerStatistic } from "@/components/Match/WeaponsPlayerStatistic";

import { MatchScoreboard } from "@/components/Match/MatchScoreboard";
import { MatchTimeLapse } from "@/components/Match/MatchTimeLapse";

const findMaxSumObject = (arr: IPlayerStatisticInMatch[]) => {
  return arr.reduce((maxObj, currentObj) => {
    const currentSum =
      currentObj.team_score_first_half + currentObj.team_score_second_half;
    const maxSum = maxObj.team_score_first_half + maxObj.team_score_second_half;

    return currentSum > maxSum ? currentObj : maxObj;
  });
};

export interface IScoreboard extends IPlayerStatisticInMatch {
  diff_kd: number;
  matchHS: string;
  rounds: number;
  kd: string;
  adr: string;
}

export const MatchPage = () => {
  const [match, setMatch] = useState<IMatches | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();
  const { id } = useParams<RouteParams>();
  const [currentPage, setCurrentPage] = useState<
    "Scoreboard" | "WeaponsPlayerStatistic" | "TimeLapse"
  >("Scoreboard");

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const res = await axios.get(API_ENDPOINTS.getMatch + id);

        if (res.data) {
          setMatch(res.data);
          setLoading(false);
        } else {
          setError("Match not found");
          setLoading(false);
        }
      } catch (e) {
        setError("Match not found");
        setLoading(false);
      }
    };
    fetchMatch();
  }, []);

  let teamWin: IPlayerStatisticInMatch[] = [];
  let teamLose: IPlayerStatisticInMatch[] = [];
  const team1: IPlayerStatisticInMatch[] = [];
  const team2: IPlayerStatisticInMatch[] = [];
  if (!match) return;
  const teams = match?.playersStatistic;
  const team_id = teams[0].team;
  teams.forEach((item) => {
    if (team_id === item.team) team1.push(item);
    else team2.push(item);
  });

  let team1Result = "LOSE";
  if (team1.some((item) => item.result === "WIN")) team1Result = "WIN";
  if (team1.some((item) => item.result === "DRAW")) team1Result = "DRAW";

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

  const loseResult =
    findMaxSumObject(teamLose).team_score_first_half +
    findMaxSumObject(teamLose).team_score_second_half;
  const teamWinScoreboard = teamWin.map((item) => ({
    ...item,
    diff_kd: item.kills_total - item.deaths_total,
    matchHS: (
      (Number(item.headshot_kills_total) / Number(item.kills_total)) * 100 || 0
    ).toFixed(0),
    rounds:
      Number(match.score.split(":")[0]) + Number(match.score.split(":")[1]),
    kd:
      item.deaths_total > 0
        ? (item.kills_total / item.deaths_total).toFixed(1)
        : item.kills_total || 0,
    adr: (
      item.damage_total /
      (Number(match.score.split(":")[0]) + Number(match.score.split(":")[1]))
    ).toFixed(0),
  }));
  const teamLoseScoreboard = teamLose.map((item) => ({
    ...item,
    diff_kd: item.kills_total - item.deaths_total,
    matchHS: (
      (Number(item.headshot_kills_total) / Number(item.kills_total)) * 100 || 0
    ).toFixed(0),
    rounds:
      Number(match.score.split(":")[0]) + Number(match.score.split(":")[1]),
    kd:
      item.deaths_total > 0
        ? (item.kills_total / item.deaths_total).toFixed(1)
        : item.kills_total || 0,
    adr: (
      item.damage_total /
      (Number(match.score.split(":")[0]) + Number(match.score.split(":")[1]))
    ).toFixed(0),
  }));

  return (
    <>
      <Header />
      {loading && <PageLoader />}
      {!loading && match ? (
        <div>
          <MatchInformation match={match} />
          <MatchResultWithImg
            teamWin={teamWinScoreboard}
            winResult={winResult}
            teamLose={teamLoseScoreboard}
            loseResult={loseResult}
            type={match.type}
            map={match.map}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            participants={match.participants}
          />

          <div className="flex xl:justify-center mt-6">
            <div className="overflow-x-auto">
              <Container className="text-white min-w-[1150px] max-w-[1600px]">
                {currentPage === "Scoreboard" && (
                  <MatchScoreboard
                    teamWin={teamWin[0].result}
                    match={match}
                    teamLose={teamLose[0].result}
                    teamWinScoreboard={teamWinScoreboard}
                    teamLoseScoreboard={teamLoseScoreboard}
                  />
                )}
                {currentPage === "WeaponsPlayerStatistic" && (
                  <WeaponsPlayerStatistic
                    data={match.kill_stats}
                    participants={match.participants}
                  />
                )}
                {currentPage === "TimeLapse" && (
                  <MatchTimeLapse
                    teamWin={teamWin}
                    match={match}
                    teamLose={teamLose}
                  />
                )}
              </Container>
            </div>
          </div>
          <div className="flex xl:justify-center mt-6">
            <Container className="text-white min-w-[1150px] max-w-[1600px]"></Container>
          </div>
        </div>
      ) : (
        <div className="w-full h-full">
          <div className="flex flex-col items-center font-mono space-y-2 mt-[10%]">
            <p className="text-white text-5xl sm:text-7xl">{error}</p>
          </div>
        </div>
      )}
    </>
  );
};
