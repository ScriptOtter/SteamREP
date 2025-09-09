import { menu, menuUrls } from "@/data/navLinks";
import { getUserId } from "@/utils/steamUrl";
import { ChevronRight, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const MenuBurgerNavigation = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState<string>("");
  return (
    <>
      <ul>
        <div className="w-full bg-primary outline-1 outline-light-gray rounded-md px-2 py-1.5 mt-2">
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
            className="outline-none text-white placeholder-light-gray cursor-pointer"
          />
        </div>
        <div className={"flex flex-col text-xl pl-1.5 py-1.5 mr-2 text-white"}>
          {Object.keys(menu).map((key) => (
            <ul>
              <div
                key={key}
                className="flex justify-between hover:bg-gray-hover duration-100 rounded-md py-1.5 cursor-pointer"
                onClick={() => navigate(menuUrls[key])}
              >
                <li>{menu[key]}</li>
                <ChevronRight size={24} />
              </div>
            </ul>
          ))}
        </div>
      </ul>
    </>
  );
};
