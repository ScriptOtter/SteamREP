import { backgroundColors } from "@/styles/colors";
import { Header } from "@/views/Header";
import { PropsWithChildren } from "react";

export const AuthWraper = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <div
        className={
          backgroundColors.darkMain +
          "w-full h-screen flex items-center justify-center absolute "
        }
      >
        <div className={backgroundColors.lightMain + "w-[400px]"}>
          <div className="p-3 rounded-xl outline-1 outltline-gray-200">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};
