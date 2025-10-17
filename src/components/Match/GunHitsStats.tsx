import { cn } from "@/lib/utils";
import { GunPie } from "./GunPie";
import { IHits } from "@/models/ICS2Stats";

interface HitItem {
  hits: number;
  totalDamage: number;
  kills: number;
}

interface Accumulator {
  totalHits: number;
  totalDamage: number;
  totalKills: number;
}
export const GunHitsStats = ({ hits, fire }: any) => {
  const colums = [
    "Accuracy",
    "head",
    "chest",
    "stomach",
    "left_arm",
    "right_arm",
    "left_leg",
    "right_leg",
  ];

  return (
    <div className={cn("flex ml-4 xl:space-x-16 space-x-8")}>
      {colums.map((col) => {
        const hitStats = hits[col]; // Получаем статистику для текущего col
        if (col === "Accuracy") {
          const totalSum = (
            Object.values(hits) as HitItem[]
          ).reduce<Accumulator>(
            (acc, item) => {
              acc.totalHits += item.hits;
              acc.totalDamage += item.totalDamage;
              acc.totalKills += item.kills;

              return acc;
            },
            { totalHits: 0, totalDamage: 0, totalKills: 0 }
          );

          return (
            <GunPie
              fire={fire}
              kills={totalSum?.totalKills}
              totalDamage={totalSum?.totalDamage}
              hits={totalSum?.totalHits}
            />
          );
        }
        return (
          <div key={col} className="flex">
            {hitStats ? (
              <GunPie
                fire={fire}
                kills={hitStats.kills}
                totalDamage={hitStats.totalDamage}
                hits={hitStats.hits}
              />
            ) : (
              <GunPie fire={1} kills={0} totalDamage={0} hits={0} />
            )}
          </div>
        );
      })}
    </div>
  );
};
interface Props {
  hits: IHits[];
  fire: number;
}
export const GunProfileHitsStats = ({ ...props }: Props) => {
  const { hits, fire } = props;
  const colums = [
    "Accuracy",
    "head",
    "chest",
    "stomach",
    "left_arm",
    "right_arm",
    "left_leg",
    "right_leg",
  ];

  return (
    <>
      {colums.map((col, index) => {
        const hitStats = hits[index]; // Получаем статистику для текущего col
        if (col === "Accuracy") {
          const totalSum = (
            Object.values(hits) as HitItem[]
          ).reduce<Accumulator>(
            (acc, item) => {
              acc.totalHits += item.hits;
              acc.totalDamage += item.totalDamage;
              acc.totalKills += item.kills;

              return acc;
            },
            { totalHits: 0, totalDamage: 0, totalKills: 0 }
          );

          return (
            <div key={col} className="flex items-center justify-start">
              <GunPie
                fire={fire}
                kills={totalSum?.totalKills}
                totalDamage={totalSum?.totalDamage}
                hits={totalSum?.totalHits}
              />
            </div>
          );
        }
        return (
          <div key={col} className="flex items-center justify-start">
            {hitStats ? (
              <GunPie
                fire={fire}
                kills={hitStats.kills}
                totalDamage={hitStats.totalDamage}
                hits={hitStats.hits}
              />
            ) : (
              <GunPie fire={1} kills={0} totalDamage={0} hits={0} />
            )}
          </div>
        );
      })}
    </>
  );
};
