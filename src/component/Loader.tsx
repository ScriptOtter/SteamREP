import { Loader2 } from "lucide-react";

export const Loader = () => {
  return (
    <div className="flex justify-center">
      <Loader2 size={21} className="animate-spin" />
    </div>
  );
};

export const PageLoader = () => {
  return (
    <div className="flex justify-center mt-16">
      <Loader2 size={100} className="animate-spin text-white" />
    </div>
  );
};
