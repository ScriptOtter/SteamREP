import { Flag } from "lucide-react";
import { SelectOptions } from "../../selecteOptions";
import { YourubeVideo } from "../../youtube-video";
import { useState } from "react";
import { Avatar } from "../../../components/Avatar";
import { Time } from "@/data/time";
import { createApi } from "@/services/axios";
import { useDispatch } from "react-redux";
import { API_ENDPOINTS } from "@/services/apiService";
import { IReport } from "@/models/IDemos";
import { ToastSuccess } from "@/components/Toasts/ToastSuccess";
import { useNavigate } from "react-router-dom";

interface IProps {
  report: IReport;
  updateReports: () => void;
}

export const VerdictOverwatchDemos = ({ report, updateReports }: IProps) => {
  const [verdictComment, setVerdictComment] = useState<string>("");
  const [visibleComment, setVisibleComment] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const handleSelectedOptionsChange = (options: string[]) => {
    setSelectedOptions(options);
  };
  const dispatch = useDispatch();
  const api = createApi(dispatch);
  const navigate = useNavigate();
  const postVerdict = async () => {
    const data = { verdict: selectedOptions, comment: verdictComment };
    try {
      const res = await api.post(API_ENDPOINTS.postVerdict + report.id, data, {
        withCredentials: true,
      });

      if (!res) {
        return;
      }
      updateReports();
      ToastSuccess("Your verdict was Posted!");
    } catch (e) {}
  };
  return (
    <div className="grid grid-cols-[1fr_0.2fr_1fr] bg-gray border-1 border-light-gray duration-150 cursor-pointer my-1 px-6 pt-6">
      <div>
        <div className="flex items-center justify-center space-x-2 text-white outline-1 outline-light-gray-2 rounded-xl mb-4">
          <p className="text-xl">Report owner:</p>
          <img
            className="rounded-full w-10 outline-1 outline-light-gray"
            src={report.author.steamUser.avatar || ""}
          />
          <p
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/profile/${report.author.steamUser.id}`);
            }}
            className="hover:text-light-blue-2"
          >
            {report.author.steamUser.personaName}
          </p>
        </div>

        <div className="text-white text-xl outline-1 outline-light-gray-2 rounded-xl mb-4">
          {report.verdicts && (
            <div className="p-2">
              {report.verdicts[0].verdicts.map((item) => (
                <p className="ml-2">{item}</p>
              ))}
            </div>
          )}
        </div>
        <div className="outline-1 outline-light-gray-2 rounded-xl p-4 text-white mb-8">
          <p className="text-s">{report.comment}</p>
        </div>
        <div className="text-right text-[16px] text-white">
          Report Created At: {Time(report.createdAt)}
        </div>
      </div>

      <div></div>

      <div>
        <div className="flex items-center justify-center space-x-2 text-white outline-1 outline-light-gray-2 rounded-xl mb-4">
          <p>Suspect:</p>
          <img
            className="rounded-full w-10 outline-1 outline-light-gray"
            src={report.recipient.avatar || import.meta.env.VITE_UNKOWN_AVATAR}
          />
          <p
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/profile/${report.recipient.id}`);
            }}
            className="hover:text-light-blue-2"
          >
            {report.recipient.personaName}
          </p>
        </div>

        <YourubeVideo
          width={640}
          height={250}
          youtubeLink={report.youtubeLink}
          className={
            "flex justify-center border-1 border-light-gray-2 rounded-xl mb-4"
          }
        />

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
  );
};
