import { ISteamUser } from "@/models/ISteamUser";
import { IPlayerStatisticInMatch } from "../CS2MatchesPage/CS2Matches";
import { PremierForAnalyzedMatches } from "../PremierRating";
import { cn } from "@/lib/utils";
import { playerColors } from "@/lib/playerColors";
import { useNavigate } from "react-router-dom";

interface ITeamResultOnImg {
  type: string;
  teammate: IPlayerStatisticInMatch;
  participants: ISteamUser[];
}
export const TeamResultOnImg = ({
  type,
  teammate,
  participants,
}: ITeamResultOnImg) => {
  const navigate = useNavigate();
  return (
    <div className="max-w-16 -mb-8">
      <img
        onClick={() => navigate(`/profile/${teammate.steamid}`)}
        className={cn(
          teammate.player_color &&
            `outline-1 ${playerColors[teammate.player_color]}`,
          "size-16 rounded-full shadow-2xl shadow-black cursor-pointer hover:outline-2"
        )}
        src={
          participants.find((i) => i.id === teammate.steamid)?.avatar ||
          "https://avatars.steamstatic.com/600a54e62405d2696730eabca74233adfd9aea7e_full.jpg"
        }
      />
      <p className="line-clamp-1 text-center text-xs text-white shadow-2xl shadow-black">
        {teammate.name}
      </p>
      {}

      {type === "MATCHMAKING" && (
        <img
          className="size-16 -mt-3"
          src={`/ranks/skillgroup${teammate.rank}.svg`}
        />
      )}
      {type === "WINGMAN" && (
        <img
          className="w-16 ml-[2px]"
          src={`/wingman_ranks/wingman${teammate.rank}.svg`}
        />
      )}
      {type === "PREMIER" && (
        <div className="mt-1">
          {" "}
          <PremierForAnalyzedMatches rating={teammate.rank} />
        </div>
      )}
    </div>
  );
};
