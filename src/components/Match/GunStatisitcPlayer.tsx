import { cn } from "@/lib/utils";
import { GunHitsStats, GunProfileHitsStats } from "./GunHitsStats";
import { IWeaponStats } from "@/models/ICS2Stats";
import { useState } from "react";

const granadeScale: { [key: string]: string } = {
  hegrenade: "scale-60",
  smokegrenade: "size-10 w-6 ml-5",
  awp: "scale-150 ml-2",
};

interface IProps {
  stats: { [key: string]: any };
  steamid: string;
  avatar: string | null | undefined;
  nickname: string | null | undefined;
}

export const GunStatisitcPlayer = ({ ...props }: IProps) => {
  const { stats, steamid, avatar, nickname } = props;
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <>
      <div
        className={cn(
          visible && "bg-gray border-b-1",
          "flex justify-between  border-light-gray rounded-xl hover:bg-gray cursor-pointer"
        )}
        onClick={() => {
          setVisible((prev) => !prev);
        }}
      >
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
        {visible && (
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
        )}
      </div>

      {visible && (
        <div className="ml-4 p-2">
          {Object.entries(stats)
            .sort((a, b) => {
              return b[1].fire - a[1].fire;
            })
            .map(
              ([weapon, weaponStats]) =>
                weaponStats.fire > 0 && (
                  <div className="items-center grid grid-cols-12" key={weapon}>
                    <img
                      className={cn(
                        `w-16 col-start-1 col-end-2 ${granadeScale[weapon]}`
                      )}
                      src={`/weapons/${weapon}_light.png`}
                      alt={`${weapon}`}
                    />
                    <p className="col-start-2 col-end-3">{weapon}</p>
                    <p className="col-start-3 col-end-4">
                      Shoots {weaponStats.fire}
                    </p>
                    <div className="ml-8 xl:ml-20">
                      <GunHitsStats
                        hits={weaponStats.hits}
                        fire={weaponStats.fire}
                      />
                    </div>
                  </div>
                )
            )}
        </div>
      )}
    </>
  );
};

interface Props {
  weapons: IWeaponStats[];
}
export const GunStatisiticProfile = ({ ...props }: Props) => {
  const { weapons } = props;

  return (
    <div>
      {weapons
        .sort((a: any, b: any) => {
          return b.fire - a.fire;
        })
        .map(
          ({ hits, fire, name, id }) =>
            fire > 0 && (
              <div
                className="items-center grid grid-cols-11 gap-12 md:gap-0"
                key={id}
              >
                <img
                  className={cn(`${granadeScale[name]}`)}
                  src={`/weapons/${name}_light.png`}
                  alt={`${name}`}
                />
                <p className=" col-start-2 col-end-3 text-xs xl:text-[14px]">
                  {name}
                </p>
                <p className="col-start-3 col-end-4 text-xs xl:text-md">
                  Shoots {fire}
                </p>

                <GunProfileHitsStats hits={hits} fire={fire} />
              </div>
            )
        )}
    </div>
  );
};
