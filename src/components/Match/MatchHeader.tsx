import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { IPlayerStatisticInMatch } from "../CS2MatchesPage/CS2Matches";

interface IMatchHeader {
  teamName: string;
  matchResult: string;
  type: string;
  className?: string;
  sort: (key: keyof IPlayerStatisticInMatch) => any;
}
export const MatchHeader = ({ ...props }: IMatchHeader) => {
  const typeResultColor: { [key: string]: string } = {
    LOSE: "text-red-lose-match",
    DRAW: "text-gray",
    WIN: "text-green-win-match",
  };
  const { teamName, matchResult, type } = props;
  const { sort } = props;
  const useSort = (col: string) => {
    sort(col as keyof IPlayerStatisticInMatch);
  };
  return (
    <>
      <div
        className={cn(
          type !== "WINGMAN" ? "grid-cols-24" : "grid-cols-17",
          "grid  mt-4"
        )}
      >
        <div className="col-start-1 col-end-2 md:col-end-1 text-xl flex space-x-2">
          <p>Team</p>
          <p>{teamName}</p>
        </div>
        <p
          className={cn(
            typeResultColor[matchResult],
            "md:col-start-2 col-start-3 font-semibold ml-2 text-xl"
          )}
        >
          {matchResult}
        </p>
        <p
          onClick={() => useSort("rank")}
          className="col-start-5 ml-2 cursor-pointer"
        >
          Rank
        </p>

        <p
          onClick={() => useSort("kills_total")}
          className="col-start-7 ml-1.5 cursor-pointer"
        >
          K
        </p>
        <p
          onClick={() => useSort("deaths_total")}
          className="col-start-8 ml-1.5 cursor-pointer"
        >
          D
        </p>
        <p
          onClick={() => useSort("assists_total")}
          className="col-start-9 ml-1 cursor-pointer"
        >
          A
        </p>
        <p
          onClick={() => useSort("diff_kd")}
          className="col-start-10 ml-1 cursor-pointer"
        >
          +/-
        </p>

        <Star
          size={16}
          onClick={() => useSort("mvps")}
          className="text-yellow-500 mt-1 ml-1 cursor-pointer"
        />
        <p onClick={() => useSort("score")} className="cursor-pointer">
          Score
        </p>
        <p onClick={() => useSort("kd")} className="cursor-pointer">
          K/D
        </p>
        <p onClick={() => useSort("adr")} className="cursor-pointer">
          ADR
        </p>
        <p
          onClick={() => useSort("utility_damage_total")}
          className="cursor-pointer"
        >
          UDM
        </p>
        <p onClick={() => useSort("matchHS")} className="cursor-pointer">
          HS%
        </p>
        {type !== "WINGMAN" && (
          <>
            <p
              onClick={() => useSort("k3_rounds_total")}
              className="cursor-pointer"
            >
              3K
            </p>
            <p
              onClick={() => useSort("k4_rounds_total")}
              className="cursor-pointer"
            >
              4K
            </p>
            <p
              onClick={() => useSort("ace_rounds_total")}
              className="cursor-pointer"
            >
              ACE
            </p>
            <p onClick={() => useSort("clutchV2")} className="cursor-pointer">
              1v2
            </p>
            <p onClick={() => useSort("clutchV3")} className="cursor-pointer">
              1v3
            </p>
            <p onClick={() => useSort("clutchV4")} className="cursor-pointer">
              1v4
            </p>
            <p onClick={() => useSort("clutchV5")} className="cursor-pointer">
              1v5
            </p>
          </>
        )}
      </div>
    </>
  );
};
