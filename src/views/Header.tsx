import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { useAuth } from "@/hooks/use-auth.ts";
import Avatar from "@/component/Avatar.tsx";
import DropdownMenu from "@/component/DropDownMenu.tsx";
import { BellDot, Bookmark, CircleHelp, Search } from "lucide-react";
import { getMe } from "@/data/getUser.ts";

import { getUserId, profileURL } from "@/utils/steamUrl";
import { useProfile } from "@/hooks/use-profile.ts";
import { useLogout } from "@/hooks/use-logout";
import { useDropDownMenu } from "@/hooks/use-drop-down-menu";

export const Header = () => {
  const [searchInput, setSearchInput] = useState<string>("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useAuth();

  const { profile } = useProfile();
  const { handleLogout } = useLogout();
  const { isMenuOpen, toggleMenu, menuRef } = useDropDownMenu();

  useEffect(() => {
    //if (id === auth.id)
    getMe(dispatch, auth);
  }, []);

  return (
    <>
      <div className="bg-[#2F3136] w-full shadow-lg">
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
                  console.log(searchInput);
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
            {!profile?.isAuth ? (
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
                <Avatar onToggleMenu={toggleMenu} />
                {isMenuOpen && (
                  <DropdownMenu
                    onProfile={() => profileURL(navigate, auth)}
                    onLogout={handleLogout}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <nav className="bg-[#282a2e] pb-2 pt-1 shadow-xl shadow-white">
        <ul className="shadow-2xl shadow-white">
          <div className="flex space-x-8 ml-8 text-white font-semibold">
            <li className="hover:underline underline-offset-2 cursor-pointer">
              <Link to="/">Home</Link>
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
              <Link to="/report">Report User</Link>
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
