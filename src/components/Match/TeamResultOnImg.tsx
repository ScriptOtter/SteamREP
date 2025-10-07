import { ISteamUser } from "@/models/ISteamUser";
import { IPlayerStatisticInMatch } from "../CS2MatchesPage/CS2Matches";

interface ITeamResultOnImg {
  teammate: IPlayerStatisticInMatch;
  participants: ISteamUser[];
}
export const TeamResultOnImg = ({
  teammate,
  participants,
}: ITeamResultOnImg) => {
  return (
    <div className="max-w-16 -mb-8">
      <img
        className="size-16 rounded-full shadow-2xl shadow-black outline-1 outline-light-gray-2"
        src={
          participants.find((i) => i.id === teammate.steamid)?.avatar ||
          "https://avatars.steamstatic.com/600a54e62405d2696730eabca74233adfd9aea7e_full.jpg"
        }
      />
      <p className="line-clamp-1 text-center text-xs text-white shadow-2xl shadow-black">
        {teammate.name}
      </p>
      <img
        className="size-16 -mt-3"
        src={`/ranks/skillgroup${teammate.rank}.svg`}
      />
    </div>
  );
};
