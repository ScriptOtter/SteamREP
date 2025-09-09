import { Sword } from "lucide-react";
import { NotificationItem } from "./NotificationItem";
import { useEffect, useState } from "react";
import { PageLoader } from "../Loader";
const Notifications = [
  {
    isViewed: false,
    icon: <Sword />,
    title: "Welcome!",
    descriptions: "You have successfully created an account.",
    date: "12-12-2002 18:30",
  },
  {
    isViewed: false,
    icon: <Sword />,
    title: "Welcome!",
    descriptions: "You have successfully created an account.",
    date: "12-12-2002 18:30",
  },
  {
    isViewed: false,
    icon: <Sword />,
    title: "Welcome!",
    descriptions: "You have successfully created an account.",
    date: "12-12-2002 18:30",
  },
  {
    isViewed: true,
    icon: <Sword />,
    title: "Welcome!",
    descriptions: "You have successfully created an account.",
    date: "12-12-2002 18:30",
  },
];

const getNotifications = (): number => {
  return (
    Notifications.filter((notification) => {
      return notification.isViewed == false;
    }).length || 0
  );
};

export const NotificationsBlock = () => {
  const [newNotifications, setNewNotifications] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setNewNotifications(getNotifications());
    setLoading(false);
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
              {Notifications.map((notification) => (
                <NotificationItem notification={notification} />
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
