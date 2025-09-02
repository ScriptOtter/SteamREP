import { useDropDownMenu } from "@/hooks/use-drop-down-menu";
import { MenuIcon, X } from "lucide-react";
import { MenuBurgerUser } from "./MenuBurgerUser";
import { MenuBurgerNavigation } from "./MenuBurgerNavigation";
import { backgroundColors, color } from "@/styles/colors";

export const MenuBurger = ({ ...props }) => {
  const { isMenuOpen, toggleMenu, menuRef } = useDropDownMenu();
  return (
    <>
      <div ref={menuRef} className="relative z-999">
        {!isMenuOpen ? (
          <MenuIcon
            size={28}
            className="absolute -top-4 right-0 cursor-pointer hover:text-orange-500"
            onClick={toggleMenu}
          />
        ) : (
          <div className="absolute -top-4 right-0">
            <div>
              <X
                size={28}
                className="absolute right-0 z-10 cursor-pointer hover:text-orange-500"
                onClick={toggleMenu}
              />
            </div>
            <div
              className={
                backgroundColors.lightMain +
                "w-[300px] h-[340px] rounded-l-xl outline-1 outline-" +
                color.gray
              }
            >
              <div className="flex flex-col">
                {
                  <div className={props.isAuthenticated ? "mb-52" : "mb-4"}>
                    <MenuBurgerUser props={props} />
                  </div>
                }
                <div className="mx-3">
                  <MenuBurgerNavigation />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
