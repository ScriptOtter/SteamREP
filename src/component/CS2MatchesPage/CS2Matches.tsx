import { CS2HeaderTable } from "./CS2HeaderTable";
import { ItemMatch } from "./ItemMatch";

export const CS2Matches = () => {
  const matches = [
    {
      map: "de_dust2",
      date: "Dec 8 2013",
      score: "13:1",
      rank: 10,
      kills: 10,
      deaths: 2,
      assists: 2,
      HS: 1,
      damage: 1232,
      kills5: 2,
      kills4: 0,
      kills3: 0,
      matchURL: "asdsa",
    },
    {
      map: "de_mirage",
      date: "Wed 27th Aug 25",
      score: "1:13",
      rank: 10,
      kills: 10,
      deaths: 2,
      assists: 2,
      HS: 1,
      damage: 1232,
      kills5: 2,
      kills4: 1,
      kills3: 2,
      matchURL: "asdsa",
    },
    {
      map: "de_vertigo",
      date: "Wed 28th Aug 25",
      score: "13:10",
      rank: 12,
      kills: 11,
      deaths: 2,
      assists: 2,
      HS: 1,
      damage: 2443,
      kills5: 2,
      kills4: 1,
      kills3: 0,
      matchURL: "asdsa",
    },
    {
      map: "de_nuke",
      date: "Wed 27th Aug 25",
      score: "12:12",
      rank: 9,
      kills: 10,
      deaths: 2,
      assists: 2,
      HS: 1,
      damage: 1232,
      kills5: 2,
      kills4: 1,
      kills3: 2,
      matchURL: "asdsa",
    },
    {
      map: "de_dust2",
      date: "Wed 28th Aug 25",
      score: "13:10",
      rank: 10,
      kills: 10,
      deaths: 2,
      assists: 2,
      HS: 1,
      damage: 1232,
      kills5: 2,
      kills4: 0,
      kills3: 0,
      matchURL: "asdsa",
    },
    {
      map: "de_mirage",
      date: "Wed 27th Aug 25",
      score: "10:13",
      rank: 14,
      kills: 15,
      deaths: 2,
      assists: 2,
      HS: 1,
      damage: 1232,
      kills5: 2,
      kills4: 1,
      kills3: 2,
      matchURL: "asdsa",
    },
    {
      map: "de_vertigo",
      date: "Wed 28th Aug 25",
      score: "12:12",
      rank: 12,
      kills: 11,
      deaths: 2,
      assists: 2,
      HS: 1,
      damage: 2443,
      kills5: 2,
      kills4: 1,
      kills3: 0,
      matchURL: "asdsa",
    },
    {
      map: "de_train",
      date: "Wed 27th Aug 25",
      score: "12:12",
      rank: 9,
      kills: 10,
      deaths: 2,
      assists: 2,
      HS: 1,
      damage: 1232,
      kills5: 2,
      kills4: 1,
      kills3: 2,
      matchURL: "asdsa",
    },
  ];
  return (
    <>
      <div className="h-full text-white">
        <CS2HeaderTable />
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 mx-4 sm:mx-4 gap-6 xl:mb-0.5 items-center  xl:grid-cols-29 xl:gap-1 text-xs xl:text-xl">
          {matches.map((match, key) => (
            <ItemMatch match={match} key={key} />
          ))}
        </div>
      </div>
    </>
  );
};
