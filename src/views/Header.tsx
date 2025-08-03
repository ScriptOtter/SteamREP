import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "@/hooks/use-auth.ts";
import { ProfileButton } from "@/component/profileButton";
import { BellDot, Bookmark, CircleHelp, LogIn, Search } from "lucide-react";
import { getMe } from "@/data/getUser.ts";
import { getUserId, profileURL } from "@/utils/steamUrl";
import { useDropDownMenu } from "@/hooks/use-drop-down-menu";
import { removeUser } from "@/store/UserSlice";
import { API_ENDPOINTS } from "@/services/apiService";
import axios from "axios";
import { backgroundColors } from "@/styles/colors";
import { MenuBurger } from "@/component/Header/MenuBurger";
import { NavigationMenu } from "@/component/Header/NavigationMenu";
import { fontSize } from "@/styles/font";
import { DropdownMenu } from "@/component/DropDownMenu";

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
          <div className="flex items-center md:mx-2 lg:mx-8 space-x-2 mr-4">
            <CircleHelp className="size-9" />
            <Link to="/" className="text-white text-2xl font-bold">
              SteamREP
            </Link>
          </div>

          {/* Поиск */}
          <div className="sm:flex sm:visible hidden grow md:mx-8 mr-4">
            <div className="w-[95%] bg-[#282a2e] rounded-2xl flex items-center p-1.5">
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

          {/* MenuBurger */}
          <div className="text-white md:hidden">
            <MenuBurger
              isAuthenticated={isAuthenticated}
              onProfile={() => profileURL(navigate, auth)}
              handleLogout={handleLogout}
              onSettings={() => navigate("/settings")}
            />
          </div>

          {/* Уведомления */}
          <div className="lg:flex justify-center items-center space-x-6 mx-1 hidden lg:visible">
            <div>
              <Bookmark className="text-[#F04747]" />
            </div>
            <div>
              <BellDot className="text-[#7289DA]" />
            </div>
          </div>

          {/* Профиль */}
          <div className="md:flex items-center mx-4 hidden md:visible">
            {!isAuthenticated ? (
              <div
                className={
                  fontSize.medium + "flex items-center space-x-2 text-white"
                }
              >
                <LogIn size={24} />{" "}
                <Link
                  to="/auth/signin"
                  className="text-white cursor-pointer hover:underline"
                >
                  Sign In
                </Link>{" "}
              </div>
            ) : (
              <div
                className="relative flex items-center text-white"
                ref={menuRef}
              >
                <ProfileButton onToggleMenu={toggleMenu} />
                {isMenuOpen && (
                  <DropdownMenu
                    closeMenu={() => toggleMenu()}
                    onProfile={() => profileURL(navigate, auth)}
                    handleLogout={handleLogout}
                    onSettings={() => navigate("/settings")}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <NavigationMenu />
    </>
  );
};
