import { YourubeVideo } from "../../youtube-video";
import { IReport } from "@/models/IDemos";
import { useNavigate } from "react-router-dom";

interface IProps {
  report: IReport;
}

export const VerdictReviewedDemos = ({ report }: IProps) => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-[1fr_0.2fr_1fr] bg-gray border-1 border-light-gray-3 duration-150 my-1 px-6 pt-6 overflow-y-auto">
      <div>
        <div className="flex items-center justify-center space-x-2 text-white outline-1 outline-light-gray-2 rounded-xl mb-4">
          <p className="">Report owner:</p>
          <img
            className="rounded-full w-10 outline-1 outline-light-gray"
            src={report.author.steamUser.avatar || ""}
          />
          <p
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/profile/${report.author.steamUser.id}`);
            }}
            className="hover:text-light-blue-2 duration-150 cursor-pointer"
          >
            {report.author.steamUser.personaName}
          </p>
        </div>

        <div className="text-white text-xl outline-1 outline-light-gray-2 rounded-xl mb-4">
          {report.verdicts && (
            <div className="p-2 relative">
              <p className="absolute -top-[9px] left-4 bg-gray text-xs text-light-gray-3">
                Verdicts
              </p>
              {report.verdicts[0].verdicts.map((item) => (
                <p className="ml-2 py-1">{item}</p>
              ))}
            </div>
          )}
        </div>
        <div className="relative outline-1 outline-light-gray-2 rounded-xl p-4 text-white mb-8">
          <p className="absolute -top-[9px] left-4 bg-gray text-xs text-light-gray-3">
            Comment from {report.author.steamUser.personaName}
          </p>
          <p>{report.comment}</p>
        </div>
      </div>

      <div className="border-l-1 border-light-gray-3 mx-auto mb-[25%]"></div>

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
            className="hover:text-light-blue-2 duration-150 cursor-pointer"
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

        <div className="relative outline-1 outline-light-gray-2 rounded-xl p-4 text-white mb-8">
          <p className="absolute -top-[9px] left-4 bg-gray text-xs text-light-gray-3">
            Your verdict
          </p>
          <p>{report.verdicts![0].verdicts.join(", ")}</p>
        </div>

        {report.verdicts![0].comment && (
          <div className="relative outline-1 outline-light-gray-2 rounded-xl p-4 text-white mb-8">
            <p className="absolute -top-[9px] left-4 bg-gray text-xs text-light-gray-3">
              Your comment
            </p>
            <p>{report.verdicts![0].comment}</p>
          </div>
        )}

        <div className="flex items-center justify-end mt-2"></div>
      </div>
    </div>
  );
};
