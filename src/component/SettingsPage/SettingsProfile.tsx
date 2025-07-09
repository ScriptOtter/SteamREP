import { backgroundColors, color, textColors } from "@/styles/colors";
import { SettingsProfileItems } from "./SettingsProfileItems";

export const SettingsProfile = () => {
  return (
    <>
      <div className={backgroundColors.darkMain + "w-full rounded-t-2xl"}>
        <div className={backgroundColors.lightMain + "rounded-t-2xl"}>
          <h1 className={textColors.white + "p-6 text-xl font-bold"}>
            Profile
          </h1>
        </div>
        <SettingsProfileItems
          title="Unique SteamREP URL"
          description="Your Personal link to your SteamREP Profile"
          valueInput="https://steamrep.help/profile/76561198117401376"
        />
        <SettingsProfileItems
          title="Your email"
          valueInput="dev@gmail.com"
          onClick={() => {}}
        />
        <SettingsProfileItems
          title="Your country"
          description="Your country from your Steam profile"
          valueInput="https://steamrep.help/profile/76561198117401376"
          onClick={() => {}}
        />
        <SettingsProfileItems
          title="Your Trade-Link"
          description="Trade Link will be displayed on SteamREP"
          placeholder="steamcommunity.com/tradeoffer/new/?partner=15"
          onClick={() => {}}
        />
      </div>
    </>
  );
};
