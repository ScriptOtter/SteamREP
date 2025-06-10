import { Flag } from "lucide-react";
import { YourubeVideo } from "../../youtube-video";
import { Avatar } from "../../Avatar";
import { IDemos } from "@/models/IDemos";
import { Time } from "@/data/time";
import { Input } from "../../Input";

export const VerdictReviewedDemos = ({
  youtubeLink,
  demoLink,
  comment,
  createdAt,
  author,
  recipient,
  verdicts,
}: IDemos) => {
  return (
    <div className="flex flex-col md:flex-row bg-[#282a2e] rounded-2xl mx-4 my-2">
      <div className="flex-1 p-4">
        <div className="flex items-center text-xl text-white mb-2">
          <p className="mr-2">Report owner:</p>
          <Avatar src={author.steamUser.avatar || ""} />
          <a
            href={
              import.meta.env.VITE_FRONTEND_URL +
              "profile/" +
              author.steamUser.id
            }
            className="text-s hover:text-orange-300 duration-300"
          >
            {author.steamUser.personaName}
          </a>
        </div>
        <div className="mb-2">
          <YourubeVideo youtubeLink={youtubeLink} />
        </div>
        <div className="text-white text-xl">
          <div className="flex space-x-1">
            <p>Demo Link: </p>{" "}
            <a
              href={demoLink}
              className="text-s cursor-pointer hover:text-orange-400 duration-300"
            >
              {demoLink}
            </a>
          </div>
          {comment && <p>Comment by Report Owner:</p>}
          <div className="bg-gray-700 rounded-xl outline-orange-500 outline-1 px-2 mt-2 mb-2">
            <p className="text-s">{comment}</p>
          </div>
          <div className="text-right text-[16px]">
            Report Created At: {Time(createdAt)}
          </div>
        </div>
      </div>

      <div className="w-[2px] my-4 bg-[#1b1c1f] hidden md:block"></div>

      <div className="flex-1">
        <div className="p-4">
          <div className="flex items-center text-xl text-white mb-2">
            <p className="mr-2">Suspect:</p>
            <Avatar src={recipient.avatar || ""} />
            <a
              href={
                import.meta.env.VITE_FRONTEND_URL + "profile/" + recipient.id
              }
              className="text-s hover:text-orange-300 duration-300"
            >
              {recipient.personaName}
            </a>
          </div>
          <div className="flex justify-between mb-3">
            <label className="text-white text-[14px]">Your verdict:</label>
          </div>
          <Input
            variant="forAuth"
            type="text"
            readOnly
            value={verdicts![0].verdicts.join(", ")}
            placeholder="Choose..."
            className="block w-full p-1 border border-gray-300 rounded-md cursor-pointer hover:outline-1 hover:outline-white mb-3"
          />

          {verdicts![0].comment && (
            <div className="mb-1">
              <p className="text-white">Your Comment:</p>
              <textarea
                className="text-white break-all w-full border-orange-500 border-1 rounded-s bg-gray-700 px-2 text-xs h-50 mt-2 p-2"
                value={verdicts![0].comment}
                readOnly
              ></textarea>{" "}
            </div>
          )}

          <div className="flex items-center justify-end mt-2">
            <button className="cursor-pointer">
              <Flag className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
