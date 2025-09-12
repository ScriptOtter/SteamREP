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
import axios, { AxiosResponse } from "axios";
import { MenuBurger } from "@/component/Header/MenuBurger";
import { NavigationMenu } from "@/component/Header/NavigationMenu";
import { DropdownMenu } from "@/component/DropDownMenu";
import { steamVerification } from "@/lib/steamVerification";
import { TrackingBlock } from "@/component/TrackingUsers/TrackingBlock";
import { cn } from "@/lib/utils";
import { NotificationsBlock } from "@/component/Notifications/NotificationsBlock";
import { INotifications } from "@/models/INotifications";

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useAuth();
  const [newNotifications, setNewNotifications] = useState<boolean>();
  const { isMenuOpen, toggleMenu, menuRef } = useDropDownMenu();
  const {
    isMenuOpen: isTrackingMenuOpen,
    toggleMenu: trackingToggleMenu,
    menuRef: trackingMenuRef,
  } = useDropDownMenu();

  const {
    isMenuOpen: isNotificationMenuOpen,
    toggleMenu: notificationToggleMenu,
    menuRef: notificationMenuRef,
  } = useDropDownMenu();

  const {
    isMenuOpen: isTrackingMenuOpen2,
    toggleMenu: trackingToggleMenu2,
    menuRef: trackingMenuRef2,
  } = useDropDownMenu();

  const {
    isMenuOpen: isNotificationMenuOpen2,
    toggleMenu: notificationToggleMenu2,
    menuRef: notificationMenuRef2,
  } = useDropDownMenu();

  const [searchInput, setSearchInput] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState(auth?.isAuth || false);

  const handleLogout = async () => {
    dispatch(removeUser());
    await axios.get(API_ENDPOINTS.logout, { withCredentials: true });
    setIsAuthenticated(false);
    navigate("/");
  };
  const notifications = async () => {
    const res: AxiosResponse<INotifications[]> = await axios.get(
      API_ENDPOINTS.getMyNotifications,
      {
        withCredentials: true,
      }
    );
    if (res.data) {
      const newNot = res.data.filter((notification) => {
        return notification.isViewed == false;
      });

      newNot.toString()
        ? setNewNotifications(true)
        : setNewNotifications(false);
    }
  };
  useEffect(() => {
    getMe(dispatch);
    notifications();
    setIsAuthenticated(auth?.isAuth);
  }, [auth]);

  return (
    <>
      <div className={"bg-primary shadow-lg"}>
        <div className="flex justify-between items-center p-3">
          {/* Логотип */}

          <div className="flex items-center md:mx-2 lg:mx-8 space-x-2 mr-4">
            <CircleHelp className="size-9 text-light-gray" />
            <Link to="/" className="text-white text-2xl font-bold">
              SteamREP
            </Link>
          </div>

          {/* Поиск */}
          <div className="md:flex md:visible hidden grow md:mx-8 mr-4">
            <div className="w-[95%] sm:w-full bg-primary outline-2 outline-light-gray rounded-2xl flex items-center p-1.5">
              <FaSearch className="text-light-gray mr-2" />
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
                className="flex-grow bg-transparent outline-none text-white placeholder-light-gray cursor-pointer"
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

          {auth.id && (
            <div className="flex justify-end w-full items-center space-x-8 mr-8 mt-0.5 md:hidden">
              <div className="relative" ref={trackingMenuRef}>
                <Bookmark
                  size={24.5}
                  onClick={() => trackingToggleMenu()}
                  className={cn(
                    !isTrackingMenuOpen ? "text-[#F04747]" : "text-red-600",
                    "cursor-pointer hover:text-red-600"
                  )}
                />
                {isTrackingMenuOpen && <TrackingBlock />}
              </div>
              <div className="relative " ref={notificationMenuRef}>
                <div
                  onClick={() => notificationToggleMenu()}
                  className={cn(
                    newNotifications ? "bg-green-400" : "bg-light-blue-3",
                    "rounded-full w-[9px] h-[9px] absolute top-1 right-[2px] cursor-pointer"
                  )}
                ></div>
                <BellDot
                  onClick={() => notificationToggleMenu()}
                  className={cn(
                    !isNotificationMenuOpen ? "text-light-blue-2" : "text-blue",
                    "cursor-pointer hover:text-blue"
                  )}
                />
                {isNotificationMenuOpen && <NotificationsBlock />}
              </div>
            </div>
          )}
          {/* MenuBurger */}
          <div className="text-white md:hidden">
            <MenuBurger
              isAuthenticated={isAuthenticated}
              onProfile={() =>
                auth.role == "VERIFIED"
                  ? profileURL(navigate, auth)
                  : steamVerification()
              }
              handleLogout={handleLogout}
              onSettings={() => navigate("/settings")}
            />
          </div>

          {/* Уведомления */}
          {auth.id && (
            <div className="md:flex justify-center items-center space-x-6 mx-2 hidden md:visible">
              <div className="relative " ref={trackingMenuRef2}>
                <Bookmark
                  onClick={() => trackingToggleMenu2()}
                  className={cn(
                    !isTrackingMenuOpen ? "text-[#F04747]" : "text-red-600",
                    "cursor-pointer hover:text-red-600"
                  )}
                />
                {isTrackingMenuOpen2 && <TrackingBlock />}
              </div>
              <div className="relative " ref={notificationMenuRef2}>
                <div
                  onClick={() => notificationToggleMenu2()}
                  className={cn(
                    newNotifications ? "bg-green-400" : "bg-light-blue-3",
                    "rounded-full w-[9px] h-[9px] absolute top-1 right-[2px] cursor-pointer"
                  )}
                ></div>
                <BellDot
                  onClick={() => notificationToggleMenu2()}
                  className={cn(
                    !isNotificationMenuOpen2
                      ? "text-light-blue-2"
                      : "text-blue",
                    "cursor-pointer hover:text-blue"
                  )}
                />
                {isNotificationMenuOpen2 && <NotificationsBlock />}
              </div>
            </div>
          )}

          {/* Профиль */}
          <div className="md:flex items-center mx-4 hidden md:visible">
            {!isAuthenticated ? (
              <div
                className={
                  "flex items-center space-x-2 text-[18px] text-white hover:bg-gray-hover py-0.5 px-4 duration-100 rounded-md cursor-pointer"
                }
              >
                <LogIn size={24} />{" "}
                <Link to="/auth/signin" className="text-white ">
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
                    onProfile={() =>
                      auth.role == "VERIFIED"
                        ? profileURL(navigate, auth)
                        : steamVerification()
                    }
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
