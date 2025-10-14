import { background_maps } from "@/styles/bg_maps";
import { cn } from "@/lib/utils";
import { timeAgo } from "@/lib/timeAgo";
import { MdStarRate } from "react-icons/md";

export const RecentlyAnalyzedMatches = () => {
  const maps = [
    {
      map: "de_dust2",
      avg_rank: "12",
      type: "MATCHMAKING",
      score: "13:4",
      unixTime: 1760393490,
    },
    {
      map: "de_nuke",
      avg_rank: "1422",
      type: "PREMIER",
      score: "13:4",
      unixTime: 1760393465,
    },
    {
      map: "de_inferno",
      avg_rank: "2",
      type: "WINGMAN",
      score: "9:2",
      unixTime: 1760393465,
    },
    {
      map: "de_anubis",
      avg_rank: "1",
      type: "MATCHMAKING",
      score: "9:2",
      unixTime: 1760393465,
    },
    {
      map: "de_dust2",
      avg_rank: "12",
      type: "MATCHMAKING",
      score: "13:4",
      unixTime: 1760393465,
    },
    {
      map: "de_nuke",
      avg_rank: "1422",
      type: "PREMIER",
      score: "13:4",
      unixTime: 1760393465,
    },
    {
      map: "de_inferno",
      avg_rank: "2",
      type: "WINGMAN",
      score: "9:2",
      unixTime: 1760393465,
    },
    {
      map: "de_anubis",
      avg_rank: "1",
      type: "MATCHMAKING",
      score: "9:2",
      unixTime: 1760393465,
    },
  ];

  return (
    <div className="my-8 bg-primary/25 w-full h-72">
      <div className="flex items-center justify-center">
        <p className="text-white text-xl">Recently Analyzed CS2 Matches</p>
      </div>
      <div className="flex">
        {maps.map((map) => (
          <div
            className={`${
              background_maps[map.map]
            } h-52 w-[280px] mt-10 bg-cover bg-center cursor-pointer relative`}
          >
            {map.type === "MATCHMAKING" && (
              <img
                className="size-16 absolute -top-1"
                src={`/ranks/skillgroup${map.avg_rank}.svg`}
                alt=""
              />
            )}
            {map.type === "WINGMAN" && (
              <img
                className="size-16 absolute -top-1"
                src={`/wingman_ranks/wingman${map.avg_rank}.svg`}
                alt=""
              />
            )}
            {map.type === "PREMIER" && (
              <div className={cn(" mt-2 text-black -space-y-2 font-semibold")}>
                <p className="hidden md:block">PREMIER:</p>

                <div className="flex text-xs md:text-md mt-4 md:mt-0">
                  <MdStarRate className="mt-0.5" size={18} />
                  <p className="mt-1 mr-1 md:mr-0">{map.avg_rank}1</p>
                </div>
              </div>
            )}

            <div
              className={cn(
                Number(map.score.split(":")[0]) < 10 &&
                  Number(map.score.split(":")[1]) < 10
                  ? "sm:left-6/17"
                  : "sm:left-5/16",
                " text-white text-center sm:text-xl md:text-2xl xl:text-5xl absolute left-1/5 flex top-2/3"
              )}
            >
              {map.score}
            </div>
            <div
              className={cn(
                "absolute bottom-0 hidden sm:flex text-xs xl:text-sm xl:-bottom-6 left-1"
              )}
            >
              <p className="text-white">{timeAgo(map.unixTime)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
