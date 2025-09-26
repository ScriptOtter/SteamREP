import { medalsInfo } from "@/lib/medalsInfo";
import { cn } from "@/lib/utils";
import { S3 } from "@/services/apiService";
import { useState } from "react";

export const Medal = ({ ...props }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const { medal } = props;
  return (
    <>
      {" "}
      <div
        key={medal}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="relative cursor-pointer"
      >
        <div
          className={cn(
            visible ? "flex" : "hidden",
            "absolute top-9 left-0 bg-secondary w-[100px] z-10 text-xs text-light-gray-3"
          )}
        >
          <p>{medalsInfo[medal]}</p>
        </div>
        <img
          className="scale-120 shadow-xl"
          src={`${S3.medal + medal}.png`}
          alt=""
        />
      </div>
    </>
  );
};
