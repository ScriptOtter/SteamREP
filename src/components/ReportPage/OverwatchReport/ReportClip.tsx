import { ToastSuccess } from "@/components/Toasts/ToastSuccess";
import { IReport } from "@/models/IDemos";
import { API_ENDPOINTS } from "@/services/apiService";
import { createApi } from "@/services/axios";
import { useDispatch } from "react-redux";

interface IProps {
  report: IReport;
  setVerdict: React.Dispatch<React.SetStateAction<boolean>>;
  visibleReport: boolean;
  setVisibleReport: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ReportClip = ({
  report,
  setVerdict,
  visibleReport,
  setVisibleReport,
}: IProps) => {
  const dispatch = useDispatch();
  const api = createApi(dispatch);

  const reasonsReport = [
    "Advertisement",
    "The clip is not related to CS2 in any way",
    "The clip is more than 2 minutes long",
  ];
  const postReport = async (reportComment: string) => {
    const data = {
      type: "REPORT",
      userComment: reportComment,
      reportId: report.id,
    };

    try {
      const res = await api.post(API_ENDPOINTS.contentReport, data, {
        withCredentials: true,
      });

      if (res.data) {
        setVerdict((prev) => !prev);
        setVisibleReport(false);
        ToastSuccess("The complaint has been accepted!");
      }
    } catch (e) {
      setVerdict((prev) => !prev);
      setVisibleReport(false);
      console.log(e);
    }
  };
  return (
    <div
      className="bg-secondary outline-1 outline-light-gray-3 rounded-xl absolute bottom-14 right-2 w-fit h-[170px] z-999 "
      hidden={!visibleReport}
    >
      <div className="p-4">
        <p className="text-[16px] mb-2">
          Please provide a reason for the report:
        </p>
        <div className="mb-2">
          {reasonsReport.map((item) => (
            <p
              key={item}
              onClick={() => {
                postReport(item);
              }}
              className={
                "text-light-gray hover:text-light-gray-3 cursor-pointer"
              }
            >
              {item}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};
