import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface NotificationProps {
  isViewed: boolean;
  icon: ReactNode;
  title: string;
  descriptions?: string;
  date: string;
}
export const NotificationItem = ({ ...props }) => {
  const { isViewed, icon, title, descriptions, date }: NotificationProps =
    props.notification;
  return (
    <>
      <div className="flex py-2 px-1">
        <div className="bg-light-gray rounded-md w-8 h-8 p-2 mt-1 flex items-center justify-center">
          <div>{icon}</div>
        </div>
        <div className="ml-2">
          <div className="flex items-center space-x-1">
            <div
              className={cn(
                !isViewed ? "bg-green-400" : "bg-light-gray-2",
                "rounded-full w-2 h-2"
              )}
            ></div>
            <p className="text-sm">{title}</p>
          </div>
          <p className="text-xs">{descriptions}</p>
          <p className="text-xs">{date}</p>
        </div>
        <div></div>
      </div>
    </>
  );
};
