import { MatchPlayersStats } from "./MatchPlayersStats";

export const MatchScoreboard = ({ ...props }) => {
  const { teamWin, match, teamLose, teamWinScoreboard, teamLoseScoreboard } =
    props;

  return (
    <>
      <MatchPlayersStats
        teamName={"A"}
        matchResult={teamWin}
        team={teamWinScoreboard}
        matchScore={match.score}
        participants={match.participants}
        type={match.type}
      />

      <MatchPlayersStats
        teamName={"B"}
        matchResult={teamLose}
        team={teamLoseScoreboard}
        matchScore={match.score}
        participants={match.participants}
        type={match.type}
      />
    </>
  );
};
