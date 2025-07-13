import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "@/hooks/use-auth.ts";
import { ProfileButton } from "@/component/profileButton";
import DropdownMenu from "@/component/DropDownMenu.tsx";
import { BellDot, Bookmark, CircleHelp, Search } from "lucide-react";
import { getMe } from "@/data/getUser.ts";
import { getUserId, profileURL } from "@/utils/steamUrl";
import { useDropDownMenu } from "@/hooks/use-drop-down-menu";
import { removeUser } from "@/store/UserSlice";
import { API_ENDPOINTS } from "@/services/apiService";
import axios from "axios";
import { backgroundColors } from "@/styles/colors";

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useAuth();

  const { isMenuOpen, toggleMenu, menuRef } = useDropDownMenu();
  const [searchInput, setSearchInput] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState(auth?.isAuth || false);

  const handleLogout = async () => {
    dispatch(removeUser());
    await axios.get(API_ENDPOINTS.logout, { withCredentials: true });
    setIsAuthenticated(false);
    navigate("/");
  };

  useEffect(() => {
    getMe(dispatch, auth);

    setIsAuthenticated(auth?.isAuth);
  }, [auth]);

  return (
    <>
      <div className={backgroundColors.header + "shadow-lg"}>
        <div className="flex justify-between items-center p-3">
          {/* Логотип */}
          <div className="flex items-center mx-8 space-x-2">
            <CircleHelp className="size-9" />
            <Link to="/" className="text-white text-2xl font-bold">
              SteamREP
            </Link>
          </div>

          {/* Поиск */}
          <div className="flex grow mx-8 ">
            <div className="w-full bg-[#282a2e] rounded-2xl flex items-center p-1.5">
              <FaSearch className="text-gray-600 mr-2" />
              <input
                onKeyDown={(event) => {
                  if (event.key === "Enter")
                    navigate("/profile/" + getUserId(searchInput));
                }}
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                }}
                type="text"
                placeholder="Search for a profile (Steam ID / Steam Profile Link / Custom Steam URL)"
                className="flex-grow bg-transparent outline-none text-white placeholder-gray-500"
              />
              <button
                type="submit"
                onClick={(event) => {
                  event.preventDefault();
                  navigate("/profile/" + getUserId(searchInput));
                }}
                className="text-white px-3 py-1 ml-2 cursor-pointer"
              >
                <Search className="size-5" />
              </button>
            </div>
          </div>

          {/* Уведомления */}
          <div className="flex justify-center items-center space-x-6 mx-1">
            <div>
              <Bookmark className="text-[#F04747]" />
            </div>
            <div>
              <BellDot className="text-[#7289DA]" />
            </div>
          </div>

          {/* Профиль */}
          <div className="flex items-center mx-4">
            {!isAuthenticated ? (
              <Link
                to="/auth/signin"
                className="text-white cursor-pointer hover:underline "
              >
                Sign In
              </Link>
            ) : (
              <div
                className="relative flex items-center text-white"
                ref={menuRef}
              >
                <ProfileButton onToggleMenu={toggleMenu} />
                {isMenuOpen && (
                  <DropdownMenu
                    onProfile={() => profileURL(navigate, auth)}
                    onLogout={handleLogout}
                    onSettings={() => navigate("/settings")}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <nav
        className={
          backgroundColors.additionalHeader +
          "pb-2 pt-1 shadow-xl  shadow-white "
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
