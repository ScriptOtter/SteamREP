import { TrackingUser } from "./TrackingUser";

export const TrackingBlock = () => {
  const Users = [
    {
      imageUrl:
        "https://avatars.akamai.steamstatic.com/629afd3cbe533f238c6ddfed1300dc342544062f_full.jpg",
      name: "BAnananannaanannaananna",
      steamid: "76561198117401376",
      dateBanned: "13-13-13",
    },
    {
      imageUrl:
        "https://avatars.akamai.steamstatic.com/629afd3cbe533f238c6ddfed1300dc342544062f_full.jpg",
      name: "Ban",
      steamid: "76561198117401376",
      dateBanned: "13-13-13",
    },
    {
      imageUrl:
        "https://avatars.akamai.steamstatic.com/629afd3cbe533f238c6ddfed1300dc342544062f_full.jpg",
      name: "banan",
      steamid: "76561198117401376",
    },
    {
      imageUrl:
        "https://avatars.akamai.steamstatic.com/629afd3cbe533f238c6ddfed1300dc342544062f_full.jpg",
      name: "gavno",
      steamid: "76561198117401376",
    },
    {
      imageUrl:
        "https://avatars.akamai.steamstatic.com/629afd3cbe533f238c6ddfed1300dc342544062f_full.jpg",
      name: "BAnananannaanannaananna",
      dateBanned: "13-13-13",
      steamid: "76561198117401376",
    },
    {
      imageUrl:
        "https://avatars.akamai.steamstatic.com/629afd3cbe533f238c6ddfed1300dc342544062f_full.jpg",
      name: "BAnananannaanannaananna",
      steamid: "76561198117401376",
      dateBanned: "13-13-13",
    },
    {
      imageUrl:
        "https://avatars.akamai.steamstatic.com/629afd3cbe533f238c6ddfed1300dc342544062f_full.jpg",
      name: "Ban",
      steamid: "76561198117401376",
      dateBanned: "13-13-13",
    },
    {
      imageUrl:
        "https://avatars.akamai.steamstatic.com/629afd3cbe533f238c6ddfed1300dc342544062f_full.jpg",
      name: "banan",
      steamid: "76561198117401376",
    },
    {
      imageUrl:
        "https://avatars.akamai.steamstatic.com/629afd3cbe533f238c6ddfed1300dc342544062f_full.jpg",
      name: "gavno",
      steamid: "76561198117401376",
    },
    {
      imageUrl:
        "https://avatars.akamai.steamstatic.com/629afd3cbe533f238c6ddfed1300dc342544062f_full.jpg",
      name: "BAnananannaanannaananna",
      dateBanned: "13-13-13",
      steamid: "76561198117401376",
    },
  ];

  return (
    <>
      <div
        className={
          "absolute bg-secondary px-2 py-2 rounded-xl outline-1 text-white z-999 w-[250px] h-[350px] top-10 -right-4 overflow-y-auto custom-scroll"
        }
      >
        <p className="mb-3 text-xl">Tracking Users:</p>
        <div className="space-y-1">
          {Users.map((user) => (
            <TrackingUser key={user.steamid} user={user} />
          ))}
        </div>
      </div>
    </>
  );
};
