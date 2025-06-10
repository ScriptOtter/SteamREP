import { useEffect, useState } from "react";

import { createApi } from "@/services/axios";
import { useDispatch } from "react-redux";
import { API_ENDPOINTS } from "@/services/apiService";
import { IDemos } from "@/models/IDemos";
import { ReviewedDemosItem } from "./ReviewedDemosItem";
import { HeaderReportPage } from "../HeaderReportPage";

export const ReviewedDemosSideBar = () => {
  const dispatch = useDispatch();
  const api = createApi(dispatch);

  const [demos, setDemos] = useState<IDemos[]>([]);

  const getDemos = async (): Promise<void> => {
    try {
      const demos = await api.get(API_ENDPOINTS.getMyVerdicts, {
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

  useEffect(() => {
    getDemos();
  }, []);
  return (
    <>
      <HeaderReportPage />
      {demos.map((demo: IDemos) => (
        <ReviewedDemosItem
          key={demo.youtubeLink}
          id={demo.id}
          youtubeLink={demo.youtubeLink}
          demoLink={demo.demoLink}
          comment={demo.comment}
          createdAt={demo.createdAt}
          verdicts={demo.verdicts}
          author={demo.author}
          recipient={demo.recipient}
          reasonsReport={[]}
        />
      ))}
    </>
  );
};
