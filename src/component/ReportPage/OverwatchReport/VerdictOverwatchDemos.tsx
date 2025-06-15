import { Flag } from "lucide-react";
import { SelectOptions } from "../../selecteOptions";
import { YourubeVideo } from "../../youtube-video";
import { useState } from "react";
import { Avatar } from "../../Avatar";
import { IDemos } from "@/models/IDemos";
import { Time } from "@/data/time";
import { createApi } from "@/services/axios";
import { useDispatch } from "react-redux";
import { API_ENDPOINTS } from "@/services/apiService";
import { toast } from "react-toastify";

export const VerdictOverwatchDemos = ({
  id,
  youtubeLink,
  demoLink,
  comment,
  createdAt,
  author,
  recipient,
  updateDemos,
}: IDemos) => {
  const [verdictComment, setVerdictComment] = useState<string>("");
  const [visibleComment, setVisibleComment] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const handleSelectedOptionsChange = (options: string[]) => {
    setSelectedOptions(options);
  };
  const dispatch = useDispatch();
  const api = createApi(dispatch);
  const postVerdict = async () => {
    const data = { verdict: selectedOptions, comment: verdictComment };
    try {
      const res = await api.post(API_ENDPOINTS.postVerdict + id, data, {
        withCredentials: true,
      });
      console.log(res);
      if (!res) {
        console.log(res);
        return;
      }
      updateDemos!();
      toast.success("Your verdict was Posted!");
    } catch (e) {
      console.log(e);
    }
  };
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
              className="text-s cursor-pointer hover:text-orange-400 duration-600"
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

          <SelectOptions onChange={handleSelectedOptionsChange} />
          {!visibleComment && (
            <button
              onClick={() => setVisibleComment(true)}
              className="text-white cursor-pointer"
            >
              Add Comment
            </button>
          )}
          {visibleComment && (
            <div className="mb-1">
              <p className="text-white">Comment:</p>
              <textarea
                className="text-white break-all w-full border-orange-500 border-1 rounded-s bg-gray-700 px-2 text-xs h-50 mt-2 p-2"
                value={verdictComment}
                onChange={(e) => setVerdictComment(e.target.value)}
              ></textarea>{" "}
            </div>
          )}

          <div className="flex items-center justify-end space-x-4 mt-2">
            <button
              onClick={postVerdict}
              className="bg-orange-500 rounded-xl cursor-pointer px-4 py-1 text-white"
            >
              Confirm
            </button>
            <button className="cursor-pointer">
              <Flag className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
