import { FaSearch } from "react-icons/fa";
import { Link, Outlet, redirect, useNavigate } from "react-router-dom";
import { Input } from "../component/Input.tsx";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { removeUser, setUser } from "@/store/UserSlice.ts";
import { IAuth } from "@/models/IAuth.ts";
import { useAuth } from "@/hooks/use-auth.ts";
import Avatar from "@/component/Avatar.tsx";
import DropdownMenu from "@/component/DropDownMenu.tsx";
import { BellDot, Bookmark } from "lucide-react";
import { getMe } from "@/data/getUser.ts";
import axios from "axios";
import { API_ENDPOINTS } from "@/services/apiService.ts";

interface HeaderProps {
  avatarUrl: string;
  nickname: string;
  onLogout: () => void;
  onProfile: () => void;
}

export const Header = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleLogout = async () => {
    dispatch(removeUser());
    await axios.get(API_ENDPOINTS.logout, { withCredentials: true });
    navigate("/");
  };
  const getUserId = (str: string): string => {
    const baseUrl = "https://steamcommunity.com/id/";

    if (str.startsWith(baseUrl)) {
      const profileId = str.slice(baseUrl.length).replace(`//$/`, "");
      return profileId;
    }
    return str;
  };

  const profileURL = () => {
    if (auth.role == "VERIFIED_STEAM") {
      navigate("/profile/" + auth.id);
    } else navigate("/profile/createProfile");
  };

  const [profile, setProfile] = useState<IAuth>();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useAuth();

  console.log(auth);

  useEffect(() => {
    getMe(dispatch, auth);
    console.log("GETME");
  }, []);

  useEffect(() => {
    const data = localStorage.getItem("user");

    if (data === null) {
      setProfile(auth);
    } else {
      const parsedData = JSON.parse(data);
      setProfile(parsedData);
      dispatch(setUser(parsedData));
    }
  }, []);

  return (
    <>
      <div className="bg-indigo-700 w-full shadow-lg">
        <div className="flex justify-between items-center p-4">
          {/* Логотип */}
          <div className="flex items-center mx-8">
            <Link to="/" className="text-white text-2xl font-bold">
              SteamREP
            </Link>
          </div>

          {/* Поиск */}
          <div className="flex grow mx-8 ">
            <div className="w-full bg-amber-300 rounded-full flex items-center p-2">
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
                className="flex-grow bg-transparent outline-none text-gray-800 placeholder-gray-500"
              />
              <button
                type="submit"
                onClick={(event) => {
                  event.preventDefault();
                  navigate("/profile/" + getUserId(searchInput));
                }}
                className="bg-red-500 text-white rounded-full px-3 py-1 ml-2 hover:bg-red-600 transition duration-200"
              >
                <FaSearch />
              </button>
            </div>
          </div>

          {/* Уведомления */}
          <div className="flex justify-center items-center space-x-6 mx-1">
            <div>
              <Bookmark className="text-red-500" />
            </div>
            <div>
              <BellDot className="text-blue-300" />
            </div>
          </div>

          {/* Профиль */}
          <div className="flex items-center mx-4">
            {!profile?.isAuth ? (
              <Link to="/auth/signin" className="text-white hover:underline">
                Sign In
              </Link>
            ) : (
              <div className="relative flex items-center">
                <Avatar
                  avatarUrl={profile.avatar}
                  nickname={profile.username}
                  onToggleMenu={toggleMenu}
                />
                {isMenuOpen && (
                  <DropdownMenu
                    onProfile={profileURL}
                    onLogout={handleLogout}
                    onClose={() => setIsMenuOpen((prev) => !prev)}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <nav className="bg-blue-800">
        <ul>
          <div className="flex space-x-8 ml-4">
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
              <Link to="/404">More links</Link>
            </li>
          </div>
        </ul>
      </nav>
    </>
  );
};
