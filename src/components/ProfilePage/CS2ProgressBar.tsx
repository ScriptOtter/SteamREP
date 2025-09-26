import { privateRanks } from "@/lib/privateRanks";

export const CS2ProgressBar = ({ ...props }) => {
  const { currentLevel, currentXp } = props;
  const progress = ((currentXp * 100) / 5000).toFixed(0);

  return (
    <>
      <div className="text-white text-[14px] my-1">
        Rank: {privateRanks[currentLevel]}
      </div>
      <div className="bg-primary rounded-[4px] h-3 w-full mb-8">
        <div
          className="progress-bar rounded-[4px] h-full mb-1"
          style={{
            width: `${progress}%`,
            background: `linear-gradient(to right, #0B5C86, #7dd1ff)`,
          }}
        ></div>
        <div className="w-full flex justify-between">
          <div>
            <p className="text-white text-[12px]">
              Experience left: {5000 - currentXp}
            </p>
            {/* <img
              className="size-5"
              src={`/private_ranks/Csgo-rank-level${
                currentLevel != 40 && currentLevel
              }.webp`}
            /> */}
          </div>
          <div>
            <img
              className="size-5"
              src={`/private_ranks/Csgo-rank-level${
                currentLevel != 40 ? currentLevel + 1 : currentLevel
              }.webp`}
            />
          </div>
        </div>
      </div>
    </>
  );
};
