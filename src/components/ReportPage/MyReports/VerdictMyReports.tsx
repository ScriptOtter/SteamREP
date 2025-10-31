import { YourubeVideo } from "../../youtube-video";
import { IReport } from "@/models/IDemos";

interface IProps {
  report: IReport;
}
export const VerdictMyReports = ({ report }: IProps) => {
  return (
    <div className="grid grid-cols-[1fr_0.2fr_1fr] bg-gray border-1 border-light-gray-3 duration-150 my-1 px-6 pt-6 overflow-y-auto">
      <div>
        <YourubeVideo
          width={640}
          height={360}
          youtubeLink={report.youtubeLink}
          className={
            "flex justify-center border-1 border-light-gray-2 rounded-xl mb-4"
          }
        />
        <div className="text-light-blue-3 mb-3 ml-2">
          <a
            href={report.demoLink}
            className="text-s cursor-pointer hover:text-orange-400 duration-300"
          >
            Watch Demo
          </a>
        </div>
      </div>

      <div className="border-l-1 border-light-gray-3 mx-auto mb-[25%]"></div>

      <div>
        <div className="flex items-center justify-center py-1 text-white outline-1 outline-light-gray-2 rounded-xl mb-4">
          <div className="flex text-2xl">
            <p className="text-xl pr-2">Suspect </p>
            <div
              className="flex cursor-pointer group"
              onClick={() => window.open(`/profile/${report.recipient.id}`)}
            >
              <img
                className="rounded-full h-8 w-8 mr-1 mb-1"
                src={report.recipient.avatar}
              />
              <p className="group-hover:text-light-blue-2 group-hover:underline">
                {report.recipient.personaName}
              </p>
            </div>
          </div>
        </div>
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
      </div>
    </div>
  );
};
