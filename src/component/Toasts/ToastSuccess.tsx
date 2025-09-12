import { toast } from "react-toastify";

export const ToastSuccess = (message: string) => {
  return toast.success(<p className="text-white">{message}</p>, {
    theme: "dark",
  });
};
