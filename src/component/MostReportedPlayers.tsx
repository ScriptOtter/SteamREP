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
  return (
    <div className="flex justify-evenly">
      <p className="basis-[12%]">{id}</p>
      <p className="basis-[30%]">{nickname}</p>
      <p className="basis-[12%]">{numberofcomplains}</p>
      <p className="basis-[12%]">{lastReport}</p>
    </div>
  );
};
