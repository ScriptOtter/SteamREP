import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Loader } from "./Loader";

interface IData {
  currentText: "Pending" | "Players" | "Closed";
  visibleClose: boolean;
  matches: number;
  players: number;
  loading: boolean;
}
export const PendingAnalysisMatches = () => {
  const [state, setState] = useState<IData>({
    currentText: "Closed",
    visibleClose: false,
    matches: 0,
    players: 0,
    loading: true,
  });
  useEffect(() => {
    const handleTrackingStats = (data: {
      matches: number;
      players: number;
    }) => {
      if (typeof data.matches === "number") {
        setState((prev) => ({
          ...prev,
          matches: data.matches,
          players: data.players,
          loading: false,
        }));
      }
    };
    const socket = io(process.env.VITE_SOCKET);
    socket.on("trackingStats", handleTrackingStats);
    socket.emit("trackingStats");
    return () => {
      socket.off("trackingStats");
      socket.disconnect();
    };
  }, []);

  return (
    <div className="text-white fixed left-1 bottom-1 z-999 w-fit">
      {state.currentText === "Pending" && (
        <div
          onMouseEnter={() =>
            setState((prev) => ({ ...prev, visibleClose: true }))
          }
          onMouseLeave={() =>
            setState((prev) => ({ ...prev, visibleClose: false }))
          }
          className="min-w-[335px] max-w-[370px] px-4 py-4 bg-secondary/20 rounded-xl outline-1 outline-light-gray/70 flex items-center space-x-2"
        >
          <div
            onClick={() =>
              setState((prev) => ({ ...prev, currentText: "Players" }))
            }
            className="bg-yellow-400 rounded-full w-4 h-4 animate-pulse mr-2 cursor-pointer"
          ></div>

          <div>
            {!state.loading && (
              <p className="font-bold text-md mt-0.5 ">
                Pending analysis of {state.matches} matches
              </p>
            )}
          </div>
          {state.visibleClose && (
            <div
              onClick={() =>
                setState((prev) => ({ ...prev, currentText: "Closed" }))
              }
            >
              <ChevronLeft className="cursor-pointer hover:text-yellow-400" />
            </div>
          )}
        </div>
      )}
      {state.currentText === "Players" && (
        <div
          onMouseEnter={() =>
            setState((prev) => ({ ...prev, visibleClose: true }))
          }
          onMouseLeave={() =>
            setState((prev) => ({ ...prev, visibleClose: false }))
          }
          className="min-w-[335px] max-w-[370px] px-4 py-4 bg-secondary/20 rounded-xl outline-1 outline-light-gray/70 flex items-center space-x-2"
        >
          <div
            onClick={() =>
              setState((prev) => ({ ...prev, currentText: "Pending" }))
            }
            className="bg-green-400 rounded-full w-4 h-4 animate-pulse mr-2 cursor-pointer"
          ></div>
          <div>
            <p className="font-bold text-md mt-0.5 ">
              {state.players} people are tracking statistics
            </p>
          </div>
          {state.visibleClose && (
            <div
              onClick={() =>
                setState((prev) => ({ ...prev, currentText: "Closed" }))
              }
            >
              <ChevronLeft className="cursor-pointer hover:text-yellow-400" />
            </div>
          )}
        </div>
      )}
      {state.currentText === "Closed" && (
        <div
          onClick={() =>
            setState((prev) => ({ ...prev, currentText: "Pending" }))
          }
          className="px-[17.5px] py-[17.5px] bg-secondary/20 rounded-xl outline-1 outline-light-gray/70 flex items-center space-x-2"
        >
          {!state.loading ? (
            <ChevronRight className="cursor-pointer hover:text-yellow-400" />
          ) : (
            <div className="px-[1.5px] py-[1.5px]">
              <Loader />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
