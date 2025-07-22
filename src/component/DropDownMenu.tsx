import { LogOut, Settings, User } from "lucide-react";
import { fontSize } from "@/styles/font";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { backgroundColors } from "@/styles/colors";
export const DropdownMenu = ({ ...props }) => {
  const navigate = useNavigate();
  const auth = useAuth();
  const { onProfile, handleLogout } = props;

  return (
    <>
      <div className="flex flex-col">
        <div
          className={
            backgroundColors.main +
            "absolute ml-2 -right-2 top-12 w-40 rounded-xl outline-1"
          }
        >
          <div className="mb-1">
            <button
              onClick={onProfile}
              className={
                "block w-full text-left px-4 py-1.5 text-white cursor-pointer hover:bg-[#282a2e] rounded-t-xl"
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
                "block w-full text-left px-4 py-1.5 text-white cursor-pointer hover:bg-[#282a2e] rounded-t-xl"
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
    </>
  );
};
