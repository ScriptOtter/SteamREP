import { Time } from "@/data/time";
import { cn } from "@/lib/utils";
import { INotifications } from "@/models/INotifications";
import { API_ENDPOINTS } from "@/services/apiService";
import { createApi } from "@/services/axios";
import { Calendar, SquareUser } from "lucide-react";
import { ReactNode } from "react";
import { useDispatch } from "react-redux";

const icons: { [key: string]: ReactNode } = {
  SYSTEM: <SquareUser />,
  STANDARD: <SquareUser />,
  COMMENT: <SquareUser />,
  CS: <SquareUser />,
  SUBSCRIBE: <SquareUser />,
};

export const NotificationItem = ({ ...props }) => {
  const { id, isViewed, type, title, description, createdAt }: INotifications =
    props.notification;
  const { getMyNotifications } = props;

  const dispatch = useDispatch();
  const api = createApi(dispatch);
  const setViewedNotification = async () => {
    if (!isViewed) {
      await api.post(
        API_ENDPOINTS.setViewedNotification,
        { id },
        { withCredentials: true }
      );
      getMyNotifications();
    }
  };
  return (
    <>
      <div
        onMouseEnter={() => setViewedNotification()}
        className="flex py-2 px-1"
      >
        <div className="bg-light-gray rounded-md w-8 h-8 p-2 mt-1 flex items-center justify-center">
          <div>{icons[type]}</div>
        </div>
        <div className="ml-2 w-full">
          <div className="flex items-center space-x-1">
            <div
              className={cn(
                !isViewed ? "bg-green-400" : "bg-light-gray-2",
                "rounded-full min-w-2 min-h-2"
              )}
            ></div>
            <p className="text-sm">{title}</p>
          </div>
          <p className="text-xs text-light-gray-3">{description}</p>
          <div className="flex justify-end items-center space-x-1 text-light-gray">
            <Calendar size={12} />
            <p className="text-xs">{Time(createdAt)}</p>
          </div>
        </div>
      </div>
    </>
  );
};
