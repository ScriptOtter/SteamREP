import { Link } from "react-router-dom";

interface MostReportedPlayersProps {
  id: number;
  nickname: string;
  numberofcomplains: number;
  lastReport: string | "";
}

export const MostReportedPlayers = ({
  id,
  nickname,
  numberofcomplains,
  lastReport,
}: MostReportedPlayersProps) => {
  if (id % 2 == 0) {
    return (
      <div className="bg-red-300 rounded-2xl p-1 mb-1">
        <div className="flex justify-evenly items-center">
          <p className="basis-[12%]">{id}</p>
          <div className="basis-[30%]">
            <Link to={"/profiles/" + nickname}>
              <div className="flex items-center space-x-2">
                <img
                  src={""}
                  className="inline-block h-12 w-12 rounded-full ring-1"
                />
                <p className="">{nickname}</p>
              </div>
            </Link>
          </div>

          <p className="basis-[12%]">{numberofcomplains}</p>
          <p className="basis-[12%]">{lastReport}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="bg-blue-300 rounded-2xl p-1 mb-1">
        <div className="flex justify-evenly items-center ">
          <p className="basis-[12%]">{id}</p>
          <div className="flex basis-[30%] items-center space-x-2">
            <img
              src={""}
              className="inline-block h-12 w-12 rounded-full ring-1"
            />
            <p className="">{nickname}</p>
          </div>
          <p className="basis-[12%]">{numberofcomplains}</p>
          <p className="basis-[12%]">{lastReport}</p>
        </div>
      </div>
    );
  }
};
