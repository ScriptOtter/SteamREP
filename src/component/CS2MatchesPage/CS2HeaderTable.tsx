import { Star } from "lucide-react";

export const CS2HeaderTable = () => {
  return (
    <>
      <div
        className={
          "hidden xl:grid grid-cols-31 gap-4 mx-4 mr-5 mb-5 items-center text-xl"
        }
      >
        <p className="col-span-3 col-start-1 ml-4">Map</p>
        <p className="col-span-4 col-start-6">Date</p>
        <p className="col-span-3 col-start-11">Score</p>
        <p className="col-span-3 col-start-14 ml-1">Rank</p>
        <p className="col-span-1 col-start-17 ">K</p>
        <p className="col-span-1 col-start-18 ">D</p>
        <p className="col-span-1 col-start-19 ">A</p>
        <Star size={20} className="text-yellow-300 col-span-2 col-start-21" />
        <p className="col-span-2 col-start-23">HS</p>
        <p className="col-span-2 col-start-25">DMG</p>
        <p className="col-start-27">5k</p>
        <p className="col-start-28">4k</p>
        <p className="col-start-29">3k</p>
      </div>
      <div
        className={
          "flex xl:hidden mb-4 justify-center w-full items-center text-2xl"
        }
      >
        <p>Match History</p>
      </div>
    </>
  );
};
