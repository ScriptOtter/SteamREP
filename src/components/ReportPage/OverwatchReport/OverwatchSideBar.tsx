import { useEffect, useState } from "react";

import { createApi } from "@/services/axios";
import { useDispatch } from "react-redux";
import { API_ENDPOINTS } from "@/services/apiService";
import { IReport } from "@/models/IDemos";
import { HeaderReportPage } from "../HeaderReportPage";
import { OverwatchItem } from "./OverwatchItem";

export const OverwatchSideBar = () => {
  const dispatch = useDispatch();
  const api = createApi(dispatch);

  const [demos, setDemos] = useState<IReport[]>([]);
  const getReports = async (): Promise<void> => {
    try {
      const demos = await api.get(API_ENDPOINTS.getDemos, {
        withCredentials: true,
      });
      if (demos.data) {
        setDemos(demos.data);
        console.log(demos.data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const updateReports = () => {
    getReports();
  };

  useEffect(() => {
    getReports();
  }, []);

  return (
    <>
      <HeaderReportPage />
      {demos.map((report) => (
        <OverwatchItem
          key={report.id}
          report={report}
          updateReports={updateReports}
        />
      ))}
    </>
  );
};
