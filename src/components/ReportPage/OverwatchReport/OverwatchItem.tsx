import { useDropDownMenu } from "@/hooks/use-drop-down-menu";
import { VerdictOverwatchDemos } from "./VerdictOverwatchDemos";
import { ArrowUp } from "lucide-react";
import { IReport } from "@/models/IDemos";
import { Time } from "@/data/time";

interface IProps {
  report: IReport;
  updateReports: () => void;
}

export const OverwatchItem = ({ report, updateReports }: IProps) => {
  const { isMenuOpen, toggleMenu } = useDropDownMenu();

  return (
    <>
      <div
        onClick={toggleMenu}
        className="bg-gray text-white grid grid-cols-[1fr_1fr_1fr_1fr_0.5fr] px-2 border-1 border-light-gray hover:border-light-gray-3 duration-150 cursor-pointer my-1 py-1.5"
      >
        {!isMenuOpen && (
          <>
            <div className="flex items-center text-white ">
              <img
                className="rounded-full w-8"
                src={
                  report.recipient.avatar || import.meta.env.VITE_UNKOWN_AVATAR
                }
              />
              <p className="text-xs ml-2">{report.recipient.personaName}</p>
            </div>
            <div className="flex items-center">
              <div className="ml-0.5 text-xs space-y-2">
                <p className="hover:text-red-600 duration-150">
                  YouTube Moment
                </p>
                <p className="hover:text-light-blue">{report.demoLink}</p>
              </div>
            </div>
            {report.verdicts && (
              <div className="ml-3 text-xs grid grid-cols-1">
                {report.verdicts[0].verdicts.map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
              </div>
            )}

            <div className="ml-0.5 flex items-center">
              <p className="text-xs">{report.comment}</p>
            </div>
            <div className="ml-1.5 flex items-center text-xs">
              <p>{Time(report.createdAt).split(" ")[0]}</p>
            </div>
          </>
        )}
        {isMenuOpen && (
          <p className=" text-xl items-center">
            <ArrowUp />
          </p>
        )}
      </div>

      {isMenuOpen && (
        <VerdictOverwatchDemos
          key={report.id}
          report={report}
          updateReports={updateReports}
        />
      )}
    </>
  );
};
