import { Container } from "../container";
import { IMatches } from "../CS2MatchesPage/CS2Matches";

interface IMatchInfo {
  match: IMatches;
}

export const MatchInformation = ({ match }: IMatchInfo) => {
  const { avg_rank, demoUrl, id, map, region, date, type } = match;

  return (
    <div className="flex justify-evenly">
      <Container className="max-w-[1280px]">
        <div className="w-full flex-col md:flex-row flex md:justify-between text-light-gray-3">
          <div className="flex-col md:flex-row flex space-x-6 text-xs items-center">
            <p className="text-2xl md:text-xs text-white md:text-light-gray-3">
              {type}
            </p>

            <div className="flex items-center space-x-1">
              <img className="size-5" src={`/map_icons/map_icon_${map}.svg`} />
              <p className="text-xl md:text-xs">{map}</p>
            </div>
            <p className="text-xl md:text-xs">{region}</p>
            <div className="flex items-center space-x-1">
              <p className="text-xl md:text-xs">Avg Rank</p>
              <img
                className="size-8"
                src={`/ranks/skillgroup${avg_rank}.svg`}
              />
            </div>
          </div>
          <div className="flex-row flex justify-center space-x-2 md:space-x-6 text-xs items-center ">
            <p className="text-md md:text-xs">{date}</p>
            <button
              onClick={() => (window.location.href = demoUrl)}
              className="text-xs px-2 py-0.5 rounded-xl outline-1 outline-light-gray-1 cursor-pointer hover:outline-light-gray-2"
            >
              Watch demo
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};
