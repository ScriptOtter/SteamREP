import { useEffect, useState } from "react";
import { FindLinkItem } from "./FindLinkItem";
import { SettingsLayout } from "./SettingsLayout";
import { SettingsProfileItems } from "./SettingsProfileItems";
import { createApi } from "@/services/axios";
import { useDispatch } from "react-redux";
import { API_ENDPOINTS } from "@/services/apiService";
import { PageLoader } from "../Loader";
import { ToastSuccess } from "../Toasts/ToastSuccess";
import { ToastWarning } from "../Toasts/ToastWarning";
import { AxiosError } from "axios";

export const CS2Tracker = () => {
  const saveSharedCode = async (sharedCode: string) => {
    try {
      const savedSharedCode = sharedCode;
      setLoading(true);
      const res = await api.post(
        API_ENDPOINTS.saveSharedCode,
        { sharedCode: sharedCode },
        { withCredentials: true }
      );
      if (res.data) {
        setSharedCore(savedSharedCode);
        ToastSuccess("Share code saved");
        setLoading(false);
      }
    } catch (e: unknown) {
      if (e instanceof AxiosError) ToastWarning(e?.response?.data?.message);
    }
  };

  const saveAuthenticationCode = async (authenticationCode: string) => {
    try {
      const res = await api.post(
        API_ENDPOINTS.saveAuthenticationCode,
        { authenticationCode: authenticationCode },
        { withCredentials: true }
      );
      if (res.data) {
        ToastSuccess("Authentication code saved");
      }
    } catch (e: unknown) {
      if (e instanceof AxiosError) ToastWarning(e?.response?.data?.message);
    }
  };

  const dispatch = useDispatch();
  const api = createApi(dispatch);
  const [sharedCode, setSharedCore] = useState<string>("");
  const [authenticationCode, setAuthenticationCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(API_ENDPOINTS.getCs2Codes, {
          withCredentials: true,
        });
        setSharedCore(res.data.sharedCode);
        setAuthenticationCode(res.data.gameAuthenticationCode);

        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {!loading ? (
        <SettingsLayout header={"CS2 Tracker"}>
          <SettingsProfileItems
            key={1}
            title="Last match code"
            valueInput={sharedCode}
            disabled={!!sharedCode}
            description="Your last competitive match code"
            placeholder="CSGO-XXXXX-XXXXX-XXXXX-XXXXX-XXXXX"
            onClick={saveSharedCode}
          />
          <SettingsProfileItems
            key={2}
            disabled={!sharedCode || !!authenticationCode}
            title="Authentication code"
            valueInput={authenticationCode}
            description="Game authentication code"
            placeholder="XXXX-XXXXX-XXXX"
            onClick={saveAuthenticationCode}
          />
          <div className="ml-6 pb-2">
            <FindLinkItem name={"cs"} />
          </div>
        </SettingsLayout>
      ) : (
        <PageLoader />
      )}
    </>
  );
};
