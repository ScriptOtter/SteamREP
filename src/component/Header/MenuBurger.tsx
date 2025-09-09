import { useDropDownMenu } from "@/hooks/use-drop-down-menu";
import { MenuIcon, Search, X } from "lucide-react";
import { MenuBurgerUser } from "./MenuBurgerUser";
import { MenuBurgerNavigation } from "./MenuBurgerNavigation";

export const MenuBurger = ({ ...props }) => {
  const { isMenuOpen, toggleMenu, menuRef } = useDropDownMenu();
  return (
    <>
      <div ref={menuRef} className="relative z-999">
        {!isMenuOpen ? (
          <div className="flex space-x-4 items-center">
            <MenuIcon
              size={28}
              className="cursor-pointer hover:text-light-blue-2"
              onClick={toggleMenu}
            />
          </div>
        ) : (
          <div className="absolute -top-4 right-0">
            <div>
              <X
                size={28}
                className="absolute right-0 z-10 cursor-pointer hover:text-light-blue-2"
                onClick={toggleMenu}
              />
            </div>
            <div
              className={
                "bg-secondary w-[300px] h-full rounded-l-xl outline-2 outline-light-gray-2"
              }
            >
              <div className="flex flex-col">
                {
                  <div className={props.isAuthenticated && "mb-50"}>
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
