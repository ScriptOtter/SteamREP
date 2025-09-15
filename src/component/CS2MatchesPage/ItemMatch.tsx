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
  }: //matchURL,
  ItemMatchProps = props.match;

  const matchResult: number =
    (score.split(":")[0] == "13" && 1) ||
    (score.split(":")[1] == "13" && -1) ||
    0;
  return (
    <>
      <div className="flex items-center space-x-2 col-start-1">
        <img src={`/public/map_icons/map_icon_${map}.svg`} />
        <p className="text-[10px] md:text-[12px] xl:text-[16px]">{map}</p>
      </div>

      <p className="col-span-4 col-start-6 text-xl">{date}</p>
      <div
        className={cn(
          matchResult == 1 &&
            "bg-green-win-match hover:bg-green-win-match-hover",
          matchResult == -1 &&
            "bg-red-lose-match hover:bg-red-lose-match-hover",
          matchResult == 0 && "bg-gray-draw-match hover:bg-gray-match-hover",
          "col-span-3 col-start-11 text-center w-8 md:w-13 rounded-md"
        )}
      >
        <p>{score}</p>
      </div>

      <div className="col-span-3 col-start-14">
        <img className="w-16" src={`/public/ranks/skillgroup${rank}.svg`} />
      </div>

      <p className="col-span-1 col-start-17">{kills}</p>

      <p className="col-span-1 col-start-18">{deaths}</p>

      <p className="col-span-1 col-start-19">{assists}</p>
      <p className="col-span-2 col-start-21">10</p>
      <p className="col-span-2 col-start-23">{HS}%</p>
      <p className="col-span-2 col-start-25 ">{damage}</p>

      <p className="col-span-1 col-start-27">{kills5}</p>
      <p className="col-span-1 col-start-28">{kills4}</p>
      <p className="col-span-1 col-start-29">{kills3}</p>

      <p className="col-span-2 col-start-30 text-xs cursor-pointer hover:underline hover:underline-offset-2">
        Open Match
      </p>
    </>
  );
};
