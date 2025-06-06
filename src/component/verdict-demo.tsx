import { Flag } from "lucide-react";
import { SelectOptions } from "./selecteOptions";
import { Avatar } from "./avatar";
import { YourubeVideo } from "./youtube-video";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";

export const VerdictDemos = () => {
  const auth = useAuth();
  const [comment, setComment] = useState<string>("");
  const [visibleComment, setVisibleComment] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const handleSelectedOptionsChange = (options: string[]) => {
    setSelectedOptions(options);
  };
  console.log(selectedOptions);
  return (
    <div className="flex flex-col md:flex-row bg-[#282a2e] rounded-2xl mx-4 my-2">
      <div className="flex-1 p-4">
        <div className="flex items-center text-xl text-white mb-2">
          <p className="mr-2">Report owner:</p>
          <Avatar src={auth.avatar || ""} />
          <p className="text-s">Username</p>
        </div>
        <div className="mb-2">
          <YourubeVideo />
        </div>
        <div className="text-white text-xl">
          <div className="flex space-x-1">
            <p>Demo Link: </p> <p className="text-s">http://</p>
          </div>
          <p>Комментарий от создателя тикета:</p>
          <div className="bg-gray-700 rounded-xl outline-orange-500 outline-1 px-2 mt-2">
            <p className="text-s">
              Пидор хуесос гнида урод умри гандонище аим + вх + сын бляди +
              кто-то dasdsadsadsa
            </p>
          </div>
        </div>
      </div>

      <div className="w-[2px] my-4 bg-[#1b1c1f] hidden md:block"></div>

      <div className="flex-1">
        <div className="p-4">
          <div className="flex items-center text-xl text-white mb-2">
            <p className="mr-2">Suspect:</p>
            <Avatar src={auth.avatar || ""} />
            <p className="text-s">Username</p>
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
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>{" "}
            </div>
          )}

          <div className="flex items-center justify-end space-x-4">
            <button className="bg-orange-500 rounded-xl cursor-pointer px-4 py-1 text-white">
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
