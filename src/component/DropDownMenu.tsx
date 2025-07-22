import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import { MdVerified } from "react-icons/md";
import { fontSize } from "@/styles/font";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { backgroundColors } from "@/styles/colors";
export const DropdownMenu = ({ ...props }) => {
  const navigate = useNavigate();
  const auth = useAuth();
  const { closeMenu, onProfile, handleLogout } = props;

  return (
    <>
      <div className="flex flex-col">
        <div
          className={
            backgroundColors.main +
            "absolute ml-2 -right-1 -top-2 w-44 rounded-xl outline-1"
          }
        >
          <div
            onClick={() => closeMenu()}
            className={
              "flex items-center cursor-pointer mb-2 p-1 rounded-xl hover:outline-2"
            }
          >
            {auth.avatar && (
              <img
                src={auth.avatar}
                alt="Avatar"
                className="w-12 h-12 rounded-full mr-2"
              />
            )}
            <div>
              <p
                className={
                  fontSize.medium + "mr-1 font-semibold flex items-center-safe"
                }
              >
                {auth.username}
                {auth.role === "VERIFIED" && (
                  <MdVerified size={20} className="ml-1 text-blue-400" />
                )}
              </p>
              <p className={fontSize.smallMd}>{auth.role}</p>
            </div>
            <span className="text-gray-600">
              <ChevronDown />
            </span>
          </div>

          <div className="bg-gray-600 p-[1px]"></div>
          <div className="mb-1">
            <button
              onClick={onProfile}
              className={
                "block w-full text-left px-4 py-1.5 text-white cursor-pointer hover:bg-[#282a2e]"
              }
            >
              <div className="flex items-center space-x-1 -mx-2">
                <User size={17} />{" "}
                {auth.role == "VERIFIED" ? (
                  <p className={fontSize.medium}>Profile</p>
                ) : (
                  <p className={fontSize.medium + "text-emerald-400"}>
                    Create Profile
                  </p>
                )}
              </div>
            </button>
            <button
              onClick={() => navigate("/settings")}
              className={
                "block w-full text-left px-4 py-1.5 text-white cursor-pointer hover:bg-[#282a2e]"
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
                "block w-full text-left px-4 py-1.5 text-white cursor-pointer hover:bg-[#282a2e]"
              }
            >
              <div className="flex items-center space-x-1 -mx-2">
                <LogOut size={17} />
                <p className={fontSize.medium}>Logout</p>
              </div>
            </button>
          </div>
        </div>
      </div>
      {!auth.isAuth && <div className="bg-gray-600 p-[1px]"></div>}
    </>
  );
};
