import { FaCrosshairs } from "react-icons/fa";

export const PlayerStatsItem = () => {
  return (
    <div className="grid grid-cols-15 mt-4">
      <div className="col-start-1 col-end-3">
        <div className="flex items-center space-x-2">
          <img
            className="w-7 h-7 rounded-full"
            src="/public/assets/CommentFeature.png"
          />
          <p>Player</p>
        </div>
      </div>
      <div className="col-start-3 col-end-4">
        <img className="size-10 -mt-2" src="/public/ranks/skillgroup1.svg" />
      </div>
      <div className="col-start-4 col-end-5">
        <div className="flex justify-center mt-1 items-center">
          <FaCrosshairs size={17} />
        </div>
      </div>
      <div className="col-start-6 col-end-7">
        <p>30</p>
      </div>
      <div className="col-start-7 col-end-8">
        <p>20</p>
      </div>
      <div className="col-start-8 col-end-9">
        <p>10</p>
      </div>
      <div className="col-start-9 col-end-10">
        <p>10</p>
      </div>
      <div className="col-start-10 col-end-11 ml-1">
        <p>8</p>
      </div>
      <div className="col-start-11 col-end-12 ml-1">
        <p>1.9</p>
      </div>
      <div className="col-start-12 col-end-13 ml-1">
        <p>188</p>
      </div>
      <div className="col-start-13 col-end-14 ml-1">
        <p>50</p>
      </div>
    </div>
  );
};
