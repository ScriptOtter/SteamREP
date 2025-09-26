import { cn } from "@/lib/utils";
import { ItemMatchProps } from "./ItemMatch";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { background_maps } from "@/styles/bg_maps";

export const MobileItemMatch = ({ ...props }) => {
  const [mouseHover, setMouseHover] = useState<boolean>(false);
  const ref = useRef(null);
  const {
    map,
    date,
    score,
    rank,
    kills,
    deaths,
    assists,
    matchURL,
  }: //matchURL,
  ItemMatchProps = props.match;
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMouseHover(true);
          observer.disconnect(); // Отключаем наблюдателя после появления
        }
      },
      { threshold: 0.1 } // Настройка порога видимости
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const matchResult: number =
    (score.split(":")[0] == "13" && 1) ||
    (score.split(":")[1] == "13" && -1) ||
    0;
  const navigate = useNavigate();
  console.log(map);

  return (
    <div
      ref={ref}
      onClick={() => navigate(`/match/${matchURL}`)}
      onMouseEnter={() => setMouseHover(true)}
      onMouseLeave={() => setMouseHover(false)}
      className={cn(
        background_maps[map],
        `mx-8 h-[130px] sm:mx-0 sm:w-full sm:h-[160px] md:h-[225px] rounded-xl bg-cover bg-center cursor-pointer`
      )}
    >
      <div
        className={cn(
          matchResult == 1 && "bg-green-400/60",
          matchResult == 0 && "bg-gray-600/60",
          matchResult == -1 && "bg-red-600/60",
          "w-full h-full rounded-xl"
        )}
      >
        <div className="relative">
          <div className="flex items-center space-x-1 absolute top-1 left-1">
            <img
              className={cn(
                mouseHover ? "opacity-100" : "opacity-80",
                "size-8 md:size-10 duration-300"
              )}
              src={`/map_icons/map_icon_${map}.svg`}
            />

            <p
              className={cn(
                mouseHover ? "opacity-100" : "opacity-0",
                "text-xs md:text-md duration-300"
              )}
            >
              {map}
            </p>
          </div>
          <div className="absolute top-1.5 right-1">
            <p className="col-span-4 col-start-6 text-xs xl:text-[14px]">
              {date}
            </p>
          </div>
          <div
            className={cn(
              mouseHover ? "opacity-100" : "opacity-60",
              "absolute top-6 right-1"
            )}
          >
            {" "}
            <img
              className="w-10 xl:w-16"
              src={`/ranks/skillgroup${rank}.svg`}
            />
          </div>
          <div
            className={cn(
              mouseHover
                ? "opacity-100 -translate-y-3 sm:-translate-y-2"
                : "opacity-60",
              "absolute text-center w-full top-7 sm:top-8 md:top-16 duration-300"
            )}
          >
            <p className="font-mono text-7xl sm:text-8xl">{score}</p>
          </div>
          <div
            className={cn(
              mouseHover
                ? "opacity-100 -translate-y-2 sm:-translate-y-2"
                : "opacity-0",

              "text-center text-2xl sm:text-3xl absolute w-full top-22 sm:top-28.5 md:top-38 duration-800"
            )}
          >
            <p>{`${kills} | ${deaths} | ${assists}`}</p>
          </div>
          <div
            className={cn(
              mouseHover ? "opacity-100 -translate-y-2" : "opacity-0",
              "absolute top-30 sm:top-37.5 md:top-53.5 w-full text-center duration-300"
            )}
          >
            <p className="text-xs hover:underline hover:underline-offset-2">
              Open Match
            </p>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};
