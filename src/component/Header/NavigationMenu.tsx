import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const NavigationMenu = () => {
  const menu: { [key: string]: string } = {
    home: "Home",
    reportUser: "Report",
    blog: "Blog",
    mostReportedPlayers: "Most Reported Players",
    bannedPlayers: "Banned Players",
    scammers: "Scammers",
    VACTracker: "VAC Tracker",
    morelinks: "More links",
  };
  const menuUrls: { [key: string]: string } = {
    home: "/",
    reportUser: "/report",
    blog: "/blog",
    mostReportedPlayers: "/MostReportedPlayers",
    bannedPlayers: "/BannedPlayers",
    scammers: "/Scammers",
    VACTracker: "/VACTracker",
    morelinks: "/404",
  };
  const [currentPage, newPage] = useState<string>("");
  const navigate = useNavigate();
  useEffect(() => {
    newPage(location.pathname);
  }, [location.pathname]);
  return (
    <>
      <nav
        className={
          "bg-primary text-[14px] font-semibold md:flex pb-2 pt-2 shadow-xl hidden md:visible"
        }
      >
        <div className="flex space-x-4 ml-8 text-gray-text">
          {Object.keys(menu).map((key) => (
            <ul>
              <div
                onClick={() => navigate(menuUrls[key])}
                className={cn(
                  "relative",
                  currentPage === menuUrls[key] && "text-header-underline"
                )}
              >
                <li className="hover:bg-gray-hover py-0.5  text-white px-4 duration-100 rounded-md cursor-pointer">
                  {menu[key]}
                </li>
              </div>
            </ul>
          ))}
        </div>
      </nav>
      <div className="bg-light-gray h-[1.2px]"></div>
    </>
  );
};
