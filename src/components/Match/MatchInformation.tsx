import { Container } from "../container";

export const MatchInformation = () => {
  const typeMatch = "Official Matchmaking";
  const map = "de_dust2";
  const server = "eu_server";
  const avgRank = 7;
  const date = "17th Sep 2025 08:09:20";
  return (
    <div className="flex justify-evenly">
      <Container className="max-w-[1280px]">
        <div className="w-full flex justify-between text-light-gray-3">
          <div className="flex space-x-6 text-xs items-center">
            <p>{typeMatch}</p>
            <div className="flex items-center space-x-1">
              <img className="size-5" src={`/map_icons/map_icon_${map}.svg`} />
              <p>{map}</p>
            </div>
            <p>{server}</p>
            <div className="flex items-center space-x-1">
              <p>Avg Rank</p>
              <img className="size-8" src={`/ranks/skillgroup${avgRank}.svg`} />
            </div>
          </div>
          <div className="flex space-x-6 text-xs items-center">
            <p>{date}</p>
            <button className="px-2 py-0.5 rounded-xl outline-1 outline-light-gray-1 cursor-pointer hover:outline-light-gray-2">
              Watch demo
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};
