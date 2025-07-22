import { backgroundColors, color, textColors } from "@/styles/colors";
import { SettingsProfileItems } from "./SettingsProfileItems";
import { useAuth } from "@/hooks/use-auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const SettingsProfile = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(auth.isAuth);
    if (auth.isAuth == false) navigate("/");
  }, [auth.isAuth]);

  return (
    <>
      <div className={backgroundColors.darkMain + "w-full rounded-t-2xl"}>
        <div className={backgroundColors.lightMain + "rounded-t-2xl"}>
          <h1 className={textColors.white + "p-6 text-xl font-bold"}>
            Profile
          </h1>
        </div>
        <SettingsProfileItems
          key={1}
          title="Unique SteamREP URL"
          disabled={true}
          description="Your Personal link to your SteamREP Profile"
          valueInput={"https://steamrep.help/profile/" + auth.id}
        />
        <SettingsProfileItems
          key={2}
          title="Your email"
          disabled={true}
          valueInput={auth?.email || ""}
          onClick={() => {}}
        />
        <SettingsProfileItems
          key={3}
          title="Your country"
          description="Your country from your Steam profile"
          onClick={() => {}}
        />
        <SettingsProfileItems
          key={4}
          title="Your Trade-Link"
          description="Trade Link will be displayed on SteamREP"
          placeholder="steamcommunity.com/tradeoffer/new/?partner=15"
          onClick={() => {}}
        />
      </div>
    </>
  );
};
