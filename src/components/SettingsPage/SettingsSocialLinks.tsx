import {
  saveDiscordNickname,
  saveTelegramLink,
  saveTwitchLink,
  saveYoutubeLink,
} from "@/data/profileLinks";
import { SettingsProfileItems } from "./SettingsProfileItems";
import { SettingsLayout } from "./SettingsLayout";

export const SettingsSocialLinks = ({ ...props }) => {
  const { inputValue } = props;
  return (
    <>
      <SettingsLayout header={"Social Links"}>
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
      </SettingsLayout>
    </>
  );
};
