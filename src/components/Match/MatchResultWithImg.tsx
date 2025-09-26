import { cn } from "@/lib/utils";
import { IMatchPlayer } from "@/models/IMatchPlayer";
import { background_maps } from "@/styles/bg_maps";
import { Container } from "../container";

export const MatchResultWithImg = ({
  //teamName,
  team1,
  team2,
}: {
  teamName: string;
  team1: IMatchPlayer[];
  team2: IMatchPlayer[];
}) => {
  const map = "de_nuke";
  let team1score = 13;
  let team2score = 10;
  return (
    <>
      <div
        className={cn(
          background_maps[map],
          `w-full sm:h-[120px] md:h-[180px] xl:h-[225px] bg-cover bg-center relative`
        )}
      >
        <div className="w-full h-full bg-gray/70">
          <div className="absolute w-full mt-13">
            <div className="xl:flex hidden justify-center">
              <Container className="max-w-[1280px]">
                <div className="flex justify-between mx-12">
                  <div className="flex space-x-8">
                    {team1.map((teammate) => (
                      <div>
                        <img
                          className="size-12 rounded-full shadow-2xl shadow-black"
                          src={teammate.image}
                        />
                        <p className="text-center text-white shadow-2xl shadow-black">
                          {teammate.nickname}
                        </p>
                        <img
                          className="size-14 -mt-3"
                          src={`/ranks/skillgroup${teammate.rank}.svg`}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center space-x-32 text-6xl font-mono pt-4">
                    <p
                      className={cn(
                        team1score == 13 &&
                          "text-7xl text-green-win-match bg-gray/50 rounded-xl",
                        team1score != 13 &&
                          team1score < 10 &&
                          "text-red-lose-match/80 bg-gray/50 px-4 rounded-xl",
                        team1score != 13 &&
                          team1score >= 10 &&
                          "text-red-lose-match/80 bg-gray/50 px-0.5 rounded-xl"
                      )}
                    >
                      {team1score}
                    </p>

                    <p
                      className={cn(
                        team2score == 13 &&
                          "text-7xl text-green-win-match bg-gray/50 rounded-xl",
                        team2score != 13 &&
                          team2score < 10 &&
                          "text-red-lose-match/80 bg-gray/50 px-4 rounded-xl",
                        team2score != 13 &&
                          team2score >= 10 &&
                          "text-red-lose-match/80 bg-gray/50 px-0.5 rounded-xl"
                      )}
                    >
                      {team2score}
                    </p>
                  </div>

                  <div className="flex space-x-8">
                    {team2.map((teammate) => (
                      <div>
                        <img
                          className="size-12 rounded-full shadow-2xl shadow-black"
                          src={teammate.image}
                        />
                        <p className="text-center text-white shadow-2xl shadow-black">
                          {teammate.nickname}
                        </p>
                        <img
                          className="size-14 -mt-3"
                          src={`/ranks/skillgroup${teammate.rank}.svg`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </Container>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
