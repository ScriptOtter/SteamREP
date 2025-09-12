export const CS2HeaderTable = () => {
  return (
    <>
      <div
        className={
          "invisible xl:visible mx-2 grid grid-cols-29 gap-1.5 items-center text-xs xl:text-xl"
        }
      >
        <p className="col-span-3 col-start-1 sm:ml-4">Map</p>
        <p className="col-span-4 col-start-6 ">Date</p>
        <p className="col-span-3 col-start-11 ">Score</p>
        <p className="col-span-3 col-start-14 ">Rank</p>
        <p className="col-span-1 col-start-17 ">K</p>
        <p className="col-span-1 col-start-18 ">D</p>
        <p className="col-span-1 col-start-19 ">A</p>
        <p className="col-span-2 col-start-20">HS</p>
        <p className="col-span-2 col-start-22">DMG</p>
        <p className="md:col-span-1 md:col-start-24">5k</p>
        <p className="md:col-span-1 md:col-start-25">4k</p>
        <p className="md:col-span-1 md:col-start-26">3k</p>
      </div>
      <div
        className={
          "visible xl:invisible mb-4 justify-center w-full items-center text-2xl"
        }
      >
        <p>Match History</p>
      </div>
    </>
  );
};
