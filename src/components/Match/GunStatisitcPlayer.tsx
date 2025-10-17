import { cn } from "@/lib/utils";
import { GunHitsStats, GunProfileHitsStats } from "./GunHitsStats";
import { IWeaponStats } from "@/models/ICS2Stats";

const granadeScale: { [key: string]: string } = {
  hegrenade: "scale-60",
  smokegrenade: "size-10 w-6 ml-5",
  awp: "scale-150 ml-2",
};
export const GunStatisitcPlayer = ({ stats }: { [key: string]: object }) => {
  return (
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
