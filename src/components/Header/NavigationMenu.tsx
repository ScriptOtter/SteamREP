import { menu, menuUrls } from "@/data/navLinks";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const NavigationMenu = () => {
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
            <ul key={key}>
              <div
                onClick={() => navigate(menuUrls[key])}
                className={cn(
                  "relative",
                  currentPage === menuUrls[key] && "text-header-underline"
                )}
              >
                <li className="hover:bg-gray-hover py-0.5 px-4 duration-100 rounded-md cursor-pointer text-white text-[12px] xl:text-[14px] ">
                  {menu[key]}
                </li>
              </div>
            </ul>
          ))}
        </div>
      </nav>
      <div className="bg-light-gray h-[1.2px] mb-8"></div>
    </>
  );
};
