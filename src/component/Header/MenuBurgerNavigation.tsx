import { backgroundColors } from "@/styles/colors";
import { fontSize } from "@/styles/font";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export const MenuBurgerNavigation = () => {
  return (
    <>
      <ul>
        <div className={fontSize.medium + "flex flex-col text-white"}>
          <li
            className={
              "cursor-pointer pl-1.5 py-1.5 mr-2 hover:" + backgroundColors.main
            }
          >
            <Link to="/">
              <div className="flex items-center justify-between">
                <p>Home</p> <ChevronRight size={24} />
              </div>
            </Link>
          </li>
          <li
            className={
              "cursor-pointer pl-1.5 py-1.5 mr-2 hover:" + backgroundColors.main
            }
          >
            <Link to="/report">
              <div className="flex items-center justify-between">
                <p>Report User</p>
                <ChevronRight size={24} />
              </div>
            </Link>
          </li>
          <li
            className={
              "cursor-pointer pl-1.5 py-1.5 mr-2 hover:" + backgroundColors.main
            }
          >
            <Link to="/MostReportedPlayers">
              <div className="flex items-center justify-between">
                <p>Most Reported Players</p>
                <ChevronRight size={24} />
              </div>
            </Link>
          </li>
        </div>
      </ul>
    </>
  );
};
