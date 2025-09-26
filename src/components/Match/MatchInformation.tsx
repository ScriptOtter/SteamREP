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
        <div className="w-full flex-col md:flex-row flex md:justify-between text-light-gray-3">
          <div className="flex-col md:flex-row flex space-x-6 text-xs items-center">
            <p className="text-2xl md:text-xs text-white md:text-light-gray-3">
              {typeMatch}
            </p>

            <div className="flex items-center space-x-1">
              <img className="size-5" src={`/map_icons/map_icon_${map}.svg`} />
              <p className="text-xl md:text-xs">{map}</p>
            </div>
            <p className="text-xl md:text-xs">{server}</p>
            <div className="flex items-center space-x-1">
              <p className="text-xl md:text-xs">Avg Rank</p>
              <img className="size-8" src={`/ranks/skillgroup${avgRank}.svg`} />
            </div>
          </div>
          <div className="flex-row flex justify-center space-x-2 md:space-x-6 text-xs items-center ">
            <p className="text-md md:text-xs">{date}</p>
            <button className="text-xs px-2 py-0.5 rounded-xl outline-1 outline-light-gray-1 cursor-pointer hover:outline-light-gray-2">
              Watch demo
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};
