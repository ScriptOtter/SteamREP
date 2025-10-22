import { ISteamUser } from "@/models/ISteamUser";
import { GunStatisitcPlayer } from "./GunStatisitcPlayer";
interface IProps {
  data: object;
  participants: ISteamUser[];
}
export const WeaponsPlayerStatistic = ({ ...props }: IProps) => {
  const { data, participants } = props;

  return (
    <>
      <p className="text-xl font-semibold mt-4">Weapons Player Statistic</p>
      <div className="mx-2">
        {Object.entries(data).map(([steamid, playerStats]) => {
          // Находим участника по steamid
          const teammate = participants.find((i) => i.id === steamid);
          const avatar = teammate ? teammate.avatar : null;
          const nickname = teammate ? teammate.personaName : null;
          return (
            steamid !== "null" && (
              <div
                key={steamid}
                className="outline-1 rounded-xl outline-white my-4"
              >
                <GunStatisitcPlayer
                  stats={playerStats}
                  steamid={steamid}
                  avatar={avatar}
                  nickname={nickname}
                />
              </div>
            )
          );
        })}
      </div>
    </>
  );
};
