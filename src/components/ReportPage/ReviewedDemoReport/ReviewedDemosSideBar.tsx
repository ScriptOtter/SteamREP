import { useEffect, useState } from "react";

import { createApi } from "@/services/axios";
import { useDispatch } from "react-redux";
import { API_ENDPOINTS } from "@/services/apiService";

import { ReviewedDemosItem } from "./ReviewedDemosItem";
import { HeaderReportPage } from "../HeaderReportPage";
import { IReport } from "@/models/IDemos";

export const ReviewedDemosSideBar = () => {
  const dispatch = useDispatch();
  const api = createApi(dispatch);

  const [demos, setDemos] = useState<IReport[]>([]);

  const getDemos = async (): Promise<void> => {
    try {
      const demos = await api.get(API_ENDPOINTS.getMyVerdicts, {
        withCredentials: true,
      });
      if (demos.data) {
        setDemos(demos.data);
      }
    } catch (e) {}
  };

  useEffect(() => {
    getDemos();
  }, []);

  return (
    <>
      <HeaderReportPage />
      {demos.map((report: IReport) => (
        <ReviewedDemosItem key={report.youtubeLink} report={report} />
      ))}
    </>
  );
};
