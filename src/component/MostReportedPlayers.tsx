import { generate } from "random-words";

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
  const API_AVATAR = "https://ui-avatars.com/api/?background=random&name=";
  let words = generate(2);
  const API_AVATAR_URL = API_AVATAR + words[0] + "+" + words[1];

  if (id % 2 == 0) {
    return (
      <div className="bg-red-300 rounded-2xl mb-2">
        <div className="flex justify-evenly">
          <p className="basis-[12%]">{id}</p>
          <div className="flex basis-[30%] items-center">
            <img
              className="
mask-radial-at-center"
              src={API_AVATAR_URL}
            />
            <p className="">{nickname}</p>
          </div>

          <p className="basis-[12%]">{numberofcomplains}</p>
          <p className="basis-[12%]">{lastReport}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="bg-blue-300 rounded-2xl mb-2">
        {/* <div className="flex justify-evenly">
          <p className="basis-[12%]">{id}</p>
          <img src={API_AVATAR_URL} />
          <p className="basis-[30%]">{nickname}</p>
          <p className="basis-[12%]">{numberofcomplains}</p>
          <p className="basis-[12%]">{lastReport}</p>
        </div> */}
      </div>
    );
  }
};
