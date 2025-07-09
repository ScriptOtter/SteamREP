import { backgroundColors, textColors } from "@/styles/colors";
import { SettingsProfileItems } from "./SettingsProfileItems";

export const SettingsSocialLinks = () => {
  return (
    <>
      <div className={backgroundColors.darkMain + "w-full rounded-t-2xl"}>
        <div className={backgroundColors.lightMain + "rounded-t-2xl"}>
          <h1 className={textColors.white + "p-6 text-xl font-bold"}>
            Social Links
          </h1>
        </div>
        <SettingsProfileItems
          title="Telegram link"
          description="Telegram link will be displayed on SteamREP"
          placeholder="https://t.me/..."
          onClick={() => {}}
        />
        <SettingsProfileItems
          title="Twitch link"
          description="Twitch link will be displayed on SteamREP"
          placeholder="https://www.twitch.tv/..."
          onClick={() => {}}
        />
        <SettingsProfileItems
          title="Youtube link"
          description="Youtube link will be displayed on SteamREP"
          placeholder="https://www.youtube.com/@..."
          onClick={() => {}}
        />
        <SettingsProfileItems
          title="Discord Nickname"
          description="Discord link will be displayed on SteamREP"
          placeholder="Your Discord Nickname"
          onClick={() => {}}
        />
      </div>
    </>
  );
};
