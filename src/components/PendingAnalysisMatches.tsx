import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { MdClose } from "react-icons/md";

export const PendingAnalysisMatches = () => {
  const [currentText, setCurrentText] = useState<
    "Pending" | "Players" | "Closed"
  >("Pending");
  const [visibleClose, setVisibleClose] = useState<boolean>(false);
  return (
    <div className="text-white fixed left-1 bottom-1 z-999">
      {currentText === "Pending" && (
        <div
          onMouseEnter={() => setVisibleClose(true)}
          onMouseLeave={() => setVisibleClose(false)}
          className="w-[335px] px-4 py-4 bg-secondary/20 rounded-xl outline-1 outline-light-gray/70 flex items-center space-x-2"
        >
          <div
            onClick={() => setCurrentText("Players")}
            className="bg-yellow-400 rounded-full w-4 h-4 animate-pulse mr-2 cursor-pointer"
          ></div>
          <div>
            <p className="font-bold text-md mt-0.5 ">
              Pending analysis of 19 matches
            </p>
          </div>
          {visibleClose && (
            <div onClick={() => setCurrentText("Closed")}>
              <ChevronLeft className="cursor-pointer hover:text-yellow-400" />
            </div>
          )}
        </div>
      )}
      {currentText === "Players" && (
        <div
          onMouseEnter={() => setVisibleClose(true)}
          onMouseLeave={() => setVisibleClose(false)}
          className="w-[360px] px-4 py-4 bg-secondary/20 rounded-xl outline-1 outline-light-gray/70 flex items-center space-x-2"
        >
          <div
            onClick={() => setCurrentText("Pending")}
            className="bg-green-400 rounded-full w-4 h-4 animate-pulse mr-2 cursor-pointer"
          ></div>
          <div>
            <p className="font-bold text-md mt-0.5 ">
              100 people are tracking statistics
            </p>
          </div>
          {visibleClose && (
            <div onClick={() => setCurrentText("Closed")}>
              <ChevronLeft className="cursor-pointer hover:text-yellow-400" />
            </div>
          )}
        </div>
      )}
      {currentText === "Closed" && (
        <div
          onClick={() => setCurrentText("Pending")}
          className="w-full px-4 py-4 bg-secondary/20 rounded-xl outline-1 outline-light-gray/70 flex items-center space-x-2"
        >
          <ChevronRight className="cursor-pointer hover:text-yellow-400" />
        </div>
      )}
    </div>
  );
};
