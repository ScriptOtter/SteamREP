import { backgroundColors, textColors } from "@/styles/colors";
import { SettingsProfileItems } from "./SettingsProfileItems";
import { API_ENDPOINTS } from "@/services/apiService";
import { toast } from "react-toastify";
import { createApi } from "@/services/axios";
import { useDispatch } from "react-redux";

export const SettingsSocialLinks = () => {
  const dispatch = useDispatch();
  const api = createApi(dispatch);
  const saveTelegramLink = async (url: string) => {
    console.log("GOOD");

    try {
      const res = await api.post(
        API_ENDPOINTS.patchSocialLinks,
        {
          site: "telegram",
          link: url,
        },
        { withCredentials: true }
      );

      toast.done(res.data);
    } catch (e) {
      console.log(e);
    }
  };

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
          description="Telegram link will be displayed on SteamREP"
          placeholder="https://t.me/..."
          onClick={saveTelegramLink}
        />
        <SettingsProfileItems
          key={7}
          title="Twitch link"
          description="Twitch link will be displayed on SteamREP"
          placeholder="https://www.twitch.tv/..."
          onClick={() => {}}
        />
        <SettingsProfileItems
          key={8}
          title="Youtube link"
          description="Youtube link will be displayed on SteamREP"
          placeholder="https://www.youtube.com/@..."
          onClick={() => {}}
        />
        <SettingsProfileItems
          key={9}
          title="Discord Nickname"
          description="Discord link will be displayed on SteamREP"
          placeholder="Your Discord Nickname"
          onClick={() => {}}
        />
      </div>
    </>
  );
};
