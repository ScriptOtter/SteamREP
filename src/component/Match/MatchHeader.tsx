import { Lightbulb, Star } from "lucide-react";
import { useState } from "react";

export const MatchHeader = () => {
  const [lightbulbDesc, setLightbulbDesc] = useState<boolean>(false);
  return (
    <>
      <div className="grid grid-cols-15">
        <p className="col-start-3">Rank</p>
        <p>Crosshair</p>
        <p className="col-start-6">K</p>
        <p className="col-start-7">D</p>
        <p className="col-start-8">A</p>
        <p className="col-start-9">+/-</p>
        <div className="flex items-center">
          <Star size={17} className="text-yellow-500" />
        </div>
        <p>K/D</p>
        <p>ADR</p>
        <p>HS%</p>
        <div className="relative mt-0.5">
          <Lightbulb
            size={18}
            className="cursor-pointer"
            onMouseEnter={() => setLightbulbDesc(true)}
            onMouseLeave={() => setLightbulbDesc(false)}
          />
          {lightbulbDesc && (
            <div className="absolute -top-4 right-0 text-xs">Suspicious</div>
          )}
        </div>
      </div>
    </>
  );
};
