import { NotificationItem } from "./NotificationItem";
import { useEffect, useState } from "react";
import { PageLoader } from "../Loader";
import { INotifications } from "@/models/INotifications";
import { createApi } from "@/services/axios";
import { useDispatch } from "react-redux";
import { API_ENDPOINTS } from "@/services/apiService";

const getValueNewNotifications = (notifications: INotifications[]) => {
  return (
    notifications.filter((notification) => {
      return notification.isViewed == false;
    }).length || 0
  );
};

export const NotificationsBlock = () => {
  const [newNotifications, setNewNotifications] = useState<number>();
  const [notifications, setNotifications] = useState<INotifications[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const api = createApi(dispatch);
  const getMyNotifications = async () => {
    const res = await api.get(API_ENDPOINTS.getMyNotifications, {
      withCredentials: true,
    });

    if (res) {
      setNotifications(res.data);
      setNewNotifications(getValueNewNotifications(res.data));
      setLoading(false);
    }
  };
  useEffect(() => {
    getMyNotifications();
  }, []);

  return (
    <>
      <div
        className={
          "absolute bg-secondary px-2 py-2 rounded-xl outline-1 text-white z-999 w-[250px] h-[420px] top-10 -right-4 overflow-y-auto custom-scroll"
        }
      >
        <p className="mb-1 text-xl">Notifications:</p>
        {!loading ? (
          <>
            <div className="flex space-x-1">
              <p className="text-xs text-light-gray-3">You have </p>
              <p className="text-xs text-light-blue-3">
                {newNotifications} new
              </p>
              <p className="text-xs text-light-gray-3 mb-3.5">notifications</p>
            </div>
            <div className="space-y-1">
              {notifications &&
                notifications.map((notification) => (
                  <NotificationItem
                    notification={notification}
                    getMyNotifications={getMyNotifications}
                  />
                ))}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center">
            <PageLoader />
          </div>
        )}
      </div>
    </>
  );
};
