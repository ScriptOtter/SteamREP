import { Header } from "../views/Header";
import { MostReportedPlayersList } from "../data/data";
import { MostReportedPlayers } from "../component/MostReportedPlayers";
import { useState } from "react";
export const MostReportedPlayersPage = () => {
  const [mostReportedPlayers, setMostReportedPlayers] = useState(
    MostReportedPlayersList
  );
  let currentId: number = 1;
  const generateId = (): number => {
    return currentId++;
  };

  return (
    <>
      <Header />

      <div className="bg-blue-950 h-screen w-screen pt-4">
        <div className="bg-amber-500">
          <p className="font-bold text-3xl text-center">
            MOST REPORTED PLAYERS
          </p>
        </div>
        <div className="min-w-min: w-full bg-gray-600 rounded-t-3xl rounded-b-3xl">
          <div className="flex justify-evenly">
            <p className="basis-[12%]">#</p>
            <p className="basis-[30%]">Player</p>
            <p className="basis-[12%]">Number of Complains</p>
            <p className="basis-[12%]">Last Report</p>
          </div>

          {mostReportedPlayers.map((player) => (
            <MostReportedPlayers
              id={generateId()}
              nickname={player.nickname}
              numberofcomplains={player.numberofcomplains}
              lastReport={player.lastReport}
            />
          ))}
        </div>
      </div>
    </>
  );
};
