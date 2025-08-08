import {
  saveDiscordNickname,
  saveTelegramLink,
  saveTwitchLink,
  saveYoutubeLink,
} from "@/data/profileLinks";
import { backgroundColors, textColors } from "@/styles/colors";
import { SettingsProfileItems } from "./SettingsProfileItems";

export const SettingsSocialLinks = ({ ...props }) => {
  const { inputValue } = props;
  return (
    <>
      <div className={backgroundColors.darkMain + "w-full rounded-t-2xl"}>
        <div className={backgroundColors.lightMain + "rounded-t-2xl"}>
          <h1 className={textColors.white + "p-6 text-xl font-bold"}>
            Social Links
          </h1>
        </div>
        <SettingsProfileItems
          key={6}
          title="Telegram link"
          valueInput={inputValue?.telegram && inputValue.telegram}
          description="Telegram link will be displayed on SteamREP"
          placeholder="https://t.me/..."
          onClick={saveTelegramLink}
        />
        <SettingsProfileItems
          key={7}
          title="Twitch link"
          valueInput={inputValue?.twitch && inputValue.twitch}
          description="Twitch link will be displayed on SteamREP"
          placeholder="https://www.twitch.tv/"
          onClick={saveTwitchLink}
        />
        <SettingsProfileItems
          key={8}
          title="Youtube link"
          valueInput={inputValue?.youtube && inputValue.youtube}
          description="Youtube link will be displayed on SteamREP"
          placeholder="https://www.youtube.com/@..."
          onClick={saveYoutubeLink}
        />
        <SettingsProfileItems
          key={9}
          title="Discord Nickname"
          valueInput={inputValue?.discord && inputValue.discord}
          description="Discord link will be displayed on SteamREP"
          placeholder="Your Discord Nickname"
          onClick={saveDiscordNickname}
        />
      </div>
    </>
  );
};
