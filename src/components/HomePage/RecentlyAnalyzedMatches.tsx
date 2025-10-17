import { background_maps } from "@/styles/bg_maps";
import { cn } from "@/lib/utils";
import { timeAgo } from "@/lib/timeAgo";
import { MdStarRate } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "@/services/apiService";
import { useNavigate } from "react-router-dom";
interface IMap {
  id: string;
  map: string;
  avg_rank: number;
  type: string;
  score: string;
  dateUnix: number;
}
export const RecentlyAnalyzedMatches = () => {
  const [maps, setMaps] = useState<IMap[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getMatches = async () => {
      const res = await axios.get(API_ENDPOINTS.getLastMatches);
      setMaps(res.data);
    };

    getMatches();
  }, []);

  return (
    <div className="my-8 bg-primary/25 w-full h-72">
      <div className="flex items-center justify-center">
        <p className="text-white text-xl">Recently Analyzed CS2 Matches</p>
      </div>
      <div className="flex overflow-x-auto md:overflow-x-hidden overflow-y-hidden">
        {maps.map((map, index) => (
          <div
            style={{
              opacity: 1, // Устанавливаем финальное значение opacity

              animation: `fadeIn ${1 + index * 0.5}s ease-in-out forwards`, // Применяем анимацию
            }}
            key={map.id}
            onClick={() => navigate(`/match/${map.id}`)}
            className={`${
              background_maps[map.map]
            } h-52 min-w-[105px] sm:min-w-[128px] md:min-w-[160px] xl:min-w-[230px] max-w-full mt-10 bg-cover bg-center cursor-pointer relative hover:scale-105 duration-300 transition-all hover:w-[500px]`}
          >
            {map.type === "MATCHMAKING" && (
              <img
                className="size-16 absolute -top-1"
                src={`/ranks/skillgroup${map.avg_rank}.svg`}
              />
            )}
            {map.type === "WINGMAN" && (
              <img
                className="size-16 absolute -top-1"
                src={`/wingman_ranks/wingman${map.avg_rank}.svg`}
              />
            )}
            {map.type === "PREMIER" && (
              <div
                className={cn(
                  "text-light-blue",
                  "mt-2 -space-y-2 font-semibold bg-[#B1C3D9]/50 rounded-xl w-fit"
                )}
              >
                <p className="hidden md:block">PREMIER</p>

                <div
                  className={cn(
                    "flex text-[8px] md:text-[14px] mt-4 md:mt-0 items-center"
                  )}
                >
                  <MdStarRate className="mt-0.5 text-[8px] md:text-[18px]" />
                  <p className="mt-1 mr-1 md:mr-0 ">{map.avg_rank}</p>
                </div>
              </div>
            )}

            <div
              className={cn(
                "text-white text-center text-3xl xl:text-5xl absolute flex top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-secondary/35 py-1 px-1 rounded-md"
              )}
            >
              {map.score}
            </div>
            <div
              className={cn(
                "absolute bottom-0 sm:flex text-xs xl:text-sm left-0 bg-secondary/25 rounded-r-md"
              )}
            >
              <p className="text-white mx-2">{timeAgo(map.dateUnix)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
