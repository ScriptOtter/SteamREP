import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

export const MatchHeader = ({ ...props }) => {
  const typeResult: { [key: number]: string } = {
    "-1": "Lost",
    "0": "Match canceled",
    "1": "Win",
  };

  const typeResultColor: { [key: number]: string } = {
    "-1": "text-red-lose-match",
    "0": "text-gray",
    "1": "text-green-win-match",
  };
  const { teamName, matchResult } = props;
  return (
    <>
      <div className="grid grid-cols-15 text-md">
        <p className="col-start-1 text-xl">Team {teamName}</p>
        <p
          className={cn(
            typeResultColor[matchResult],
            "col-start-2 font-semibold ml-2 text-xl"
          )}
        >
          {typeResult[matchResult]}
        </p>
        <p className="col-start-5 ml-1">Rank</p>

        <p className="col-start-7 ml-1">K</p>
        <p className="col-start-8 ml-1">D</p>
        <p className="col-start-9 ml-0.5">A</p>
        <p className="col-start-10">+/-</p>

        <Star size={16} className="text-yellow-500 mt-1" />

        <p>K/D</p>
        <p>ADR</p>
        <p>HS%</p>
      </div>
    </>
  );
};
