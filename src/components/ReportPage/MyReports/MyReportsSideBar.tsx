import { useEffect, useState } from "react";

import { createApi } from "@/services/axios";
import { useDispatch } from "react-redux";
import { API_ENDPOINTS } from "@/services/apiService";
import { IReport } from "@/models/IDemos";

import { HeaderReportPage } from "../HeaderReportPage";
import { MyReportsItem } from "./MyReportsItem";

export const MyReportsSideBar = () => {
  const dispatch = useDispatch();
  const api = createApi(dispatch);

  const [demos, setDemos] = useState<IReport[]>([]);

  const getDemos = async (): Promise<void> => {
    try {
      const demos = await api.get(API_ENDPOINTS.getMyReports, {
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
        <MyReportsItem key={report.youtubeLink} report={report} />
      ))}
    </>
  );
};
