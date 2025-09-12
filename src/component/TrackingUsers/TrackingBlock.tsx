import { useEffect, useState } from "react";
import { TrackingUser } from "./TrackingUser";
import { ITrackingUser } from "@/models/ITrackingUsers";
import { createApi } from "@/services/axios";
import { useDispatch } from "react-redux";
import { API_ENDPOINTS } from "@/services/apiService";
import { PageLoader } from "../Loader";

export const TrackingBlock = () => {
  const [trackingUsers, setTrackingUsers] = useState<ITrackingUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const api = createApi(dispatch);
  const getTrackingUsers = async () => {
    const res = await api.get(API_ENDPOINTS.getTrackingUsers, {
      withCredentials: true,
    });

    if (res.data) {
      console.log(res);
      setTrackingUsers(res.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTrackingUsers();
  }, []);
  return (
    <>
      <div
        className={
          "absolute bg-secondary px-2 py-2 rounded-xl outline-1 text-white z-999 w-[250px] h-[350px] top-10 -right-4 overflow-y-auto custom-scroll"
        }
      >
        <p className="mb-3 text-xl">Tracking Users:</p>
        {!loading ? (
          <div className="space-y-1">
            {trackingUsers.map((user) => (
              <TrackingUser
                key={user.steamid}
                user={user}
                getTrackingUsers={getTrackingUsers}
              />
            ))}
          </div>
        ) : (
          <PageLoader />
        )}
      </div>
    </>
  );
};
