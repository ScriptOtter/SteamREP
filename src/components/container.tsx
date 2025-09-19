import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  className?: string;
}

export const Container: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "transition-all duration-200 w-full max-w-[1024px]",
        className
      )}
    >
      {children}
    </div>
  );
};
