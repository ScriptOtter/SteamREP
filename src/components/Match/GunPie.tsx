import { useState } from "react";
import CircleProgress from "../CircleProgress";
import { cn } from "@/lib/utils";

interface Props {
  kills: number;
  totalDamage: number;
  hits: number;
  fire: number;
}

export const GunPie = ({ ...props }: Props) => {
  const { kills, totalDamage, hits, fire } = props;

  const [visible, setVisible] = useState<boolean>(false);

  return (
    <>
      <div
        className="relative cursor-pointer"
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        <CircleProgress
          percent={fire > 0 ? ((hits / fire) * 100).toFixed(0) : 0}
        />
        <div
          style={{ visibility: visible ? "visible" : "hidden" }}
          className={cn(
            "absolute -right-30 top-2 text-left bg-secondary/70 z-999"
          )}
        >
          <p>{kills} kills</p>
          <p>{totalDamage} damage</p>
          <p>{hits} hits</p>
        </div>
      </div>
    </>
  );
};
