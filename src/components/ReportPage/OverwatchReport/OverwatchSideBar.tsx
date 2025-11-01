import { useEffect, useState } from "react";
import { API_ENDPOINTS } from "@/services/apiService";
import { IReport } from "@/models/IDemos";
import axios from "axios";
import { YourubeVideo } from "@/components/youtube-video";
import { SelectOptions } from "@/components/selecteOptions";
import { useAuth } from "@/hooks/use-auth";
import { useDispatch } from "react-redux";
import { createApi } from "@/services/axios";
import { ToastSuccess } from "@/components/Toasts/ToastSuccess";
import { cn } from "@/lib/utils";
import { Flag } from "lucide-react";
import { ToastWarning } from "@/components/Toasts/ToastWarning";
import { PageLoader } from "@/components/Loader";
import { ReportClip } from "./ReportClip";

export const OverwatchSideBar = () => {
  const [reports, setReports] = useState<IReport[]>([]);
  const [report, setReport] = useState<IReport | null>(null);
  const [verdict, setVerdict] = useState<boolean>(false);
  const [verdictComment, setVerdictComment] = useState<string>("");
  const [resetTrigger, setResetTrigger] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [visibleReport, setVisibleReport] = useState<boolean>(false);

  const auth = useAuth();
  const dispatch = useDispatch();
  const api = createApi(dispatch);
  const resetSelector = () => {
    setResetTrigger((prev) => !prev);
  };

  const postVerdict = async () => {
    const data = { verdict: selectedOptions, comment: verdictComment };
    try {
      if (selectedOptions.length === 0) {
        ToastWarning("You haven't reached a verdict.");
        setError(true);
        return;
      }
      const res = await api.post(API_ENDPOINTS.postVerdict + report?.id, data, {
        withCredentials: true,
      });

      if (!res) {
        return;
      }
      setVerdict((prev) => !prev);
      resetSelector();
      setVerdictComment("");

      ToastSuccess("Your verdict was Posted!");
    } catch (e) {}
  };
  useEffect(() => {
    const getReports = async () => {
      {
        try {
          const res = await axios.get(API_ENDPOINTS.getDemos, {
            withCredentials: true,
          });

          if (res.data) {
            setReports(res.data);
            const firstReport: IReport =
              res.data[Math.floor(Math.random() * res.data.length)];
            setReport(firstReport);
            setReports((prev) => [
              ...prev.filter((item) => item.id !== firstReport.id),
            ]);
            setLoading(false);
          }
        } catch (e) {
          console.log(e);
          setLoading(false);
        }
      }
    };
    getReports();
  }, []);

  useEffect(() => {
    let random = 0;

    if (reports.length > 0) {
      random = Math.floor(Math.random() * reports.length);

      setReport(reports[random]);
      setReports((prev) => [
        ...prev.filter((item) => item.id !== prev[random].id),
      ]);
      return;
    }
    setReport(null);
    setReports([]);
  }, [verdict]);

  return (
    <>
      {!loading ? (
        <>
          {!report ? (
            <div className="text-5xl md:text-6xl text-center mb-4 md:mb-2 mt-8">
              <p className="text-white text-6xl">New reports not found</p>
              <p className="text-3xl md:text-4xl text-center mb-2 md:mb-2.5 text-light-blue-3">
                You can submit a complaint and help the community
              </p>
            </div>
          ) : (
            <div className="text-white outline-1  rounded-xl outline-light-gray-3 mx-8 px-6 relative">
              <ReportClip
                report={report}
                setVerdict={setVerdict}
                visibleReport={visibleReport}
                setVisibleReport={setVisibleReport}
              />
              <h1 className="text-2xl font-semibold text-white text-center mb-4 pt-2">
                Overwatch
              </h1>

              <div className="flex justify-center mb-4 bg-gray/5">
                <YourubeVideo
                  className={"rounded-2xl"}
                  youtubeLink={report.youtubeLink}
                  height={450}
                  width={800}
                />
              </div>
              <div className="flex justify-between border-b-1 border-light-gray-3 mb-4">
                <div className="flex text-2xl">
                  <p className="text-xl pr-2">Suspect </p>
                  <div
                    className="flex cursor-pointer group"
                    onClick={() =>
                      window.open(`/profile/${report.recipient.id}`)
                    }
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
                <div>
                  <p
                    className="cursor-pointer duration-150 text-light-blue hover:text-light-blue-2 hover:underline"
                    onClick={() => (location.href = report.demoLink)}
                  >
                    {report.demoLink}
                  </p>
                </div>
              </div>

              <div>
                {
                  <SelectOptions
                    error={error}
                    value={selectedOptions}
                    onChange={setSelectedOptions}
                    resetTrigger={resetTrigger}
                    className={"mb-4"}
                  />
                }

                <div className="relative">
                  <p className="absolute -top-2 left-4 text-xs text-light-gray-3 bg-secondary px-0.5">
                    Enter your comment
                  </p>
                  <textarea
                    className="text-white break-all w-full border-light-gray-3 outline-none transition-all duration-200 resize-none border-1 rounded-lg px-4 py-3 focus:h-32 h-13 focus:border-light-blue placeholder:text-light-gray"
                    value={verdictComment}
                    onChange={(e) => setVerdictComment(e.target.value)}
                    placeholder={
                      auth.isAuth ? "Optional" : "Please log in first"
                    }
                    disabled={!auth.isAuth}
                  ></textarea>
                </div>
              </div>
              <div className="flex items-center justify-end space-x-4 my-2 pb-4">
                <button
                  onClick={postVerdict}
                  disabled={!auth.isAuth || visibleReport}
                  className={cn(
                    auth.isAuth
                      ? "bg-light-blue outline-light-blue-2 cursor-pointer"
                      : "bg-light-gray outline-light-gray-2 cursor-no-drop",
                    "rounded-xl outline-1 px-4 py-1 text-white"
                  )}
                >
                  Confirm
                </button>

                <button
                  onClick={() => setVisibleReport((prev) => !prev)}
                  className="flex iteme-center cursor-pointer"
                >
                  <Flag size={20} className="text-white" />
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <PageLoader />
      )}
    </>
  );
};
