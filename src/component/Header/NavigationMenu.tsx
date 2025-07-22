import { backgroundColors } from "@/styles/colors";
import { Link } from "react-router-dom";

export const NavigationMenu = () => {
  return (
    <>
      <nav
        className={
          backgroundColors.additionalHeader +
          "md:flex pb-2 pt-1 shadow-xl shadow-white hidden md:visible "
        }
      >
        <ul>
          <div className="flex space-x-8 ml-8 text-white font-semibold">
            <li className="hover:underline underline-offset-2 cursor-pointer">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:underline underline-offset-2 cursor-pointer">
              <Link to="/report">Report User</Link>
            </li>
            <li className="hover:underline underline-offset-2 cursor-pointer">
              <Link to="/MostReportedPlayers">Most Reported Players</Link>
            </li>
            <li className="hover:underline underline-offset-2 cursor-pointer">
              <Link to="/BannedPlayers">Banned Players</Link>
            </li>
            <li className="hover:underline underline-offset-2 cursor-pointer">
              <Link to="/Scammers">Scammers</Link>
            </li>
            <li className="hover:underline underline-offset-2 cursor-pointer">
              <Link to="/Scammers">VAC Ban Tracking</Link>
            </li>

            <li className="hover:underline underline-offset-2 cursor-pointer">
              <Link to="/404">More links</Link>
            </li>
          </div>
        </ul>
      </nav>
    </>
  );
};
