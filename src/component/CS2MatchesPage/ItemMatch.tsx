import { cn } from "@/lib/utils";

export interface ItemMatchProps {
  map: string;
  date: string;
  score: string;
  rank: number;
  kills: number;
  deaths: number;
  assists: number;
  HS: number;
  damage: number;
  kills5: number;
  kills4: number;
  kills3: number;
  matchURL: string;
}

export const ItemMatch = ({ ...props }) => {
  const {
    map,
    date,
    score,
    rank,
    kills,
    deaths,
    assists,
    HS,
    damage,
    kills5,
    kills4,
    kills3,
    matchURL,
  }: ItemMatchProps = props.match;

  const matchResult: number =
    (score.split(":")[0] == "13" && 1) ||
    (score.split(":")[1] == "13" && -1) ||
    0;
  return (
    <>
      <div
        className={cn(
          matchResult == 1 && "bg-green-700",
          matchResult == 0 && "bg-gray-600",
          matchResult == -1 && "bg-red-600",
          "mx-2 rounded-s mb-0.5 items-center grid grid-cols-29 gap-1 text-xs xl:text-xl"
        )}
      >
        <div className="flex items-center col-span-3 space-x-2 ml-2 col-start-1">
          <img src={`/public/map_icons/map_icon_${map}.svg`} />
          <div>{map}</div>
        </div>
        <p className="col-span-4 col-start-6 text-xs xl:text-xl">{date}</p>
        <p className="col-span-3 col-start-11">{score}</p>

        <div className="col-span-3 col-start-14">
          <img
            className="w-10 xl:w-16"
            src={`/public/ranks/skillgroup${rank}.svg`}
          />
        </div>

        <p className="col-span-1 col-start-17">{kills}</p>

        <p className="col-span-1 col-start-18">{deaths}</p>

        <p className="col-span-1 col-start-19">{assists}</p>

        <p className="col-span-2 col-start-20">{HS}%</p>
        <p className="col-span-2 col-start-22 ">{damage}</p>

        <p className="col-span-1 col-start-24 ml-1 xl:ml-1.5">{kills5}</p>
        <p className="col-span-1 col-start-25 ml-1 xl:ml-1.5">{kills4}</p>
        <p className="col-span-1 col-start-26  ml-1 xl:ml-1.5">{kills3}</p>

        <p className="col-span-2 col-start-27 text-xs cursor-pointer hover:underline hover:underline-offset-2">
          Open Match
        </p>
      </div>
    </>
  );
};
