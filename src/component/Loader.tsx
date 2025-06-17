import { Loader2 } from "lucide-react";

export const Loader = () => {
  return (
    <div className="flex justify-center">
      <Loader2 size={21} className="animate-spin" />
    </div>
  );
};
