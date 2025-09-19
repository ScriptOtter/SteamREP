import { toast } from "react-toastify";

export const ToastWarning = (message: string) => {
  return toast.warning(message, { theme: "dark" });
};
