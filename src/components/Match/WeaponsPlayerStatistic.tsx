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
      <div className="mx-2 ">
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
                <div className="flex justify-between border-b-1 border-light-gray">
                  <div className="flex flex-1/4 items-center px-5 py-4">
                    {avatar && (
                      <img
                        src={avatar}
                        alt={`Avatar of ${steamid}`}
                        className="w-10 h-10 rounded-full outline-1 outline-light-gray"
                      />
                    )}
                    <div className="ml-2">{nickname}</div>
                  </div>
                  <div className="flex xl:flex-3/4 w-full items-center text-xs ml-30 space-x-4 xl:space-x-7 font-bold">
                    <div className="xl:ml-6 ml-5">Accuracy</div>
                    <div className="xl:ml-13 ml-8">Head</div>
                    <div className="xl:ml-15.5 ml-11">Chest</div>
                    <div className="xl:ml-13 ml-8">Stomach</div>
                    <div className="xl:ml-14 ml-8">Arm L</div>
                    <div className="xl:ml-15.5 ml-10.5">Arm R</div>
                    <div className="xl:ml-16 ml-11">Leg L</div>
                    <div className="xl:ml-15 ml-11">Leg R</div>
                  </div>
                </div>

                <GunStatisitcPlayer stats={playerStats as object} />
              </div>
            )
          );
        })}
      </div>
    </>
  );
};
