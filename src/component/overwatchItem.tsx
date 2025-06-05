import { useDropDownMenu } from "@/hooks/use-drop-down-menu";
import { Avatar } from "./Avatar";
import { VerdictDemos } from "./verdict-demo";
import { ArrowUp } from "lucide-react";

interface Props {
  toggleMenu: () => void;
}

export const OverwatchItem = () => {
  const { isMenuOpen, toggleMenu, menuRef } = useDropDownMenu();
  return (
    <>
      <div
        onClick={toggleMenu}
        className="flex flex-col md:flex-row bg-[#282a2e] rounded-xl px-4 py-4 mb-2 cursor-pointer"
      >
        {!isMenuOpen && (
          <>
            <div className="flex items-center flex-1 text-white cursor-pointer">
              <Avatar src="https://avatars.steamstatic.com/b8abd274ab68b6589536960fb7cbf7a1f4863966_full.jpg" />
              <h2 className="text-xl ml-2">1</h2>
            </div>
            <div className="flex items-center flex-1 text-white cursor-pointer">
              <Avatar src="https://avatars.steamstatic.com/b8abd274ab68b6589536960fb7cbf7a1f4863966_full.jpg" />
              <h2 className="text-xl ml-2">
                ReportReport ReportReport dsadasdasdsa
              </h2>
            </div>
            <div className="flex-1 text-white cursor-pointer">
              <h2 className="text-xl">Time Report</h2>
            </div>
          </>
        )}
        {isMenuOpen && (
          <p className="text-white text-xl items-center">
            <ArrowUp />
          </p>
        )}
      </div>

      {isMenuOpen && <VerdictDemos />}
    </>
  );
};
