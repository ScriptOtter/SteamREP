import { cn } from "@/lib/utils";
import { GalleryThumbnails, Star, TableOfContents } from "lucide-react";
import { useEffect, useState } from "react";

export const CS2HeaderTable = ({ ...props }) => {
  const { currentView, setCurrentView } = props;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    if (windowWidth <= 1280) {
      setCurrentView("blocks");
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);
  useEffect(() => {
    if (windowWidth <= 1280) {
      setCurrentView("blocks");
    }
  }, [windowWidth]);
  return (
    <div className="relative">
      <div
        className={cn(
          currentView == "raws"
            ? "hidden xl:grid grid-cols-31 gap-4 mx-4 mr-5 mb-5 items-center text-xl"
            : "hidden"
        )}
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
      <div className="flex">
        <div
          className={cn(
            currentView == "blocks"
              ? "flex my-2 justify-center w-full items-center text-2xl"
              : "hidden"
          )}
        >
          <p>Match History</p>
        </div>
      </div>
      {windowWidth >= 1280 && (
        <div className="justify-end absolute right-1 -top-10 rounded-md outline-1 outline-light-gray-2 px-2 py-0.5">
          <div className="flex items-center justify-evenly space-x-2">
            <TableOfContents
              onClick={() => setCurrentView("raws")}
              size={26}
              className={cn(
                currentView == "raws" ? "text-light-blue-2" : "text-white",
                "cursor-pointer hover:text-light-blue-3"
              )}
            />
            <GalleryThumbnails
              onClick={() => setCurrentView("blocks")}
              size={24}
              className={cn(
                currentView == "blocks" ? "text-light-blue-2" : "text-white",
                "cursor-pointer hover:text-light-blue-3"
              )}
            />
          </div>
        </div>
      )}
    </div>
  );
};
