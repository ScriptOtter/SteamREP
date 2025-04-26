import { FaSearch } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import { Input } from "../component/Input.tsx";
export const Header = () => {
  return (
    <>
      <div className="bg-blue-950 w-screen pb-2">
        <div className="flex justify-between items-center">
          <div className="flex justify-center bg-red-500 w-[20vw]">
            SteamREP
          </div>
          <div className="flex justify-center pt-2 grow">
            <div className="w-[48vw] bg-amber-300 rounded-3xl pl-4 pr-4 pt-2 pb-2 flex">
              <FaSearch className="w-1/32 size-5  text-gray-200 pt-1 pr-1" />
              <Input
                type="text"
                placeholder="Search for a profile (Steam ID / Steam Profile Link / Custom Steam URL)"
                variant="forSearch"
              ></Input>
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
            <p>
              <Link to="/auth/signin">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
      <nav className="bg-blue-800">
        <ul>
          <div className="flex space-x-8 ml-4">
            <li className="hover:underline underline-offset-2  cursor-pointer">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:underline underline-offset-2  cursor-pointer">
              <Link to="/MostReportedPlayers">Most Reported Players</Link>
            </li>
            <li className="hover:underline underline-offset-2  cursor-pointer">
              <Link to="/BannedPlayers">Banned Players</Link>
            </li>
            <li className="hover:underline underline-offset-2  cursor-pointer">
              <Link to="/Scammers">Scammers</Link>
            </li>
            <li className="hover:underline underline-offset-2  cursor-pointer">
              <Link to="/404">More links</Link>
            </li>
          </div>
        </ul>
      </nav>
    </>
  );
};
