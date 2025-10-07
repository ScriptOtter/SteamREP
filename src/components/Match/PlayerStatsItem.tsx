import { cn } from "@/lib/utils";
import { Lightbulb } from "lucide-react";
import { useState } from "react";
import { FaCrosshairs } from "react-icons/fa";

export const PlayerStatsItem = ({ ...props }) => {
  const {
    suspense,
    image,
    nickname,
    rank,
    kills,
    death,
    assists,
    mvp,
    //damage,
    hs,
    adr,
  } = props.player;
  const differenceKD = kills - death;
  const [lightbulbDesc, setLightbulbDesc] = useState<boolean>(false);
  return (
    <div className="grid grid-cols-15 mt-4">
      <div className="col-start-1 col-end-4">
        <div className="flex items-center space-x-2">
          {suspense && (
            <div className="relative">
              <Lightbulb
                size={20}
                className="cursor-pointer text-red-600"
                onMouseEnter={() => setLightbulbDesc(true)}
                onMouseLeave={() => setLightbulbDesc(false)}
              />
              {lightbulbDesc && (
                <div className="absolute top-0 right-6 text-xs bg-gray outline-1 outline-light-gray-2 p-1 rounded-md">
                  Suspicious
                </div>
              )}
            </div>
          )}
          {image && (
            <img
              className={cn(!suspense && "ml-7", "w-7 h-7 rounded-full")}
              src={image}
            />
          )}
          <p>{nickname}</p>
        </div>
      </div>
      <div className="col-start-5 col-end-6">
        <img className="size-10 -mt-2" src={`/ranks/skillgroup${rank}.svg`} />
      </div>
      <div className="col-start-6 col-end-7">
        <div className="flex justify-center mt-1 items-center">
          <FaCrosshairs size={17} />
        </div>
      </div>
      <div className="col-start-7 col-end-8">
        <p>{kills}</p>
      </div>
      <div className="col-start-8 col-end-9">
        <p>{death}</p>
      </div>
      <div className="col-start-9 col-end-10">
        <p>{assists}</p>
      </div>
      <div className="col-start-10 col-end-11 ml-1">
        <p
          className={cn(
            differenceKD > 0 && "text-green-400",
            differenceKD < 0 && "text-red-400"
          )}
        >
          {differenceKD}
        </p>
      </div>
      <div className="col-start-11 col-end-12 ml-1">
        <p>{mvp}</p>
      </div>
      <div className="col-start-12 col-end-13 ml-0.5">
        <p>{(kills / death).toFixed(2)}</p>
      </div>
      <div className="col-start-13 col-end-14 ml-2">
        <p>{adr}</p>
      </div>
      <div className="col-start-14 col-end-15 ml-2">
        <p>{hs}</p>
      </div>
    </div>
  );
};
