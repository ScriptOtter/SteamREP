import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { FaSearch } from "react-icons/fa";
import { MdClose } from "react-icons/md";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="bg-blue-950 w-screen">
        <div className="flex justify-between items-center">
          <div className="flex justify-center bg-red-500 w-[20vw]">
            SteamREP
          </div>
          <div className="flex justify-center pt-2 grow">
            <div className="w-[48vw] bg-amber-300 rounded-3xl pl-4 pr-4 pt-2 pb-2 flex">
              <FaSearch className="w-1/32 size-5  text-gray-200 pt-1 pr-1" />
              <input
                type="text"
                placeholder="Search for a profile (Steam ID / Steam Profile Link / Custom Steam URL)"
                className="w-15/16 flex-grow outline-none"
              ></input>
              <div className="flex">
                <div className="pl-1">
                  <button className="cursor-pointer">
                    <FaSearch className="pt-1 size-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center bg-red-500 w-[20vw]">
            Steam LOGIN
          </div>
        </div>
        <div className="bg-blue-950 h-screen w-screen mt-2">
          <div className="bg-amber-500">
            <p className="font-bold text-3xl text-center">
              MOST REPORTED PLAYERS
            </p>
          </div>
          <div className="w-full">
            <div className="flex justify-evenly">
              <p>#</p>
              <p>Player</p>
              <p>Number of Complains</p>
              <p>Last Report</p>
            </div>
            <div className="">
              <p>1</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
