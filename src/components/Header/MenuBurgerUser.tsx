import { LogIn, LogOut, Settings, User } from "lucide-react";
import { MdVerified } from "react-icons/md";
import { fontSize } from "@/styles/font";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";

export const MenuBurgerUser = ({ ...props }) => {
  const navigate = useNavigate();
  const auth = useAuth();
  const { isAuthenticated, onProfile, handleLogout } = props.props;

  return (
    <>
      <div>
        <div className="flex flex-col">
          {!isAuthenticated ? (
            <div className={"text-2xl flex items-center space-x-2 py-2 px-2"}>
              <LogIn size={24} />{" "}
              <Link
                to="/auth/signin"
                className="text-white cursor-pointer hover:underline"
              >
                Sign In
              </Link>{" "}
            </div>
          ) : (
            <div className="absolute ml-2 left-0 top-2 w-[90%]">
              <div
                onClick={() =>
                  auth.role == "VERIFIED" && navigate("/profile/" + auth.id)
                }
                className={
                  "flex items-center cursor-pointer mb-2 p-1 rounded-xl hover:bg-gray-hover"
                }
              >
                {auth.avatar && (
                  <img
                    src={auth.avatar}
                    alt="Avatar"
                    className="w-12 h-12 rounded-full mr-2 "
                  />
                )}
                <div>
                  <p
                    className={
                      fontSize.medium +
                      "mr-1 font-semibold flex items-center-safe"
                    }
                  >
                    {auth.username}
                    {auth.role === "VERIFIED" && (
                      <MdVerified
                        size={20}
                        className="ml-1 text-light-blue-2"
                      />
                    )}
                  </p>
                  <p className={fontSize.smallMd}>{auth.role}</p>
                </div>
              </div>

              <div className="bg-gray-600 p-[1px]"></div>
              <div className="mb-1">
                <button
                  onClick={onProfile}
                  className="block w-full text-left px-4 py-1.5 text-white cursor-pointer hover:bg-gray-hover"
                >
                  <div className="flex items-center space-x-1 -mx-2">
                    <User size={17} />{" "}
                    {auth.role == "VERIFIED" ? (
                      <p className={fontSize.medium}>Profile</p>
                    ) : (
                      <p className={fontSize.medium + "text-light-blue-2"}>
                        Create Profile
                      </p>
                    )}
                  </div>
                </button>
                <button
                  onClick={() => navigate("/settings")}
                  className={
                    "block w-full text-left px-4 py-1.5 text-white cursor-pointer hover:bg-gray-hover"
                  }
                >
                  <div className="flex items-center space-x-1 -mx-2">
                    <Settings size={17} />
                    <p className={fontSize.medium}>Settings</p>
                  </div>
                </button>
                <button
                  onClick={handleLogout}
                  className={
                    "block w-full text-left px-4 py-1.5 text-white cursor-pointer hover:bg-gray-hover"
                  }
                >
                  <div className="flex items-center space-x-1 -mx-2">
                    <LogOut size={17} />
                    <p className={fontSize.medium}>Logout</p>
                  </div>
                </button>
              </div>
              <div className="bg-gray-600 p-[1px]"></div>
            </div>
          )}
        </div>
        {!auth.isAuth && <div className="bg-gray-600 p-[1px]"></div>}
      </div>
    </>
  );
};
