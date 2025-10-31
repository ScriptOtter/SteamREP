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

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export function RecentlyAnalyzedMatches() {
  const [maps, setMaps] = useState<IMap[]>([]);

  useEffect(() => {
    const getMatches = async () => {
      const res = await axios.get(API_ENDPOINTS.getLastMatches);
      setMaps(res.data);
    };

    getMatches();
  }, []);
  const navigate = useNavigate();
  return (
    <div className="my-8 bg-primary/35 pb-[16%] w-full h-72">
      <div className="flex items-center justify-center">
        <p className="text-white text-xl">Recently Analyzed CS2 Matches</p>
      </div>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {maps.map((map, index) => (
            <CarouselItem
              key={index}
              className=" basis-1/3 md:basis-1/5 lg:basis-1/10"
              onClick={() => navigate(`/match/${map.id}`)}
            >
              <div className="w-full h-full">
                <Card
                  style={{
                    opacity: 1, // Устанавливаем финальное значение opacity
                    animation: `fadeIn ${
                      1 + index * 0.5
                    }s ease-in-out forwards`, // Применяем анимацию
                  }}
                  key={map.id}
                  className={cn(
                    `${background_maps[map.map]}`,
                    "max-w-full mt-10 bg-cover bg-center cursor-pointer relative hover:scale-105 duration-300 transition-all hover:w-[500px]"
                  )}
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
                        "mt-2 -space-y-2 font-semibold bg-[#B1C3D9]/50 rounded-xl absolute top-0 left-0"
                      )}
                    >
                      <p className="">PREMIER</p>

                      <div
                        className={cn("flex text-[14px] md:mt-0 items-center")}
                      >
                        <MdStarRate className="mt-0.5 text-[18px]" />
                        <p className="mt-1 mr-1 md:mr-0 ">{map.avg_rank}</p>
                      </div>
                    </div>
                  )}

                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <div
                      className={cn(
                        "text-white text-center text-3xl xl:text-5xl absolute flex top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-secondary/35 py-1 px-1 rounded-md"
                      )}
                    >
                      {map.score}
                    </div>
                    <div
                      className={cn(
                        "absolute bottom-0 sm:flex text-xs xl:text-sm left-0 bg-secondary/35 rounded-r-md"
                      )}
                    >
                      <p className="text-white mx-2 mb-2">
                        {timeAgo(map.dateUnix)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* <CarouselNext className="text-white absolute size-12 top-1/2 -right-2 bg-primary/16 rounded-r-xl cursor-pointer duration-300 hover:left-0 hover:text-light-blue-3 " /> */}
      </Carousel>
    </div>
  );
}
